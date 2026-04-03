import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { categories, categoryColors } from '../data/mockData';
import { generateId } from '../utils/formatters';

export default function AddTransactionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dispatch } = useAppContext();
  const [form, setForm] = useState({
    description: '', amount: '', category: 'Food',
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        id: generateId(), description: form.description,
        amount: parseFloat(form.amount), category: form.category,
        type: form.type, date: form.date,
        icon: form.category.substring(0, 2).toUpperCase(),
      },
    });
    setForm({ description: '', amount: '', category: 'Food', type: 'expense', date: new Date().toISOString().split('T')[0] });
    onClose();
  };

  if (!open) return null;

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] text-sm font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-violet-400 dark:focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-[#141420] rounded-3xl border border-neutral-200 dark:border-white/[0.08] shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-neutral-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-neutral-900 dark:text-white">Add Transaction</h2>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/[0.06] flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                <path d="M18 6L6 18" /><path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex gap-2 p-1 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] rounded-xl">
            {(['expense', 'income'] as const).map(type => (
              <button key={type} type="button" onClick={() => setForm({ ...form, type })}
                className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  form.type === type
                    ? type === 'income'
                      ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                    : 'text-neutral-400 border border-transparent'
                }`}>
                {type}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5 uppercase tracking-wider">Description</label>
            <input id="input-description" type="text" value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="E.g., Grocery shopping" required className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5 uppercase tracking-wider">Amount (₹)</label>
              <input id="input-amount" type="number" value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                placeholder="0" min="1" required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5 uppercase tracking-wider">Date</label>
              <input id="input-date" type="date" value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5 uppercase tracking-wider">Category</label>
            <select id="input-category" value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className={`${inputCls} [&>option]:bg-white dark:[&>option]:bg-[#141420]`}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {/* Color preview */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[form.category] }} />
              <span className="text-xs text-neutral-400 font-medium">{form.category}</span>
            </div>
          </div>

          <button type="submit" id="submit-transaction"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
