import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import CandlestickChart from './components/CandlestickChart';
import SpendingBreakdown from './components/SpendingBreakdown';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import InsightsPanel from './components/InsightsPanel';

function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#f8f9fc] dark:bg-[#0a0a0a]" />
      <div
        className={cn(
          "absolute inset-0 opacity-40",
          "[background-size:48px_48px]",
          "[background-image:linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]",
        )}
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neutral-300/10 dark:bg-white/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neutral-300/10 dark:bg-white/[0.02] rounded-full blur-[120px]" />
    </div>
  );
}

function DashboardContent() {
  const { state } = useAppContext();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen">
      <GridBackground />
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {/* ═══════════ DASHBOARD TAB ═══════════ */}
          {state.activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Hero */}
              <div className="text-center pt-4 pb-2">
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-500 tracking-widest uppercase mb-2">Dashboard</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
                  Financial Overview
                </h2>
                <p className="text-neutral-500 dark:text-neutral-500 mt-2 max-w-lg mx-auto text-sm leading-relaxed">
                  Track your income, expenses, and spending patterns at a glance
                </p>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <CandlestickChart />
                </div>
                <div className="lg:col-span-2">
                  <SpendingBreakdown />
                </div>
              </div>

              {/* Summary Cards */}
              <SummaryCards />

              {/* Recent Transactions */}
              <div className="rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.02] backdrop-blur-xl p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Recent Transactions</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-0.5">Latest financial activity</p>
                  </div>
                  <button
                    onClick={() => state.role === 'admin' && setShowAddModal(true)}
                    className={cn(
                      'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                      state.role === 'admin'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 hover:-translate-y-0.5'
                        : 'bg-neutral-100 dark:bg-white/5 text-neutral-400 cursor-not-allowed border border-neutral-200 dark:border-white/10'
                    )}
                    disabled={state.role !== 'admin'}
                    title={state.role !== 'admin' ? 'Switch to Admin role to add transactions' : ''}
                  >
                    {state.role === 'admin' ? '+ Add Transaction' : 'View Only'}
                  </button>
                </div>
                <TransactionList />
              </div>
            </motion.div>
          )}

          {/* ═══════════ TRANSACTIONS TAB ═══════════ */}
          {state.activeTab === 'transactions' && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-500 tracking-widest uppercase mb-1">Transactions</p>
                  <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Manage Activity</h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">Search, filter, and explore your financial records</p>
                </div>
                {state.role === 'admin' && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all"
                  >
                    + Add Transaction
                  </button>
                )}
              </div>
              <div className="rounded-2xl border border-neutral-200/60 dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.02] backdrop-blur-xl p-6 shadow-sm dark:shadow-none">
                <TransactionList />
              </div>
            </motion.div>
          )}

          {/* ═══════════ INSIGHTS TAB ═══════════ */}
          {state.activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-500 tracking-widest uppercase mb-1">Insights</p>
                <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Financial Intelligence</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">Understand your spending patterns and financial health</p>
              </div>
              <InsightsPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-neutral-200/60 dark:border-white/[0.06] py-6 mt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 dark:text-neutral-600">
            2026 Zorvyn. Built for evaluation purposes.
          </p>
          <div className="flex items-center gap-4">
            <ExportButton />
            <span className="text-xs text-neutral-400 dark:text-neutral-600">
              Role: <span className="font-semibold capitalize text-neutral-600 dark:text-neutral-400">{state.role}</span>
            </span>
          </div>
        </div>
      </footer>

      <AddTransactionModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}

function ExportButton() {
  const { state } = useAppContext();

  const handleExport = (format: 'csv' | 'json') => {
    const data = state.transactions;
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      filename = 'transactions.json';
      mimeType = 'application/json';
    } else {
      const headers = ['ID', 'Date', 'Description', 'Amount', 'Category', 'Type'];
      const rows = data.map(t => [t.id, t.date, t.description, t.amount, t.category, t.type].join(','));
      content = [headers.join(','), ...rows].join('\n');
      filename = 'transactions.csv';
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-2">
      <button id="export-csv" onClick={() => handleExport('csv')}
        className="text-xs px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-white/10 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-white/20 transition-colors">
        Export CSV
      </button>
      <button id="export-json" onClick={() => handleExport('json')}
        className="text-xs px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-white/10 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-white/20 transition-colors">
        Export JSON
      </button>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
