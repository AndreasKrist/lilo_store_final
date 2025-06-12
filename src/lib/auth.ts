import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabase } from './supabase'
import { randomUUID } from 'crypto'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          console.log('🔍 SignIn callback - checking user:', user.email)
          
          // Check if user exists in Supabase using email
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('❌ Error fetching user:', fetchError)
            return false
          }

          if (!existingUser) {
            console.log('👤 Creating new user for:', user.email)
            
            // Generate a proper UUID for new users
            const userId = randomUUID()
            
            // Create new user in Supabase
            const { error: createError } = await supabase
              .from('users')
              .insert([
                {
                  id: userId,
                  email: user.email!,
                  name: user.name!,
                  avatar_url: user.image!,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                }
              ])

            if (createError) {
              console.error('❌ Error creating user:', createError)
              return false
            }

            console.log('✅ User created successfully with ID:', userId)
            // Store the generated UUID for use in other callbacks
            user.id = userId
          } else {
            console.log('✅ Existing user found:', existingUser.id)
            // Use existing user's UUID
            user.id = existingUser.id
          }

          return true
        } catch (error) {
          console.error('❌ SignIn callback error:', error)
          return false
        }
      }
      return true
    },
    
    async jwt({ token, user, account }) {
      // Store user info in token on first sign in
      if (user) {
        console.log('🎟️ JWT callback - storing user ID:', user.id)
        token.userId = user.id
        token.email = user.email
      }
      return token
    },
    
    async session({ session, token }) {
      try {
        console.log('🎫 Session callback - token:', token.email)
        
        if (session.user && token.email) {
          // Get fresh user data from Supabase
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', token.email)
            .single()

          if (error) {
            console.error('❌ Session callback error:', error)
            return session
          }

          if (userData) {
            console.log('✅ Session updated with user data:', userData.id)
            session.user.id = userData.id
            session.user.trade_link = userData.trade_link
            session.user.phone_number = userData.phone_number
          }
        }
        
        return session
      } catch (error) {
        console.error('❌ Session callback error:', error)
        return session
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}