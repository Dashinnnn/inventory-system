import { useState } from 'react';
import './Radio.css';

interface RadioOption {
  label: string;
  value: string;

}

interface RadioGroupProps {
  options: RadioOption[];
}

export const RadioGroup = ({ options }: RadioGroupProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (value: string) => {
    if (selected === value) {
      setSelected(null); 
    } else {
      setSelected(value);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option.value} className="storybook-radio-wrapper">
          <input
            type="radio"
            checked={selected === option.value}
            onChange={() => handleClick(option.value)}
          />
          <span className="storybook-radio"></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};