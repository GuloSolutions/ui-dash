import { Checkbox, RadioButton } from '../UI';
import styles from './FilterSidebar.module.css';

interface FilterGroup {
  title: string;
  items: {
    label: string;
    value: string;
    checked: boolean;
    color?: string;
  }[];
  onToggle: (value: string) => void;
  onClear?: () => void;
  emptyText?: string;
  type?: 'checkbox' | 'radio';
  sticky?: boolean;
}

interface FilterSidebarProps {
  groups: FilterGroup[];
}

export function FilterSidebar({ groups }: FilterSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      {groups.map((group) => {
        const hasSelection = group.items.some(item => item.checked);
        const isRadio = group.type === 'radio';

        return (
          <div key={group.title} className={`${styles.group} ${group.sticky ? styles.sticky : ''}`}>
            <div className={styles.groupHeader}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              {hasSelection && group.onClear && (
                <button className={styles.clearBtn} onClick={group.onClear}>
                  Clear
                </button>
              )}
            </div>
            <div className={styles.items}>
              {group.items.map((item) => (
                isRadio ? (
                  <RadioButton
                    key={item.value}
                    label={item.label}
                    checked={item.checked}
                    onChange={() => group.onToggle(item.value)}
                    name={group.title}
                  />
                ) : (
                  <Checkbox
                    key={item.value}
                    label={item.label}
                    checked={item.checked}
                    onChange={() => group.onToggle(item.value)}
                    color={item.color}
                  />
                )
              ))}
            </div>
            {!hasSelection && group.emptyText && (
              <p className={styles.emptyText}>{group.emptyText}</p>
            )}
          </div>
        );
      })}
    </aside>
  );
}
