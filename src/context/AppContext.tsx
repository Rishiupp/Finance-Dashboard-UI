import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Transaction, Role } from '../types';
import { transactions as initialTransactions } from '../data/mockData';

interface AppState {
  transactions: Transaction[];
  role: Role;
  darkMode: boolean;
  searchQuery: string;
  filterCategory: string;
  filterType: string;
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  activeTab: 'dashboard' | 'transactions' | 'insights';
}

type Action =
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER_CATEGORY'; payload: string }
  | { type: 'SET_FILTER_TYPE'; payload: string }
  | { type: 'SET_SORT'; payload: { sortBy: 'date' | 'amount'; sortOrder: 'asc' | 'desc' } }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_TAB'; payload: 'dashboard' | 'transactions' | 'insights' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  transactions: initialTransactions,
  role: 'admin',
  darkMode: true,
  searchQuery: '',
  filterCategory: 'all',
  filterType: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
  activeTab: 'dashboard',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTER_CATEGORY':
      return { ...state, filterCategory: action.payload };
    case 'SET_FILTER_TYPE':
      return { ...state, filterType: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  filteredTransactions: Transaction[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    try {
      const saved = localStorage.getItem('finance-dashboard-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initial, ...parsed };
      }
    } catch {
      // ignore
    }
    return initial;
  });

  // Persist state
  useEffect(() => {
    const { transactions, role, darkMode } = state;
    localStorage.setItem(
      'finance-dashboard-state',
      JSON.stringify({ transactions, role, darkMode })
    );
  }, [state.transactions, state.role, state.darkMode]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  // Filtered & sorted transactions
  const filteredTransactions = React.useMemo(() => {
    let result = [...state.transactions];

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (state.filterCategory !== 'all') {
      result = result.filter(t => t.category === state.filterCategory);
    }

    if (state.filterType !== 'all') {
      result = result.filter(t => t.type === state.filterType);
    }

    result.sort((a, b) => {
      if (state.sortBy === 'date') {
        const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
        return state.sortOrder === 'asc' ? diff : -diff;
      } else {
        const diff = a.amount - b.amount;
        return state.sortOrder === 'asc' ? diff : -diff;
      }
    });

    return result;
  }, [state.transactions, state.searchQuery, state.filterCategory, state.filterType, state.sortBy, state.sortOrder]);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
