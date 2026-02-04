import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './ObjectionFilter.module.css';

interface ObjectionItem {
  name: string;
  color: string;
}

interface ObjectionFilterProps {
  items: ObjectionItem[];
  selectedObjections: Set<string>;
  onToggle: (name: string) => void;
}

export function ObjectionFilter({ items, selectedObjections, onToggle }: ObjectionFilterProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasFilters = selectedObjections.size > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDropdownLabel = () => {
    if (!hasFilters) return 'Filter';
    if (selectedObjections.size === 1) return Array.from(selectedObjections)[0];
    return `${selectedObjections.size} selected`;
  };

  return (
    <div className={styles.filterContainer} ref={dropdownRef}>
      <button
        className={styles.dropdown}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{getDropdownLabel()}</span>
        <ChevronDown size={16} className={dropdownOpen ? styles.chevronUp : ''} />
      </button>
      {dropdownOpen && (
        <div className={styles.dropdownMenu}>
          {items.map((item) => {
            const isChecked = selectedObjections.has(item.name);
            return (
              <label key={item.name} className={styles.dropdownItem}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle(item.name)}
                />
                <span className={styles.colorDot} style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
