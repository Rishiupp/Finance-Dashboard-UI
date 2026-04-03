# Zorvyn — Finance Dashboard UI

A modern, interactive finance dashboard built with **React + TypeScript + Vite** featuring real-time-style visualizations, role-based access control, and premium UI design powered by Aceternity UI components.

![Dashboard Preview](./screenshots/dashboard.png)

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173/`

## ✨ Features

### 1. Dashboard Overview
- **Summary Cards** — Total Balance, Income, Expenses, and Transaction count with month-over-month comparisons
- **Candlestick Chart** — Time-based balance trend visualization using Recharts with green (bullish) and red (bearish) indicators
- **Spending Breakdown** — Interactive donut pie chart showing categorical expense distribution with percentage labels
- **Container Scroll Animation** — Aceternity UI hero section with perspective scroll effect

### 2. Transactions Section
- **Expandable Card List** — Click any transaction to see full details in an animated expanded view
- **Search** — Real-time text search across descriptions and categories
- **Category Filter** — Filter by any spending category
- **Type Filter** — Filter by income or expense
- **Sorting** — Sort by date or amount (ascending/descending)
- **Scrollable Container** — Smooth scrolling for large transaction lists

### 3. Role-Based UI (RBAC)
- **Admin Role** — Can add new transactions, delete existing ones
- **Viewer Role** — Read-only access; action buttons are locked with visual feedback
- **Role Switcher** — Header dropdown to toggle between roles in real-time

### 4. Insights Section
- **Savings Rate** — Percentage of income saved
- **Top Spending Category** — Highest expense category with total
- **Average Expense/Income** — Per-transaction averages
- **Most Frequent Category** — Category with most transactions
- **Largest Single Expense** — Biggest one-time expense
- **Monthly Comparison** — Income vs Expenses bar chart by month
- **Category Spending Analysis** — Horizontal bar breakdown with color-coded progress

### 5. State Management
- **React Context + useReducer** — Centralized state for transactions, filters, role, and theme
- **Memoized Selectors** — `useMemo` for efficient computed values (filtered/sorted transactions)
- **LocalStorage Persistence** — State persists across browser sessions

### 6. Optional Enhancements (Implemented)
- ✅ **Dark Mode** — Toggle via header icon, persisted in localStorage
- ✅ **Data Persistence** — Transactions, role, and theme saved to localStorage
- ✅ **Animations & Transitions** — Motion/Framer Motion animations on cards, modals, and layout shifts
- ✅ **Export Functionality** — Export transactions as CSV or JSON
- ✅ **Grid Background** — Aceternity UI grid background with radial fade
- ✅ **Scroll Animations** — Container scroll perspective animation for hero section

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Charts | Recharts |
| Animations | Motion (Framer Motion) |
| UI Components | Aceternity UI (Grid Background, Expandable Cards, Container Scroll) |
| State | React Context + useReducer |
| Icons | Emoji-based + inline SVG |
| Fonts | Inter + Geist Variable |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                          # shadcn/Aceternity base components
│   │   ├── button.tsx
│   │   └── container-scroll-animation.tsx
│   ├── Header.tsx                   # Navigation, role switcher, dark mode
│   ├── SummaryCards.tsx             # Financial summary cards
│   ├── CandlestickChart.tsx         # Recharts candlestick visualization
│   ├── SpendingBreakdown.tsx        # Pie/donut chart by category
│   ├── TransactionList.tsx          # Expandable card list with filters
│   ├── AddTransactionModal.tsx      # Modal form (admin only)
│   └── InsightsPanel.tsx            # Metrics + monthly comparison chart
├── context/
│   └── AppContext.tsx               # Global state (Context + useReducer)
├── data/
│   └── mockData.ts                  # 40 transactions + market data generator
├── hooks/
│   └── use-outside-click.tsx        # Click outside detection hook
├── lib/
│   └── utils.ts                     # cn() utility for classnames
├── types/
│   └── index.ts                     # TypeScript interfaces
├── utils/
│   └── formatters.ts                # Currency, date, ID formatting
├── App.tsx                          # Main app orchestrator
├── main.tsx                         # Entry point
└── index.css                        # Tailwind + shadcn theme config
```

## 🎨 Design Approach

- **Dark-first design** with seamless light mode toggle
- **Glassmorphism** — Backdrop blur on header and cards for depth
- **Grid background** — Subtle grid pattern with radial gradient fade (Aceternity)
- **Gradient accents** — Purple-to-indigo gradients for primary actions
- **Color-coded data** — Green for income, red for expenses, category-specific colors for charts
- **Responsive layout** — Mobile-first grid system adapting from 1 to 4 columns

## 📊 Data

The dashboard uses **40 mock transactions** spanning January–March 2026 across 9 categories:
- Income: Salary, Freelance, Investments
- Expenses: Food, Transport, Shopping, Entertainment, Utilities, Health

All amounts are in **Indian Rupees (₹)** with proper Intl formatting.

The candlestick chart uses a **seeded random generator** to produce deterministic market-style data for consistent demos.

## 🔐 Role-Based Behavior

| Feature | Admin | Viewer |
|---------|-------|--------|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Add transaction | ✅ | ❌ (locked) |
| Delete transaction | ✅ | ❌ (hidden) |
| Export data | ✅ | ✅ |
| Switch theme | ✅ | ✅ |

## 📱 Responsive Breakpoints

- **Mobile** (< 640px): Single column, stacked layout
- **Tablet** (640px–1024px): Two-column grids
- **Desktop** (> 1024px): Full four-column summary, side-by-side charts

## 🧪 Edge Cases Handled

- Empty transaction list with friendly illustration & message
- Search with no results shows "No transactions found" state
- Filter combinations that yield zero results
- Currency formatting for large numbers (lakhs/crores)
- Graceful handling of zero division in percentage calculations

## 📜 License

Built for assignment evaluation purposes.
# Finance-Dashboard-UI
