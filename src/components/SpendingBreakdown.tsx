import { useMemo } from 'react';
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { categoryColors } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  if ((percent ?? 0) < 0.06) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#141420]/95 backdrop-blur-xl p-3 shadow-xl text-sm">
        <p className="font-bold text-neutral-900 dark:text-white text-xs">{payload[0].name}</p>
        <p className="text-neutral-500 mt-0.5 text-xs">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function SpendingBreakdown() {
  const { state } = useAppContext();

  const { categoryData, totalExpenses } = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};
    const expenses = state.transactions.filter(t => t.type === 'expense');
    expenses.forEach(t => { expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount; });
    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
    const categoryData = Object.entries(expensesByCategory)
      .map(([name, value]) => ({ name, value, color: categoryColors[name] || '#94a3b8', pct: totalExpenses > 0 ? ((value / totalExpenses) * 100).toFixed(1) : '0' }))
      .sort((a, b) => b.value - a.value);
    return { categoryData, totalExpenses };
  }, [state.transactions]);

  if (categoryData.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200/70 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm p-5 flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <p className="text-neutral-500 text-sm font-medium">No expense data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200/70 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm p-5 h-full shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Spending Breakdown</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">By category · All time</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Total</p>
          <p className="text-sm font-bold text-neutral-900 dark:text-white">{formatCurrency(totalExpenses)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={categoryData} labelLine={false} label={renderCustomizedLabel}
              dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={40} paddingAngle={2} strokeWidth={0}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend with amounts and percentage */}
        <div className="w-full grid grid-cols-3 gap-2 mt-3">
          {categoryData.map(cat => (
            <div key={cat.name} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-neutral-50 dark:bg-white/[0.03] border border-neutral-100 dark:border-white/[0.04]">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 truncate">{cat.name}</p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-500">{formatCurrency(cat.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
