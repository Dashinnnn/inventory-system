import './Checkbox.css';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="storybook-checkbox-wrapper">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="storybook-checkbox"></span>
      {label}
    </label>
  );
};