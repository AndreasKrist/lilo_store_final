// scripts/import-cs2-items.js
// Run this script to import all CS2 items from ByMykel API

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// API endpoints
const API_BASE = 'https://bymykel.github.io/CSGO-API/api/en'
const ENDPOINTS = {
  skins: `${API_BASE}/skins.json`,
  cases: `${API_BASE}/crates.json`,
  stickers: `${API_BASE}/stickers.json`,
  agents: `${API_BASE}/agents.json`,
  musicKits: `${API_BASE}/music_kits.json`,
  graffiti: `${API_BASE}/graffiti.json`,
  patches: `${API_BASE}/patches.json`,
  keys: `${API_BASE}/keys.json`,
  collectibles: `${API_BASE}/collectibles.json`
}

// Utility function to map API rarity to our format
function mapRarity(rarity) {
  if (!rarity) return { rarity: 'consumer', rarity_name: 'Consumer Grade', rarity_color: '#B0C3D9' }
  
  const rarityMap = {
    'rarity_common': { rarity: 'consumer', rarity_name: 'Consumer Grade', rarity_color: '#B0C3D9' },
    'rarity_uncommon_weapon': { rarity: 'industrial', rarity_name: 'Industrial Grade', rarity_color: '#5E98D9' },
    'rarity_rare_weapon': { rarity: 'milspec', rarity_name: 'Mil-Spec Grade', rarity_color: '#4B69FF' },
    'rarity_mythical_weapon': { rarity: 'restricted', rarity_name: 'Restricted', rarity_color: '#8847FF' },
    'rarity_legendary_weapon': { rarity: 'classified', rarity_name: 'Classified', rarity_color: '#D32CE6' },
    'rarity_ancient_weapon': { rarity: 'covert', rarity_name: 'Covert', rarity_color: '#EB4B4B' },
    'rarity_rare': { rarity: 'milspec', rarity_name: 'High Grade', rarity_color: '#4B69FF' },
    'rarity_mythical': { rarity: 'restricted', rarity_name: 'Remarkable', rarity_color: '#8847FF' },
    'rarity_legendary': { rarity: 'classified', rarity_name: 'Exotic', rarity_color: '#D32CE6' },
    'rarity_ancient': { rarity: 'covert', rarity_name: 'Extraordinary', rarity_color: '#EB4B4B' }
  }
  
  const mapped = rarityMap[rarity.id] || rarityMap[rarity]
  return {
    rarity: mapped?.rarity || 'consumer',
    rarity_name: rarity.name || mapped?.rarity_name || 'Consumer Grade',
    rarity_color: rarity.color || mapped?.rarity_color || '#B0C3D9'
  }
}

// Utility function to map weapon category to our weapon_type
function mapWeaponType(category, weapon) {
  if (!category && !weapon) return 'rifle'
  
  const categoryName = category?.name?.toLowerCase() || category?.toLowerCase() || ''
  const weaponName = weapon?.name?.toLowerCase() || weapon?.toLowerCase() || ''
  
  if (categoryName.includes('pistol') || weaponName.includes('pistol') || weaponName.includes('deagle') || weaponName.includes('glock') || weaponName.includes('usp')) {
    return 'pistol'
  }
  if (categoryName.includes('rifle') || weaponName.includes('ak-47') || weaponName.includes('m4a4') || weaponName.includes('m4a1')) {
    return 'rifle'
  }
  if (categoryName.includes('sniper') || weaponName.includes('awp') || weaponName.includes('scout')) {
    return 'sniper'
  }
  if (categoryName.includes('smg') || categoryName.includes('submachine') || weaponName.includes('mp7') || weaponName.includes('mp9')) {
    return 'smg'
  }
  if (categoryName.includes('shotgun') || weaponName.includes('nova') || weaponName.includes('mag-7')) {
    return 'shotgun'
  }
  if (categoryName.includes('knife') || weaponName.includes('knife') || weaponName.includes('bayonet') || weaponName.includes('karambit')) {
    return 'knife'
  }
  if (categoryName.includes('glove') || weaponName.includes('glove')) {
    return 'gloves'
  }
  
  return 'rifle' // default
}

// Generate random prices for skins (you can update these manually later)
function generateRandomPrice(rarity) {
  const basePrices = {
    'consumer': { min: 0.05, max: 2 },
    'industrial': { min: 0.10, max: 5 },
    'milspec': { min: 0.50, max: 15 },
    'restricted': { min: 2, max: 50 },
    'classified': { min: 10, max: 200 },
    'covert': { min: 50, max: 2000 }
  }
  
  const priceRange = basePrices[rarity] || basePrices['consumer']
  return +(Math.random() * (priceRange.max - priceRange.min) + priceRange.min).toFixed(2)
}

// Import skins
async function importSkins() {
  console.log('🔫 Importing CS2 skins...')
  
  try {
    const response = await fetch(ENDPOINTS.skins)
    const skins = await response.json()
    
    console.log(`📦 Found ${skins.length} skins to import`)
    
    const batchSize = 100
    let imported = 0
    
    for (let i = 0; i < skins.length; i += batchSize) {
      const batch = skins.slice(i, i + batchSize)
      
      const skinsToInsert = batch.map(skin => {
        const rarityData = mapRarity(skin.rarity)
        const weaponType = mapWeaponType(skin.category, skin.weapon)
        
        return {
          id: skin.id,
          name: skin.name,
          description: skin.description,
          weapon_type: weaponType,
          weapon_id: skin.weapon?.weapon_id,
          weapon_name: skin.weapon?.name,
          category: skin.category?.name,
          rarity: rarityData.rarity,
          rarity_name: rarityData.rarity_name,
          rarity_color: rarityData.rarity_color,
          pattern_id: skin.pattern?.id,
          pattern_name: skin.pattern?.name,
          min_float: skin.min_float,
          max_float: skin.max_float,
          stattrak: skin.stattrak || false,
          souvenir: skin.souvenir || false,
          paint_index: skin.paint_index,
          market_hash_name: skin.market_hash_name,
          team_id: skin.team?.id,
          team_name: skin.team?.name,
          image_url: skin.image,
          collections: skin.collections || [],
          crates: skin.crates || [],
          wears: skin.wears || [],
          type: 'skin'
        }
      })
      
      // Insert batch of skins
      const { error: skinsError } = await supabase
        .from('skins')
        .upsert(skinsToInsert, { onConflict: 'id' })
      
      if (skinsError) {
        console.error('❌ Error inserting skins batch:', skinsError)
        continue
      }
      
      // Create condition prices for each skin
      const conditionPrices = []
      
      batch.forEach(skin => {
        const rarityData = mapRarity(skin.rarity)
        const conditions = [
          { condition: 'fn', condition_name: 'Factory New', float_range: '0.00-0.07' },
          { condition: 'mw', condition_name: 'Minimal Wear', float_range: '0.07-0.15' },
          { condition: 'ft', condition_name: 'Field-Tested', float_range: '0.15-0.38' },
          { condition: 'ww', condition_name: 'Well-Worn', float_range: '0.38-0.45' },
          { condition: 'bs', condition_name: 'Battle-Scarred', float_range: '0.45-1.00' }
        ]
        
        // Only add conditions that are within the skin's float range
        conditions.forEach((cond, index) => {
          const conditionMaxFloat = parseFloat(cond.float_range.split('-')[1])
          const conditionMinFloat = parseFloat(cond.float_range.split('-')[0])
          
          // Check if condition is valid for this skin's float range
          if (skin.min_float <= conditionMaxFloat && skin.max_float >= conditionMinFloat) {
            const basePrice = generateRandomPrice(rarityData.rarity)
            const priceModifier = 1 - (index * 0.15) // Each worse condition is ~15% cheaper
            const currentPrice = +(basePrice * priceModifier).toFixed(2)
            
            conditionPrices.push({
              skin_id: skin.id,
              condition: cond.condition,
              condition_name: cond.condition_name,
              float_range: cond.float_range,
              base_price: basePrice,
              current_price: Math.max(currentPrice, 0.01) // Minimum $0.01
            })
          }
        })
      })
      
      // Insert condition prices
      if (conditionPrices.length > 0) {
        const { error: pricesError } = await supabase
          .from('skin_condition_prices')
          .upsert(conditionPrices, { onConflict: 'skin_id,condition' })
        
        if (pricesError) {
          console.error('❌ Error inserting condition prices:', pricesError)
        }
      }
      
      imported += batch.length
      console.log(`✅ Imported ${imported}/${skins.length} skins`)
    }
    
    console.log(`🎉 Successfully imported ${imported} skins!`)
    
  } catch (error) {
    console.error('❌ Error importing skins:', error)
  }
}

// Import cases
async function importCases() {
  console.log('📦 Importing CS2 cases...')
  
  try {
    const response = await fetch(ENDPOINTS.cases)
    const cases = await response.json()
    
    console.log(`📦 Found ${cases.length} cases to import`)
    
    const casesToInsert = cases.map(caseItem => ({
      id: caseItem.id,
      name: caseItem.name,
      description: caseItem.description,
      type: caseItem.type,
      first_sale_date: caseItem.first_sale_date,
      contains: caseItem.contains || [],
      contains_rare: caseItem.contains_rare || [],
      market_hash_name: caseItem.market_hash_name,
      rental: caseItem.rental || false,
      image_url: caseItem.image
    }))
    
    const { data, error } = await supabase
      .from('cases')
      .upsert(casesToInsert, { onConflict: 'id' })
    
    if (error) {
      console.error('❌ Error importing cases:', error)
    } else {
      console.log(`✅ Successfully imported ${cases.length} cases!`)
    }
    
  } catch (error) {
    console.error('❌ Error importing cases:', error)
  }
}

// Import stickers
async function importStickers() {
  console.log('🏷️ Importing CS2 stickers...')
  
  try {
    const response = await fetch(ENDPOINTS.stickers)
    const stickers = await response.json()
    
    console.log(`🏷️ Found ${stickers.length} stickers to import`)
    
    const stickersToInsert = stickers.map(sticker => {
      const rarityData = mapRarity(sticker.rarity)
      
      return {
        id: sticker.id,
        name: sticker.name,
        description: sticker.description,
        rarity: rarityData.rarity,
        rarity_name: rarityData.rarity_name,
        rarity_color: rarityData.rarity_color,
        market_hash_name: sticker.market_hash_name,
        image_url: sticker.image,
        tournament: sticker.tournament,
        team: sticker.team
      }
    })
    
    const { data, error } = await supabase
      .from('stickers')
      .upsert(stickersToInsert, { onConflict: 'id' })
    
    if (error) {
      console.error('❌ Error importing stickers:', error)
    } else {
      console.log(`✅ Successfully imported ${stickers.length} stickers!`)
    }
    
  } catch (error) {
    console.error('❌ Error importing stickers:', error)
  }
}

// Import other item types
async function importOtherItems() {
  const itemTypes = [
    { endpoint: ENDPOINTS.agents, table: 'agents', name: 'agents' },
    { endpoint: ENDPOINTS.musicKits, table: 'music_kits', name: 'music kits' },
    { endpoint: ENDPOINTS.graffiti, table: 'graffiti', name: 'graffiti' },
    { endpoint: ENDPOINTS.patches, table: 'patches', name: 'patches' },
    { endpoint: ENDPOINTS.keys, table: 'keys', name: 'keys' },
    { endpoint: ENDPOINTS.collectibles, table: 'collectibles', name: 'collectibles' }
  ]
  
  for (const itemType of itemTypes) {
    console.log(`🎯 Importing CS2 ${itemType.name}...`)
    
    try {
      const response = await fetch(itemType.endpoint)
      const items = await response.json()
      
      console.log(`🎯 Found ${items.length} ${itemType.name} to import`)
      
      const itemsToInsert = items.map(item => {
        const rarityData = mapRarity(item.rarity)
        
        const baseItem = {
          id: item.id,
          name: item.name,
          description: item.description,
          market_hash_name: item.market_hash_name,
          image_url: item.image
        }
        
        // Add rarity data if available
        if (item.rarity) {
          baseItem.rarity = rarityData.rarity
          baseItem.rarity_name = rarityData.rarity_name
          baseItem.rarity_color = rarityData.rarity_color
        }
        
        // Add type-specific fields
        if (itemType.name === 'agents') {
          baseItem.team = item.team
        } else if (itemType.name === 'music kits') {
          baseItem.artist = item.artist
        } else if (itemType.name === 'graffiti') {
          baseItem.tint_id = item.tint_id
        } else if (itemType.name === 'patches') {
          baseItem.tournament = item.tournament
          baseItem.team = item.team
        } else if (itemType.name === 'collectibles') {
          baseItem.type = item.type
        }
        
        return baseItem
      })
      
      const { data, error } = await supabase
        .from(itemType.table)
        .upsert(itemsToInsert, { onConflict: 'id' })
      
      if (error) {
        console.error(`❌ Error importing ${itemType.name}:`, error)
      } else {
        console.log(`✅ Successfully imported ${items.length} ${itemType.name}!`)
      }
      
    } catch (error) {
      console.error(`❌ Error importing ${itemType.name}:`, error)
    }
  }
}

// Main import function
async function importAllItems() {
  console.log('🚀 Starting CS2 items import...')
  console.log('=====================================')
  
  const startTime = Date.now()
  
  try {
    // Import all item types
    await importSkins()
    await importCases()
    await importStickers()
    await importOtherItems()
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)
    
    console.log('=====================================')
    console.log(`🎉 Import completed in ${duration} seconds!`)
    console.log('🎮 Your CS2 trading platform now has ALL items!')
    console.log('💰 You can now manually update prices in Supabase')
    
  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  }
}

// Run the import
if (require.main === module) {
  importAllItems()
}

module.exports = { importAllItems, importSkins, importCases, importStickers, importOtherItems }