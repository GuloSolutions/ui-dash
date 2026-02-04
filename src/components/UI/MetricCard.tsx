import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  size?: 'small' | 'default';
  compact?: boolean;
}

export function MetricCard({ label, value, change, size = 'default', compact = false }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const showChange = change !== undefined && change !== 0;

  return (
    <div className={`${styles.card} ${size === 'small' ? styles.small : ''} ${compact ? styles.compact : ''}`}>
      <span className={styles.label}>{label}</span>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {showChange && (
          <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </span>
        )}
        {change === 0 && (
          <span className={styles.changeNeutral}>0%</span>
        )}
      </div>
    </div>
  );
}
