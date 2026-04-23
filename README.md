# Kingpin Logistics Platform 🚚

A modern, high-performance logistics management and live-tracking application built to streamline operations across India. Features an intelligent AI Copilot, real-time tracking visualization on an interactive map, and robust admin/manager capabilities.

## 🚀 Built With

* **Next.js 14** - React Framework for production
* **React** - UI Library
* **Prisma** - Next-generation Node.js and TypeScript ORM
* **NextAuth.js** - Authentication for Next.js
* **Leaflet** - Interactive maps
* **Tailwind / Vanilla CSS** - Glassmorphism UI styling

## ✨ Key Features

- **Live Shipment Tracking**: Dynamically trace routes across states in India overlaying a sleek internal tracking map.
- **AI Copilot**: Floating conversational assistant providing supply chain recommendations, delay alerts, and intelligent metric breakdown.
- **Admin Dashboard**: Comprehensive overview of weekly revenue, active active shipments, performance charts, and delivery progress tracking.
- **Simulations**: Interactive logistics route visualizations and traffic/delivery probability simulations.

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository_url>
   cd logistics
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root of your project and configure your environment variables (Database URL, Google Auth secrets, NextAuth Secret, etc.).
   ```env
   DATABASE_URL="your_database_url_here"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start your development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

## 🚢 Deployment

This application is configured for a seamless deployment onto **Netlify**. 
Just link your GitHub repository to Netlify and it will automatically harness the build configurations provided in the `netlify.toml` and `next.config.js`.

**Build Command:**
```bash
npm run build
```
*(Automatically triggers `prisma generate` and Next.js static asset compilation.)*
