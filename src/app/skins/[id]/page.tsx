// src/app/skins/[id]/page.tsx
import { notFound } from 'next/navigation'

// Sample skin data - replace with your actual data source
const skins = [
  {
    id: '1',
    name: 'AK-47 | Redline',
    price: 25.99,
    image: '/images/ak47-redline.jpg',
    description: 'A classic AK-47 skin with red and black design.'
  },
  // Add more skins...
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
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Skin Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <img 
                  src={skin.image} 
                  alt={skin.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Skin Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {skin.name}
                  </h1>
                  <p className="text-gray-300">
                    {skin.description}
                  </p>
                </div>
                
                <div className="text-4xl font-bold text-green-400">
                  ${skin.price}
                </div>
                
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                    Buy Now
                  </button>
                  
                  <button className="w-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                    Add to Wishlist
                  </button>
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
    title: `${skin.name} - Lilo Store`,
    description: skin.description,
  }
}