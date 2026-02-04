import { LeadStatus } from '../../types';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusConfig: Record<LeadStatus, { className: string }> = {
  'Follow-Up': { className: 'followUp' },
  'Missed': { className: 'missed' },
  'Not Booked': { className: 'notBooked' },
  'Unqualified': { className: 'unqualified' },
  'New Lead': { className: 'newLead' },
  'Lost': { className: 'lost' },
  'Booked': { className: 'booked' },
  'Cancellation': { className: 'cancellation' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`${styles.badge} ${styles[config.className]}`}>
      {status}
    </span>
  );
}
