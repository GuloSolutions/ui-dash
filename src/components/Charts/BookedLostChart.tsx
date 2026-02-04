import { useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './BookedLostChart.module.css';

interface ChartDataPoint {
  period: string;
  booked: number;
  lost: number;
  adSpend?: number;
  avgTicket?: number;
  cpql?: number;
  cpbl?: number;
}

interface MetricToggle {
  key: string;
  label: string;
  color: string;
  type: 'bar' | 'line';
  checked: boolean;
}

// Generate sample weekly data
const generateWeeklyData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      period: `W${i + 1}`,
      booked: Math.floor(Math.random() * 8) + 2,
      lost: Math.floor(Math.random() * 4) + 1,
      adSpend: Math.floor(Math.random() * 500) + 200,
      avgTicket: Math.floor(Math.random() * 200) + 100,
      cpql: Math.floor(Math.random() * 50) + 10,
      cpbl: Math.floor(Math.random() * 30) + 5,
    });
  }
  return data;
};

const weeklyData = generateWeeklyData();

export function BookedLostChart() {
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [metrics, setMetrics] = useState<MetricToggle[]>([
    { key: 'booked', label: 'Booked', color: '#4ade80', type: 'bar', checked: true },
    { key: 'lost', label: 'Lost', color: '#ef4444', type: 'bar', checked: true },
    { key: 'adSpend', label: 'Ad Spend', color: '#3b82f6', type: 'line', checked: false },
    { key: 'avgTicket', label: 'Avg Ticket', color: '#8b5cf6', type: 'line', checked: false },
    { key: 'cpql', label: 'CPQL', color: '#f59e0b', type: 'line', checked: false },
    { key: 'cpbl', label: 'CPBL', color: '#06b6d4', type: 'line', checked: false },
  ]);

  const toggleMetric = (key: string) => {
    setMetrics(prev =>
      prev.map(m => (m.key === key ? { ...m, checked: !m.checked } : m))
    );
  };

  const activeMetrics = metrics.filter(m => m.checked);
  const hasLineMetrics = activeMetrics.some(m => m.type === 'line');

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.timePeriodToggle}>
          {(['daily', 'weekly', 'monthly'] as const).map((period) => (
            <button
              key={period}
              className={`${styles.periodBtn} ${timePeriod === period ? styles.active : ''}`}
              onClick={() => setTimePeriod(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.metricToggles}>
          {metrics.map((metric) => (
            <label key={metric.key} className={styles.metricToggle}>
              <input
                type="checkbox"
                checked={metric.checked}
                onChange={() => toggleMetric(metric.key)}
              />
              <span
                className={styles.checkbox}
                style={metric.checked ? { backgroundColor: metric.color, borderColor: metric.color } : {}}
              />
              <span className={styles.metricLabel}>{metric.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis
              dataKey="period"
              stroke="var(--text-tertiary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: 'var(--text-tertiary)' }}
            />
            <YAxis
              yAxisId="left"
              stroke="var(--text-tertiary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            {hasLineMetrics && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="var(--text-tertiary)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '0.8125rem',
              }}
            />
            {activeMetrics
              .filter(m => m.type === 'bar')
              .map((metric) => (
                <Bar
                  key={metric.key}
                  yAxisId="left"
                  dataKey={metric.key}
                  stackId="a"
                  fill={metric.color}
                  radius={metric.key === 'lost' ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            {activeMetrics
              .filter(m => m.type === 'line')
              .map((metric) => (
                <Line
                  key={metric.key}
                  yAxisId="right"
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className={styles.tip}>Tip: keep only 2–3 toggles enabled by default to preserve clarity.</p>
    </div>
  );
}
