# AgriAI – AI-Powered Personal Farming Assistant

AgriAI is a production-ready, full-stack personal agricultural assistant platform that equips farmers, agricultural consultants, and students with modern crop analysis, disease diagnosis, financial management tools, and live market price tracking.

The application automatically adapts to all screen widths (phones, tablets, laptops, and desktop displays) with a premium SaaS design featuring glassmorphism cards and smooth charts.

---

## Technical Architecture

* **Frontend Client (`/client`)**: React 18, TypeScript, Tailwind CSS, Recharts, Framer Motion, Lucide React, and React Router. Includes multi-language switching context (English, Tamil, Hindi) and local theme states (Dark & Light modes).
* **Backend Server (`/server`)**: Node.js, Express.js, TypeScript, Mongoose (MongoDB models), and JWT-based authentication.
* **Progressive Web App (PWA)**: Registering service workers caching assets for offline field usage, installable configurations, and standalone modes.

---

## Getting Started

### Prerequisites

Since Node.js is portable on this system, you must configure the PATH variable in your PowerShell process before running scripts.

### 1. Configure Portable Node.js Environment Path
In your terminal, run the following command to prepend the portable Node directory:
```powershell
$env:Path = "c:\Users\HI\Documents\hospital management system\.node_portable\node-v20.11.1-win-x64;" + $env:Path
```

### 2. Install Dependencies
Run the installation script in the root directory to automatically fetch packages for the client, server, and workspace:
```powershell
npm install
npm run install-all
```

### 3. Start Development Servers
Run the unified command to concurrently launch both the Vite React dev server (hosting the client UI) and the Node Express server:
```powershell
npm run dev
```

* **Frontend URL**: [http://localhost:5173](http://localhost:5173) (or the URL printed in the client logs)
* **Backend Server**: [http://localhost:5000](http://localhost:5000)

---

## Core Features

1. **Dashboard (Draggable Widgets)**: Drag and drop or use the control arrows to rearrange widgets. Displays soil stats, weather reports, reminders, and charts.
2. **AI Crop Recommendation**: Enter soil Nitrogen, Phosphorus, Potassium, pH levels, and expected rainfall to determine optimal grain, vegetable, or cash crops.
3. **AI Plant Disease Detection**: Upload leaf images or trigger device camera capture to run diagnosis models. Lists remedies, causes, symptoms, and organic solutions.
4. **Weather Forecast**: Real-time hourly predictions, 7-day outlook tables, and warnings (e.g. "heavy wind warning - postpone pesticide sprays").
5. **Soil Nutrient Analyzer**: Fertility scorecards, structural advice (composts, farmyard manure), and regional crop targets.
6. **Smart Irrigation Calculator**: Area water volume calculations matching crop stage (flowering, seedling) and weather conditions.
7. **Expense & Financial Tracker**: Log investments (seeds, fertilizers, labor, rentals) and generate income vs expense bar charts and PDF/CSV reports.
8. **AgriAI Multilingual Chatbot**: Interactive messaging bot supporting queries in English, Tamil, and Hindi.
9. **Voice Command Assistant**: Trigger voice actions to search, read alerts aloud, or navigate routes hands-free.
