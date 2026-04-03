export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
  icon: string;
}

export interface MarketCandle {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

export type Role = 'admin' | 'viewer';

export interface AppState {
  transactions: Transaction[];
  role: Role;
  darkMode: boolean;
  searchQuery: string;
  filterCategory: string;
  filterType: string;
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
}

export interface SpendingCategory {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}
