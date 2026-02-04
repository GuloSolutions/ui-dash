import styles from './Checkbox.module.css';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
}

export function Checkbox({ label, checked, onChange, color }: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={styles.checkmark}
        style={checked && color ? { backgroundColor: color, borderColor: color } : {}}
      ></span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
