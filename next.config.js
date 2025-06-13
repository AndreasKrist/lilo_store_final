/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'steamcommunity-a.akamaihd.net', 
      'steamcdn-a.akamaihd.net',
      'lh3.googleusercontent.com',
      'raw.githubusercontent.com', // For CS2 item images
      'cdn.cloudflare.steamstatic.com', // Steam CDN
      'community.akamai.steamstatic.com' // Steam Community images
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/ByMykel/counter-strike-image-tracker/**',
      },
    ],
  },
  
  // Add headers to fix CSP issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co https://accounts.google.com https://raw.githubusercontent.com https://bymykel.github.io",
              "frame-src 'self' https://accounts.google.com",
            ].join('; ')
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig