# FEAST - Food Essentials Access & Supply Tracking

A professional vendor-friendly platform for food supply chain management with AI-powered insights and real-time collaboration tools.

## Features

### Vendor Tools
- **VPT Verification**: Vendor verification system with badge status
- **Emergency Board**: Urgent supply request management

### AI Insights
- **AI Price Whisperer**: Gemini-powered price trend predictions
- **AI Quantity Optimizer**: Smart purchase quantity recommendations

### Market Tools
- **Crowd-Verified Mandi Prices**: Real-time market price updates
- **Multi-Supplier Quotes**: Price comparison across suppliers

### Logistics
- **Surplus Exchange**: Buy/sell surplus inventory
- **Smart Split Logistics**: Shared delivery cost optimization
- **Delivery Slot Pooling**: Collaborative delivery scheduling

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: TailwindCSS
- **Database**: Firebase Firestore
- **Charts**: Recharts
- **AI**: Google Gemini Pro API
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## Setup Instructions

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure Firebase**
   - Create a Firebase project
   - Enable Firestore Database
   - Copy your config to `.env` file

3. **Configure Gemini API**
   - Get API key from Google AI Studio
   - Add to `.env` file

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Firestore Collections

- `vendors` - Vendor profiles and verification status
- `mandiPrices` - Crowd-sourced market prices
- `surplusPosts` - Surplus inventory listings
- `supplierQuotes` - Price quotes from suppliers
- `emergencyRequests` - Urgent supply requests
- `logisticsGroups` - Delivery cost sharing groups
- `deliverySlots` - Available delivery time slots

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Key Components

- **Dashboard**: Main interface with 9 feature cards
- **Profile**: Vendor profile management and VPT verification
- **FeatureCard**: Reusable card component with verification checks
- **Modal**: Generic modal for forms and interactions
- **PriceChart**: Interactive price trend visualization

## Verification System

The platform includes a comprehensive vendor verification system:
- Business license upload
- Shop photo verification
- Location proof submission
- Verified badge display
- Feature access control based on verification status

## AI Integration

Two main AI features powered by Google Gemini:
1. **Price Prediction**: Analyzes market trends and predicts price movements
2. **Quantity Optimization**: Recommends optimal purchase quantities based on sales data

## Responsive Design

- Mobile-first approach
- Responsive grid layout (1-3 columns based on screen size)
- Touch-friendly interface
- Optimized for all device sizes

## Demo Mode

The application includes demo data and mock responses for development:
- Sample vendor data
- Mock price information
- Demo AI responses when API keys are not configured
- Simulated photo uploads

## Production Deployment

1. Replace demo data with real Firebase collections
2. Configure actual Firebase project
3. Add production Gemini API key
4. Enable Firebase Storage for file uploads
5. Set up authentication system
6. Configure production build settings

## License

MIT License - see LICENSE file for details