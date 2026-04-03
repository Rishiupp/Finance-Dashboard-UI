import type { Transaction, MarketCandle } from '../types';

export const transactions: Transaction[] = [
  { id: '1', date: '2026-03-28', amount: 85000, category: 'Salary', type: 'income', description: 'Monthly salary deposit', icon: 'SA' },
  { id: '2', date: '2026-03-27', amount: 2450, category: 'Food', type: 'expense', description: 'Grocery shopping at BigBasket', icon: 'FD' },
  { id: '3', date: '2026-03-26', amount: 1200, category: 'Transport', type: 'expense', description: 'Uber rides this week', icon: 'TR' },
  { id: '4', date: '2026-03-25', amount: 15000, category: 'Freelance', type: 'income', description: 'UI design project payment', icon: 'FR' },
  { id: '5', date: '2026-03-24', amount: 4500, category: 'Shopping', type: 'expense', description: 'New headphones - Sony WH1000XM5', icon: 'SH' },
  { id: '6', date: '2026-03-23', amount: 899, category: 'Entertainment', type: 'expense', description: 'Netflix & Spotify subscription', icon: 'EN' },
  { id: '7', date: '2026-03-22', amount: 3200, category: 'Utilities', type: 'expense', description: 'Electricity & internet bill', icon: 'UT' },
  { id: '8', date: '2026-03-21', amount: 8000, category: 'Investments', type: 'income', description: 'Mutual fund dividend', icon: 'IN' },
  { id: '9', date: '2026-03-20', amount: 1800, category: 'Health', type: 'expense', description: 'Gym membership renewal', icon: 'HE' },
  { id: '10', date: '2026-03-19', amount: 6500, category: 'Food', type: 'expense', description: 'Dining out with friends', icon: 'FD' },
  { id: '11', date: '2026-03-18', amount: 25000, category: 'Freelance', type: 'income', description: 'React app development', icon: 'FR' },
  { id: '12', date: '2026-03-17', amount: 12000, category: 'Shopping', type: 'expense', description: 'Clothing - Zara haul', icon: 'SH' },
  { id: '13', date: '2026-03-16', amount: 750, category: 'Transport', type: 'expense', description: 'Metro card recharge', icon: 'TR' },
  { id: '14', date: '2026-03-15', amount: 85000, category: 'Salary', type: 'income', description: 'Monthly salary deposit', icon: 'SA' },
  { id: '15', date: '2026-03-14', amount: 3500, category: 'Health', type: 'expense', description: 'Doctor consultation & medicines', icon: 'HE' },
  { id: '16', date: '2026-03-13', amount: 2100, category: 'Entertainment', type: 'expense', description: 'Concert tickets', icon: 'EN' },
  { id: '17', date: '2026-03-12', amount: 5000, category: 'Investments', type: 'income', description: 'Stock dividends', icon: 'IN' },
  { id: '18', date: '2026-03-11', amount: 1500, category: 'Food', type: 'expense', description: 'Swiggy orders this week', icon: 'FD' },
  { id: '19', date: '2026-03-10', amount: 9800, category: 'Utilities', type: 'expense', description: 'Rent + maintenance', icon: 'UT' },
  { id: '20', date: '2026-03-09', amount: 4200, category: 'Shopping', type: 'expense', description: 'Amazon electronics', icon: 'SH' },
  { id: '21', date: '2026-02-28', amount: 85000, category: 'Salary', type: 'income', description: 'Monthly salary deposit', icon: 'SA' },
  { id: '22', date: '2026-02-25', amount: 18000, category: 'Freelance', type: 'income', description: 'Logo design project', icon: 'FR' },
  { id: '23', date: '2026-02-22', amount: 7500, category: 'Shopping', type: 'expense', description: 'Birthday gifts', icon: 'SH' },
  { id: '24', date: '2026-02-20', amount: 3300, category: 'Food', type: 'expense', description: 'Dinner party hosting', icon: 'FD' },
  { id: '25', date: '2026-02-18', amount: 2000, category: 'Transport', type: 'expense', description: 'Fuel expenses', icon: 'TR' },
  { id: '26', date: '2026-02-15', amount: 85000, category: 'Salary', type: 'income', description: 'Monthly salary deposit', icon: 'SA' },
  { id: '27', date: '2026-02-12', amount: 15000, category: 'Investments', type: 'income', description: 'FD interest credited', icon: 'IN' },
  { id: '28', date: '2026-02-10', amount: 5500, category: 'Entertainment', type: 'expense', description: 'Weekend trip expenses', icon: 'EN' },
  { id: '29', date: '2026-02-08', amount: 1100, category: 'Health', type: 'expense', description: 'Pharmacy purchase', icon: 'HE' },
  { id: '30', date: '2026-02-05', amount: 8200, category: 'Utilities', type: 'expense', description: 'Quarterly insurance premium', icon: 'UT' },
  { id: '31', date: '2026-01-28', amount: 85000, category: 'Salary', type: 'income', description: 'Monthly salary deposit', icon: 'SA' },
  { id: '32', date: '2026-01-25', amount: 20000, category: 'Freelance', type: 'income', description: 'Mobile app UI project', icon: 'FR' },
  { id: '33', date: '2026-01-22', amount: 6000, category: 'Shopping', type: 'expense', description: 'Winter clothing', icon: 'SH' },
  { id: '34', date: '2026-01-20', amount: 4800, category: 'Food', type: 'expense', description: 'Monthly groceries', icon: 'FD' },
  { id: '35', date: '2026-01-18', amount: 1600, category: 'Transport', type: 'expense', description: 'Ola rides', icon: 'TR' },
  { id: '36', date: '2026-01-15', amount: 85000, category: 'Salary', type: 'income', description: 'Monthly salary deposit', icon: 'SA' },
  { id: '37', date: '2026-01-12', amount: 3000, category: 'Entertainment', type: 'expense', description: 'OTT subscriptions annual', icon: 'EN' },
  { id: '38', date: '2026-01-10', amount: 10000, category: 'Investments', type: 'income', description: 'Bond coupon payment', icon: 'IN' },
  { id: '39', date: '2026-01-08', amount: 2500, category: 'Health', type: 'expense', description: 'Annual health checkup', icon: 'HE' },
  { id: '40', date: '2026-01-05', amount: 9500, category: 'Utilities', type: 'expense', description: 'Rent + gas bill', icon: 'UT' },
];

// Generate candlestick/market data for the balance trend
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateMockMarketData(
  count: number,
  seed: number = 1337,
  basePrice: number = 100,
): MarketCandle[] {
  const random = seededRandom(seed);
  const data: MarketCandle[] = [];
  let price = basePrice;
  const startTime = Date.now() - count * 60 * 1000;

  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (random() - 0.48) * 3;
    const close = open + change;
    const high = Math.max(open, close) + random() * 2;
    const low = Math.min(open, close) - random() * 2;
    price = close;

    data.push({
      time: startTime + i * 60 * 1000,
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
    });
  }

  return data;
}

export const categories = [
  'Salary', 'Freelance', 'Investments', 'Food', 'Transport',
  'Shopping', 'Entertainment', 'Utilities', 'Health',
];

export const categoryColors: Record<string, string> = {
  Salary: '#22c55e',
  Freelance: '#3b82f6',
  Investments: '#8b5cf6',
  Food: '#f97316',
  Transport: '#06b6d4',
  Shopping: '#ec4899',
  Entertainment: '#eab308',
  Utilities: '#64748b',
  Health: '#ef4444',
};
