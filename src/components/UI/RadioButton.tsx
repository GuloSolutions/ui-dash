import styles from './RadioButton.module.css';

interface RadioButtonProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}

export function RadioButton({ label, checked, onChange, name }: RadioButtonProps) {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.radiomark} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
