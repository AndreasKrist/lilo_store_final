# 🛡️ Lilo Store - CS2 Skin Trading Platform

A modern, **100% free-to-start** CS2 skin trading platform built with Next.js 14, featuring a ticket-based trading system, glassmorphism UI, and professional-grade security.

![Lilo Store Banner](https://via.placeholder.com/1200x400/1a1a2e/667eea?text=Lilo+Store+-+CS2+Skin+Trading)

## 🌟 Features

### ✨ **Core Functionality**
- **Ticket-Based Trading**: Manual verification system for safe transactions
- **Real-Time Price Tracking**: Live market data integration
- **Multi-Condition Support**: All CS2 skin conditions (FN, MW, FT, WW, BS)
- **Advanced Search & Filtering**: Find exactly what you're looking for
- **User Profile Management**: Steam trade URL, phone verification

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful frosted glass effects
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes for long trading sessions
- **Smooth Animations**: Framer Motion powered interactions
- **Loading States**: Professional skeleton loaders

### 🔒 **Security & Auth**
- **Google OAuth**: Secure authentication without passwords
- **Row Level Security**: Database-level security with Supabase
- **Input Validation**: Zod schema validation throughout
- **Steam URL Verification**: Automatic trade link validation

### 📊 **Admin Features**
- **Ticket Management**: Process buy/sell requests efficiently
- **Price Management**: Update market prices in real-time
- **User Management**: Monitor user activity and support

## 🚀 **Quick Start (100% FREE)**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google account (for OAuth setup)
- Supabase account (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/lilo-store.git
cd lilo-store
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Fill in your `.env.local` file:
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (FREE)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase (FREE TIER - 50,000 rows)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Google OAuth (FREE)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret to `.env.local`

### 5. Set Up Supabase Database (FREE)
1. Go to [Supabase](https://supabase.com) and create account
2. Create new project (free tier: 50,000 rows, 500MB storage)
3. Copy project URL and anon key to `.env.local`
4. Go to SQL Editor in Supabase dashboard
5. Copy and run the entire `supabase-schema.sql` file
6. Verify tables are created successfully

### 6. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app! 🎉

## 📁 Project Structure

```
lilo-store/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── api/            # API routes
│   │   ├── browse/         # Browse skins page
│   │   ├── sell/           # Sell page
│   │   ├── tickets/        # User tickets page
│   │   ├── profile/        # User profile page
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable components
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Layout components
│   │   ├── skins/         # Skin-related components
│   │   ├── tickets/       # Ticket components
│   │   └── providers/     # Context providers
│   ├── lib/               # Utility libraries
│   │   ├── supabase.ts    # Database client
│   │   ├── auth.ts        # Authentication config
│   │   ├── utils.ts       # Helper functions
│   │   └── constants.ts   # App constants
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand state management
│   └── types/             # TypeScript definitions
├── public/                # Static assets
├── supabase-schema.sql    # Database schema
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons

### **Backend & Database** 
- **Supabase**: PostgreSQL database with real-time features
- **NextAuth.js**: Authentication with Google OAuth
- **Zustand**: Lightweight state management
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

### **Deployment** (All FREE)
- **Vercel**: Frontend hosting (free tier)
- **Supabase**: Database hosting (free tier)
- **Google OAuth**: Authentication (free)

## 🎨 Design System

### **Glassmorphism Components**
- `GlassCard`: Frosted glass effect containers
- `GlassButton`: Interactive buttons with blur effects
- `SearchBar`: Advanced search with quick filters

### **Color Palette**
```css
/* Primary Gradients */
--gradient-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
--gradient-secondary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Rarity Colors */
--covert: #ef4444;      /* Red */
--classified: #a855f7;  /* Purple */
--restricted: #3b82f6;  /* Blue */
--milspec: #6366f1;     /* Indigo */
```

### **Typography**
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable with proper contrast

## 📊 Database Schema

### **Core Tables**
- `users`: User profiles and authentication
- `skins`: CS2 skin catalog with metadata
- `skin_condition_prices`: Pricing for each condition
- `tickets`: Buy/sell requests from users

### **Advanced Features**
- **Row Level Security**: Users can only access their own data
- **Triggers**: Auto-update timestamps
- **Views**: Optimized queries for common operations
- **Functions**: Advanced search with filtering

## 🔐 Security Features

### **Authentication**
- Google OAuth 2.0 integration
- JWT session management
- Secure HTTP-only cookies

### **Database Security**
- Row Level Security (RLS) policies
- Parameterized queries
- Input validation with Zod schemas

### **Data Protection**
- Encrypted data transmission
- Steam URL validation
- Rate limiting on API endpoints

## 🚀 Deployment Guide

### **Deploy to Vercel (FREE)**
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### **Production Environment Variables**
```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=production-secret-key
GOOGLE_CLIENT_ID=production-google-client-id
GOOGLE_CLIENT_SECRET=production-google-client-secret
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-supabase-key
```

## 📈 Scaling & Upgrades

### **When You Outgrow Free Tiers**
- **Supabase Pro**: $25/month for 500GB storage
- **Vercel Pro**: $20/month for advanced features
- **Custom Domain**: $10-15/year for professional branding

### **Revenue Features** 
- **Payment Processing**: Stripe integration (2.9% fees)
- **Premium Features**: Advanced analytics, priority support
- **White Label**: Custom branding for enterprises

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript strict mode
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features

## 📝 API Documentation

### **Public Endpoints**
- `GET /api/skins` - Browse skins with filtering
- `GET /api/skins/[id]` - Get skin details

### **Authenticated Endpoints**
- `GET /api/tickets` - User's tickets
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets?id=[id]` - Update ticket

### **Rate Limits**
- Public API: 100 requests/minute
- Authenticated: 1000 requests/minute
- Ticket creation: 10 tickets/hour

## 🎯 Roadmap

### **Phase 1: MVP** ✅
- [x] Basic skin browsing
- [x] User authentication  
- [x] Ticket system
- [x] Profile management

### **Phase 2: Enhanced Features** 🚧
- [ ] Real-time price updates
- [ ] Steam API integration
- [ ] Mobile app (React Native)
- [ ] Admin dashboard

### **Phase 3: Advanced** 📋
- [ ] Cryptocurrency payments
- [ ] AI-powered price predictions
- [ ] Trading bot integration
- [ ] White-label solutions

## 🐛 Troubleshooting

### **Common Issues**

**Google OAuth not working:**
```bash
# Check redirect URLs in Google Console
# Ensure NEXTAUTH_URL matches your domain
```

**Supabase connection errors:**
```bash
# Verify environment variables
# Check RLS policies in Supabase dashboard
```

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### **Getting Help**
- 📧 Email: support@lilostore.com
- 💬 Discord: [Join our community](https://discord.gg/lilostore)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/lilo-store/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Valve Corporation**: For creating Counter-Strike 2
- **Next.js Team**: For the amazing React framework
- **Supabase Team**: For the excellent database platform
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations

---

**Built with ❤️ by the CS2 trading community**

*Ready to revolutionize CS2 skin trading? Star ⭐ this repo and let's build the future together!*