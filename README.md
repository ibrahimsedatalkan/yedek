# 🎯 RFM Customer Intelligence Platform

AI-powered customer segmentation and intelligence platform for e-commerce businesses. Automatically analyze customer behavior, generate insights, and respond to customer questions using advanced AI.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-purple)

## 🌟 Features

### 📊 RFM Analysis Engine
- **Recency, Frequency, Monetary (RFM)** scoring system
- Configurable segment rules and thresholds
- Real-time customer segmentation
- Automatic segment updates based on transactions

### 🎯 Customer Segmentation
- **8 Pre-configured Segments:**
  - 🏆 Champions - Your best customers
  - 💎 Loyal - Frequent buyers
  - 🌱 Promising - High potential customers
  - 👶 New Customers - First-time buyers
  - ⚠️ Needs Attention - Declining engagement
  - 🚨 At Risk - About to churn
  - 😴 Sleeping - Inactive customers
  - 💔 Lost - Churned customers

### 📈 Segment Movement Tracking
- Real-time tracking of segment transitions
- Daily movement reports and insights
- Automatic logging of segment changes
- Historical trend analysis

### 🤖 AI-Powered Question Answering
- Automatic answer generation for customer questions
- **4 Persona Modes:**
  - 🛡️ Professional - Formal & Secure
  - 💬 Friendly - Warm & Cheerful
  - ⚡ Persuasive - Sales-oriented
  - 🎯 Support - Solution-focused
- Multi-language support
- Sentiment analysis
- Confidence scoring
- Batch processing capabilities

### 🏪 Marketplace Integration
- **Trendyol** integration (current)
- Extensible architecture for multiple marketplaces
- Centralized brand voice management
- Automatic question sync

### 📊 Analytics & Insights
- Customer behavior analytics
- Segment distribution charts
- Movement trends and patterns
- Custom date range analysis

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Lucide Icons** - Icon system
- **Tremor** - Chart components

### Backend
- **Supabase** - PostgreSQL database + Auth
- **Next.js API Routes** - Backend endpoints
- **OpenAI GPT-4** - AI question answering
- **PostgreSQL** - Relational database

### DevOps
- **Vercel** - Deployment (recommended)
- **GitHub Actions** - CI/CD (optional)

## 📦 Installation

### Prerequisites
- Node.js 20+ 
- PostgreSQL (via Supabase)
- OpenAI API key
- Trendyol API credentials

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/ibrahimsedatalkan/Segmentasyon-v1.git
cd Segmentasyon-v1/dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create `.env.local` file in the `dashboard` directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_postgres_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
INTEGRATION_ENCRYPTION_KEY=your_32_char_encryption_key
```

4. **Database Setup**

The application will automatically create tables on first run, or you can use the Supabase dashboard to set up the schema.

5. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
dashboard/
├── app/
│   ├── (dashboard)/          # Dashboard pages
│   │   ├── questions/         # Customer Q&A management
│   │   ├── settings/          # Settings pages
│   │   └── ...
│   ├── (reports)/            # RFM reports
│   │   ├── rfm-movements/    # Segment movement tracking
│   │   └── rfm-overview/     # RFM analysis overview
│   └── api/                  # API routes
│       ├── questions/        # Question management API
│       ├── segments/         # Segment API
│       └── ...
├── components/               # React components
├── lib/
│   ├── agents/              # AI agents
│   │   └── question-agent/  # Question answering system
│   ├── engines/             # Core engines
│   │   ├── rfm.ts          # RFM calculation engine
│   │   └── segment-matcher.ts
│   ├── integrations/        # Marketplace integrations
│   │   └── trendyol/       # Trendyol client
│   └── supabase/           # Database clients
├── scripts/                 # Utility scripts
└── types/                   # TypeScript types
```

## 🔧 Configuration

### RFM Segment Rules

Configure segment rules in the database `rfm_config` table:

```sql
INSERT INTO rfm_config (segment_key, min_r, max_r, min_f, max_f, min_m, max_m, priority)
VALUES ('Champions', 4, 5, 4, 5, 4, 5, 100);
```

### AI Personas

Customize AI response styles in the Questions page settings.

## 📊 Key Features in Detail

### Segment Movement Tracking

Every segment change is automatically logged to `customer_segment_history`:

- Track when customers move between segments
- Identify trends and patterns
- Generate daily movement reports
- Monitor segment health

### AI Question Answering

1. **Sync** - Pull questions from Trendyol
2. **Generate** - AI creates personalized answers
3. **Review** - Review and edit if needed
4. **Send** - Automatically post to marketplace

## 🛡️ Security

- ✅ API keys stored in environment variables
- ✅ Database connection pooling
- ✅ Row-level security (RLS) in Supabase
- ✅ Input validation and sanitization
- ✅ HTTPS-only in production

## 📈 Performance

- Server-side rendering (SSR)
- Automatic code splitting
- Image optimization
- Database indexing
- Efficient batch processing

## 🤝 Contributing

This is a private project. For questions or issues, contact the repository owner.

## 📝 License

Private - All rights reserved

## 👤 Author

**Ibrahim Sedat Alkan**
- GitHub: [@ibrahimsedatalkan](https://github.com/ibrahimsedatalkan)
- Email: ibrahim.alkan@gmail.com

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Supabase for database infrastructure
- Trendyol for marketplace API
- Next.js team for the amazing framework

---

**Built with ❤️ for smarter customer intelligence**
