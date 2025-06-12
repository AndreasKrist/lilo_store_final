/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'steamcommunity-a.akamaihd.net', 
      'steamcdn-a.akamaihd.net',
      'lh3.googleusercontent.com'
    ],
  },
  // Remove the deprecated experimental.appDir option
  // It's no longer needed in Next.js 14
  
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
              "connect-src 'self' https://*.supabase.co https://accounts.google.com",
              "frame-src 'self' https://accounts.google.com",
            ].join('; ')
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig