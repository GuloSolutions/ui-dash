import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ObjectionData } from '../../types';
import styles from './ObjectionsChart.module.css';

interface LegendItem {
  name: string;
  count: number;
  color: string;
}

interface ObjectionsChartProps {
  data: ObjectionData[];
  legendItems: LegendItem[];
  selectedObjections?: Set<string>;
}

export function ObjectionsChart({ data, legendItems, selectedObjections }: ObjectionsChartProps) {
  const hasFilters = selectedObjections && selectedObjections.size > 0;
  const visibleItems = hasFilters
    ? legendItems.filter(item => selectedObjections.has(item.name))
    : legendItems;

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
          <XAxis
            dataKey="week"
            stroke="var(--text-tertiary)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--text-tertiary)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '0.875rem',
            }}
          />
          {visibleItems.map((item) => (
            <Line
              key={item.name}
              type="monotone"
              dataKey={item.name}
              stroke={item.color}
              strokeWidth={2}
              dot={{ fill: item.color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
