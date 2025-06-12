// src/app/skins/[id]/page.tsx
import { notFound } from 'next/navigation'

// Sample skin data - replace with your actual data source
const skins = [
  {
    id: '1',
    name: 'AK-47 | Redline',
    price: 25.99,
    image: '/images/ak47-redline.jpg',
    description: 'A classic AK-47 skin with red and black design.',
    condition: 'Field-Tested',
    rarity: 'Classified'
  },
  {
    id: '2', 
    name: 'AWP | Dragon Lore',
    price: 2500.00,
    image: '/images/awp-dragonlore.jpg',
    description: 'The legendary Dragon Lore sniper rifle.',
    condition: 'Factory New',
    rarity: 'Covert'
  },
  {
    id: '3',
    name: 'M4A4 | Asiimov',
    price: 45.50,
    image: '/images/m4a4-asiimov.jpg',
    description: 'Futuristic design with orange and white colors.',
    condition: 'Well-Worn', 
    rarity: 'Covert'
  }
]

interface PageProps {
  params: {
    id: string
  }
}

export default function SkinPage({ params }: PageProps) {
  const skin = skins.find(s => s.id === params.id)
  
  if (!skin) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => window.history.back()}
              className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200"
            >
              ← Back
            </button>
          </div>

          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Skin Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-white/60 text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <p>Skin Image</p>
                  <p className="text-sm">{skin.name}</p>
                </div>
              </div>
              
              {/* Skin Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {skin.name}
                  </h1>
                  <p className="text-gray-300 mb-4">
                    {skin.description}
                  </p>
                  
                  {/* Skin Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Condition</p>
                      <p className="text-white font-semibold">{skin.condition}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Rarity</p>
                      <p className="text-white font-semibold">{skin.rarity}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-green-400">
                  ${skin.price.toFixed(2)}
                </div>
                
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
                    Buy Now
                  </button>
                  
                  <button className="w-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                    Add to Wishlist
                  </button>
                  
                  <button className="w-full bg-orange-500/20 border border-orange-500/30 hover:bg-orange-500/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                    Inspect in Game
                  </button>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">About This Skin</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Authenticity</h4>
                  <p className="text-gray-300 text-sm">Verified authentic CS2 skin</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Delivery</h4>
                  <p className="text-gray-300 text-sm">Instant trade delivery</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Support</h4>
                  <p className="text-gray-300 text-sm">24/7 customer support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const skin = skins.find(s => s.id === params.id)
  
  if (!skin) {
    return {
      title: 'Skin Not Found - Lilo Store'
    }
  }

  return {
    title: `${skin.name} - $${skin.price} | Lilo Store`,
    description: `${skin.description} - ${skin.condition} condition. Buy now for $${skin.price}`,
  }
}