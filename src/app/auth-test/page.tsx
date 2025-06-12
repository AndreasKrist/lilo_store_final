'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function AuthTestPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('🔍 Auth Status:', status)
    console.log('👤 Session Data:', session)
  }, [session, status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Debug Page</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Authenticated:</strong> {session ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {session ? (
          <div className="bg-green-900/20 border border-green-500 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-green-400">✅ Logged In Successfully!</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {session.user?.name}</p>
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>ID:</strong> {session.user?.id || 'Not set'}</p>
              <p><strong>Image:</strong> {session.user?.image}</p>
              {session.user?.image && (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full"
                />
              )}
            </div>
            <button
              onClick={() => signOut()}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="bg-red-900/20 border border-red-500 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-red-400">❌ Not Logged In</h2>
            <p className="mb-4">Click the button below to test Google OAuth:</p>
            <button
              onClick={() => signIn('google')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2 text-sm">
            <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXT_PUBLIC_APP_URL || 'Not set'}</p>
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}</p>
            <p><strong>Google Client ID:</strong> {process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set'}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}