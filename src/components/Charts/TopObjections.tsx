import styles from './TopObjections.module.css';

interface ObjectionItem {
  name: string;
  count: number;
  color: string;
}

interface TopObjectionsProps {
  data: ObjectionItem[];
}

export function TopObjections({ data }: TopObjectionsProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {data.map((item) => {
          const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div key={item.name} className={styles.item}>
              <div className={styles.labelRow}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.stats}>{item.count} / {percentage}%</span>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
