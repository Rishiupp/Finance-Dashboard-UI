import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { categoryColors } from '../data/mockData';
import type { Transaction } from '../types';

/** Renders a colored circle with 2-letter category abbreviation */
function CategoryIcon({ category, size = 'md' }: { category: string; size?: 'sm' | 'md' | 'lg' }) {
  const color = categoryColors[category] || '#94a3b8';
  const sizeClasses = { sm: 'w-8 h-8 text-[10px]', md: 'w-10 h-10 text-xs', lg: 'w-14 h-14 text-base' };
  const abbr = category.substring(0, 2).toUpperCase();
  return (
    <div className={`${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold text-white shrink-0`}
      style={{ backgroundColor: `${color}20`, color }}>
      {abbr}
    </div>
  );
}

function CloseIcon() {
  return (
    <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-neutral-600 dark:text-white">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" />
    </motion.svg>
  );
}

export default function TransactionList() {
  const { state, dispatch, filteredTransactions } = useAppContext();
  const [active, setActive] = useState<Transaction | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) { if (event.key === 'Escape') setActive(null); }
    if (active) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  const handleDelete = (txId: string) => { dispatch({ type: 'DELETE_TRANSACTION', payload: txId }); setActive(null); };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input id="search-transactions" type="text" placeholder="Search transactions..."
            value={state.searchQuery} onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] text-sm font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-violet-400 dark:focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10 transition-all" />
        </div>
        <select id="filter-category" value={state.filterCategory}
          onChange={e => dispatch({ type: 'SET_FILTER_CATEGORY', payload: e.target.value })}
          className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:border-violet-400 dark:focus:border-violet-500/40 [&>option]:bg-white dark:[&>option]:bg-[#141420]">
          <option value="all">All Categories</option>
          {Object.keys(categoryColors).map(cat => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
        <select id="filter-type" value={state.filterType}
          onChange={e => dispatch({ type: 'SET_FILTER_TYPE', payload: e.target.value })}
          className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:border-violet-400 dark:focus:border-violet-500/40 [&>option]:bg-white dark:[&>option]:bg-[#141420]">
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <div className="flex gap-2">
          <button id="sort-date"
            onClick={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'date', sortOrder: state.sortBy === 'date' && state.sortOrder === 'desc' ? 'asc' : 'desc' } })}
            className={`px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              state.sortBy === 'date'
                ? 'border-violet-400 dark:border-violet-500/40 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300'
                : 'border-neutral-200 dark:border-white/[0.08] text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}>
            Date {state.sortBy === 'date' ? (state.sortOrder === 'desc' ? '↓' : '↑') : ''}
          </button>
          <button id="sort-amount"
            onClick={() => dispatch({ type: 'SET_SORT', payload: { sortBy: 'amount', sortOrder: state.sortBy === 'amount' && state.sortOrder === 'desc' ? 'asc' : 'desc' } })}
            className={`px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              state.sortBy === 'amount'
                ? 'border-violet-400 dark:border-violet-500/40 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300'
                : 'border-neutral-200 dark:border-white/[0.08] text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}>
            Amount {state.sortBy === 'amount' ? (state.sortOrder === 'desc' ? '↓' : '↑') : ''}
          </button>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <p className="text-lg font-bold text-neutral-700 dark:text-neutral-300">No transactions found</p>
          <p className="text-sm text-neutral-500 mt-1">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Expanded Card Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button key={`button-${active.id}-${id}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white/80 dark:bg-white/10 rounded-full h-8 w-8 shadow-lg"
              onClick={() => setActive(null)}>
              <CloseIcon />
            </motion.button>
            <motion.div layoutId={`card-${active.id}-${id}`} ref={ref}
              className="w-full max-w-[500px] h-fit max-h-[90%] flex flex-col bg-white dark:bg-[#141420] sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/[0.08] shadow-2xl mx-4">
              <div className="p-6 bg-gradient-to-br from-neutral-50 dark:from-white/[0.04] to-transparent">
                <div className="flex items-center justify-between">
                  <motion.div layoutId={`icon-${active.id}-${id}`}>
                    <CategoryIcon category={active.category} size="lg" />
                  </motion.div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    active.type === 'income'
                      ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                      : 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20'
                  }`}>
                    {active.type === 'income' ? '+ Income' : '- Expense'}
                  </span>
                </div>
                <motion.h3 layoutId={`title-${active.id}-${id}`} className="text-xl font-extrabold text-neutral-900 dark:text-white mt-4">
                  {active.description}
                </motion.h3>
                <motion.p layoutId={`amount-${active.id}-${id}`}
                  className={`text-3xl font-extrabold mt-2 ${active.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {active.type === 'income' ? '+' : '-'}{formatCurrency(active.amount)}
                </motion.p>
              </div>
              <div className="p-6">
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100 dark:border-white/[0.06]">
                    <span className="text-sm font-medium text-neutral-500">Date</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{formatDate(active.date)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100 dark:border-white/[0.06]">
                    <span className="text-sm font-medium text-neutral-500">Category</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoryColors[active.category] || '#94a3b8' }} />
                      <span className="text-sm font-bold text-neutral-900 dark:text-white">{active.category}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-neutral-500">Transaction ID</span>
                    <span className="text-sm font-mono text-neutral-400">#{active.id}</span>
                  </div>
                  {state.role === 'admin' && (
                    <div className="flex gap-3 pt-4">
                      <button onClick={() => handleDelete(active.id)}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                        Delete
                      </button>
                      <button onClick={() => setActive(null)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-bold hover:opacity-90 transition-opacity">
                        Close
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Transaction Cards List */}
      <ul className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        {filteredTransactions.map((tx) => (
          <motion.li layoutId={`card-${tx.id}-${id}`} key={tx.id} onClick={() => setActive(tx)}
            className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 dark:border-white/[0.04] bg-neutral-50/50 dark:bg-white/[0.02] hover:bg-neutral-100 dark:hover:bg-white/[0.05] hover:border-neutral-200 dark:hover:border-white/[0.08] cursor-pointer transition-all duration-200 group">
            <div className="flex items-center gap-3">
              <motion.div layoutId={`icon-${tx.id}-${id}`}>
                <CategoryIcon category={tx.category} size="sm" />
              </motion.div>
              <div>
                <motion.h3 layoutId={`title-${tx.id}-${id}`} className="text-sm font-bold text-neutral-900 dark:text-white">{tx.description}</motion.h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">{formatDate(tx.date)} · {tx.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.span layoutId={`amount-${tx.id}-${id}`}
                className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
              </motion.span>
              <svg className="w-4 h-4 text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
