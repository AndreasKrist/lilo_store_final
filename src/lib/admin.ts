// src/lib/admin.ts
import { User } from '@/types'

// Add admin emails to your .env.local file
// ADMIN_EMAILS=andreasmk8@gmail.com

export function isAdmin(user: User | null): boolean {
  if (!user?.email) return false
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || []
  return adminEmails.includes(user.email)
}

export function requireAdmin(user: User | null): void {
  if (!isAdmin(user)) {
    throw new Error('Admin access required')
  }
}