'use client'

import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">📧 Email Support</h3>
                <p className="text-gray-300">support@lilostore.com</p>
                <p className="text-gray-400 text-sm">Response within 2-4 hours</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">💬 Discord</h3>
                <p className="text-gray-300">Join our community</p>
                <a href="https://discord.gg/yF59qGnpgX" className="text-blue-400 text-sm">discord.gg/yF59qGnpgX</a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">📞 WhatsApp</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
                <p className="text-gray-400 text-sm">For urgent inquiries only</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🕒 Business Hours</h3>
                <p className="text-gray-300">Monday - Friday: 9 AM - 9 PM EST</p>
                <p className="text-gray-300">Saturday - Sunday: 10 AM - 6 PM EST</p>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Form</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Subject</label>
                <select className="form-select">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Trading Issue</option>
                  <option>Account Problem</option>
                  <option>Partnership</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input type="email" placeholder="your@email.com" className="form-input" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="form-textarea" />
              </div>
              
              <GlassButton variant="primary" className="w-full">
                Send Message
              </GlassButton>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}