import { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import styles from './Table.module.css';

interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
}: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                style={{ width: column.width }}
                className={column.sortable ? styles.sortable : ''}
                onClick={() => column.sortable && onSort?.(String(column.key))}
              >
                <div className={styles.headerCell}>
                  {column.header}
                  {column.sortable && (
                    <span className={styles.sortIcons}>
                      <ChevronUp
                        size={12}
                        className={
                          sortColumn === column.key && sortDirection === 'asc'
                            ? styles.sortActive
                            : ''
                        }
                      />
                      <ChevronDown
                        size={12}
                        className={
                          sortColumn === column.key && sortDirection === 'desc'
                            ? styles.sortActive
                            : ''
                        }
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? styles.clickable : ''}
            >
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
