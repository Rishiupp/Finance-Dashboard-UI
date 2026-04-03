import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { categoryColors } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#141420]/95 backdrop-blur-xl p-3 shadow-xl text-sm">
        <p className="font-bold text-neutral-900 dark:text-white mb-1 text-xs">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="text-xs font-semibold">
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/** Small colored icon with abbreviation, used for insight card indicators */
function InsightIcon({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold opacity-80 group-hover:opacity-100 transition-opacity`}>
      {label}
    </div>
  );
}

export default function InsightsPanel() {
  const { state } = useAppContext();

  const insights = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === 'expense');
    const incomes = state.transactions.filter(t => t.type === 'income');

    const categoryTotals: Record<string, number> = {};
    expenses.forEach(t => { categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount; });
    const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

    const months: Record<string, { income: number; expenses: number }> = {};
    state.transactions.forEach(t => {
      const month = t.date.substring(0, 7);
      if (!months[month]) months[month] = { income: 0, expenses: 0 };
      if (t.type === 'income') months[month].income += t.amount;
      else months[month].expenses += t.amount;
    });

    const monthlyData = Object.entries(months)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        income: data.income, expenses: data.expenses,
      }));

    const avgExpense = expenses.length > 0 ? expenses.reduce((s, t) => s + t.amount, 0) / expenses.length : 0;
    const avgIncome = incomes.length > 0 ? incomes.reduce((s, t) => s + t.amount, 0) / incomes.length : 0;

    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : '0';

    const largestExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];

    const categoryCounts: Record<string, number> = {};
    expenses.forEach(t => { categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1; });
    const mostFrequentCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

    return { highestCategory, monthlyData, avgExpense, avgIncome, savingsRate, largestExpense, mostFrequentCategory };
  }, [state.transactions]);

  const insightCards = [
    { title: 'Savings Rate', value: `${insights.savingsRate}%`, subtitle: 'of income saved', iconLabel: 'SR', accent: 'from-emerald-500 to-green-500', border: 'hover:border-emerald-300 dark:hover:border-emerald-500/30' },
    { title: 'Top Spending', value: insights.highestCategory?.[0] ?? 'N/A', subtitle: insights.highestCategory ? formatCurrency(insights.highestCategory[1]) : '', iconLabel: 'TS', accent: 'from-rose-500 to-red-500', border: 'hover:border-rose-300 dark:hover:border-rose-500/30' },
    { title: 'Avg Expense', value: formatCurrency(insights.avgExpense), subtitle: 'per transaction', iconLabel: 'AE', accent: 'from-amber-500 to-orange-500', border: 'hover:border-amber-300 dark:hover:border-amber-500/30' },
    { title: 'Most Frequent', value: insights.mostFrequentCategory?.[0] ?? 'N/A', subtitle: insights.mostFrequentCategory ? `${insights.mostFrequentCategory[1]} transactions` : '', iconLabel: 'MF', accent: 'from-blue-500 to-cyan-500', border: 'hover:border-blue-300 dark:hover:border-blue-500/30' },
    { title: 'Avg Income', value: formatCurrency(insights.avgIncome), subtitle: 'per transaction', iconLabel: 'AI', accent: 'from-violet-500 to-purple-500', border: 'hover:border-violet-300 dark:hover:border-violet-500/30' },
    { title: 'Largest Expense', value: insights.largestExpense ? formatCurrency(insights.largestExpense.amount) : 'N/A', subtitle: insights.largestExpense?.description ?? '', iconLabel: 'LX', accent: 'from-pink-500 to-fuchsia-500', border: 'hover:border-pink-300 dark:hover:border-pink-500/30' },
  ];

  return (
    <div className="space-y-6">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insightCards.map(card => (
          <div key={card.title}
            className={`group relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm p-5 transition-all duration-300 ${card.border} hover:shadow-lg dark:hover:shadow-none`}>
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.accent} opacity-50 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">{card.title}</p>
                <p className="mt-2 text-xl font-extrabold text-neutral-900 dark:text-white">{card.value}</p>
                <p className="mt-0.5 text-xs font-medium text-neutral-500 truncate max-w-[180px]">{card.subtitle}</p>
              </div>
              <InsightIcon label={card.iconLabel} gradient={card.accent} />
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Comparison Chart */}
      <div className="rounded-2xl border border-neutral-200/70 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm p-5 shadow-sm dark:shadow-none">
        <div className="mb-4">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Monthly Comparison</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">Income vs Expenses by month</p>
        </div>
        {insights.monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={insights.monthlyData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 600 }} axisLine={false} tickLine={false} width={50} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128,128,128,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} iconType="circle" iconSize={8} />
              <Bar dataKey="income" fill="#34d399" radius={[6, 6, 0, 0]} barSize={28} name="Income" />
              <Bar dataKey="expenses" fill="#f87171" radius={[6, 6, 0, 0]} barSize={28} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[320px]">
            <p className="text-neutral-500 font-medium">No data available</p>
          </div>
        )}
      </div>

      {/* Spending by Category Bars */}
      <div className="rounded-2xl border border-neutral-200/70 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm p-5 shadow-sm dark:shadow-none">
        <div className="mb-5">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Category Spending Analysis</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">Detailed expense breakdown</p>
        </div>
        <div className="space-y-4">
          {(() => {
            const categoryTotals: Record<string, number> = {};
            state.transactions.filter(t => t.type === 'expense').forEach(t => {
              categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            });
            const maxAmount = Math.max(...Object.values(categoryTotals), 1);
            return Object.entries(categoryTotals)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amount]) => (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{cat}</span>
                    <span className="text-sm font-extrabold text-neutral-900 dark:text-white">{formatCurrency(amount)}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-neutral-100 dark:bg-white/[0.04] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(amount / maxAmount) * 100}%`, backgroundColor: categoryColors[cat] || '#94a3b8' }} />
                  </div>
                </div>
              ));
          })()}
        </div>
      </div>
    </div>
  );
}
