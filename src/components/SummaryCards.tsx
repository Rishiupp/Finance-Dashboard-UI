import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

function Sparkline({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 100;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  const areaPoints = `0,${height} ${points} ${w},${height}`;

  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SummaryCards() {
  const { state } = useAppContext();

  const { totalIncome, totalExpenses, totalBalance, incomeChange, expenseChange, incomeSparkline, expenseSparkline, balanceSparkline } = useMemo(() => {
    const txs = state.transactions;
    const income = txs.filter(t => t.type === 'income');
    const expenses = txs.filter(t => t.type === 'expense');

    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    const months = ['2026-01', '2026-02', '2026-03'];
    const incomeByMonth = months.map(m => income.filter(t => t.date.startsWith(m)).reduce((s, t) => s + t.amount, 0));
    const expenseByMonth = months.map(m => expenses.filter(t => t.date.startsWith(m)).reduce((s, t) => s + t.amount, 0));
    const balanceByMonth = months.map((_, i) => incomeByMonth[i] - expenseByMonth[i]);

    const thisMonthIncome = incomeByMonth[2];
    const lastMonthIncome = incomeByMonth[1];
    const incomeChange = lastMonthIncome > 0 ? ((thisMonthIncome - lastMonthIncome) / lastMonthIncome * 100).toFixed(1) : '0';

    const thisMonthExpenses = expenseByMonth[2];
    const lastMonthExpenses = expenseByMonth[1];
    const expenseChange = lastMonthExpenses > 0 ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100).toFixed(1) : '0';

    return {
      totalIncome, totalExpenses, totalBalance, incomeChange, expenseChange,
      incomeSparkline: incomeByMonth,
      expenseSparkline: expenseByMonth,
      balanceSparkline: balanceByMonth,
    };
  }, [state.transactions]);

  const cards = [
    {
      label: 'Total Balance',
      value: formatCurrency(totalBalance),
      sparkData: balanceSparkline,
      sparkColor: '#a3a3a3',
      accent: 'from-neutral-600 to-neutral-800',
      border: 'hover:border-neutral-400 dark:hover:border-neutral-500/40',
      change: null,
    },
    {
      label: 'Total Income',
      value: formatCurrency(totalIncome),
      sparkData: incomeSparkline,
      sparkColor: '#34d399',
      accent: 'from-emerald-500 to-green-600',
      border: 'hover:border-emerald-300 dark:hover:border-emerald-500/30',
      change: { value: incomeChange, positive: Number(incomeChange) >= 0 },
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      sparkData: expenseSparkline,
      sparkColor: '#f87171',
      accent: 'from-rose-500 to-red-600',
      border: 'hover:border-rose-300 dark:hover:border-rose-500/30',
      change: { value: expenseChange, positive: Number(expenseChange) <= 0 },
    },
    {
      label: 'Transactions',
      value: state.transactions.length.toString(),
      sparkData: [12, 15, 13],
      sparkColor: '#a3a3a3',
      accent: 'from-neutral-500 to-neutral-700',
      border: 'hover:border-neutral-400 dark:hover:border-neutral-500/40',
      change: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`group relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm p-5 transition-all duration-300 ${card.border} hover:shadow-lg dark:hover:shadow-none`}
        >
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.accent} opacity-70 group-hover:opacity-100 transition-opacity`} />

          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                {card.label}
              </p>
              <p className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {card.value}
              </p>
              {card.change && (
                <p className={`mt-1 text-xs font-semibold flex items-center gap-1.5 ${
                  card.change.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${
                    card.change.positive ? 'bg-emerald-100 dark:bg-emerald-400/15' : 'bg-rose-100 dark:bg-rose-400/15'
                  }`}>
                    {card.change.positive ? '↑' : '↓'}
                  </span>
                  {Math.abs(Number(card.change.value))}% vs last month
                </p>
              )}
            </div>
          </div>

          <div className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <Sparkline data={card.sparkData} color={card.sparkColor} height={36} />
          </div>

          <div className="flex justify-between mt-1">
            <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-600">Jan</span>
            <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-600">Feb</span>
            <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-600">Mar</span>
          </div>
        </div>
      ))}
    </div>
  );
}
