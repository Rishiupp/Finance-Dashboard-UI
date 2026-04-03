import { useMemo } from 'react';
import {
  Bar, BarChart, CartesianGrid, Rectangle, Tooltip, XAxis, YAxis, ResponsiveContainer, ErrorBar,
} from 'recharts';
import { generateMockMarketData } from '../data/mockData';
import type { MarketCandle } from '../types';

const data: ReadonlyArray<MarketCandle> = generateMockMarketData(60, 1337, 250);

const barDataKey = (entry: MarketCandle): [number, number] => [
  Math.min(entry.close, entry.open), Math.max(entry.close, entry.open),
];

const whiskerDataKey = (entry: MarketCandle): [number, number] => {
  const highEnd = Math.max(entry.close, entry.open);
  return [highEnd - entry.low, entry.high - highEnd];
};

const timestampToTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const formatRupees = (value: number) => `₹${value.toFixed(0)}`;

const Candlestick = (props: any) => {
  const color = props.open < props.close ? '#34d399' : '#f87171';
  return <Rectangle {...props} fill={color} radius={[1, 1, 0, 0]} />;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const entry: MarketCandle = payload[0].payload;
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#141420]/95 backdrop-blur-xl p-3 shadow-xl text-sm">
        <p className="text-neutral-500 text-xs mb-2 font-semibold">{timestampToTime(entry.time)}</p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1.5">
          <span className="text-neutral-400 text-xs">Open</span>
          <span className="font-semibold text-neutral-900 dark:text-white text-xs">{formatRupees(entry.open)}</span>
          <span className="text-neutral-400 text-xs">Close</span>
          <span className="font-semibold text-neutral-900 dark:text-white text-xs">{formatRupees(entry.close)}</span>
          <span className="text-neutral-400 text-xs">High</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">{formatRupees(entry.high)}</span>
          <span className="text-neutral-400 text-xs">Low</span>
          <span className="font-semibold text-rose-600 dark:text-rose-400 text-xs">{formatRupees(entry.low)}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CandlestickChart() {
  const chartData = useMemo(() => [...data], []);

  return (
    <div className="rounded-2xl border border-neutral-200/70 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm p-5 h-full shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Balance Trend</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Candlestick · 60 intervals</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
            <span className="text-neutral-500 font-medium">Bullish</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-400" />
            <span className="text-neutral-500 font-medium">Bearish</span>
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" />
          <XAxis dataKey="time" tickFormatter={timestampToTime} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} interval={9} />
          <YAxis domain={['dataMin - 2', 'dataMax + 2']} tickFormatter={formatRupees} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={50} />
          <Bar dataKey={barDataKey} shape={<Candlestick />}>
            <ErrorBar dataKey={whiskerDataKey} width={0} stroke="#9ca3af" />
          </Bar>
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128,128,128,0.05)' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
