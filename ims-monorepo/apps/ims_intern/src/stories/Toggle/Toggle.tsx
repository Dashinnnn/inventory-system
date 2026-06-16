import { useState } from 'react';
import './Toggle.css';

interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
}

export const Toggle = ({ checked = false }: ToggleProps) => {
  const [isOn, setIsOn] = useState(checked);

  return (
    <label className="storybook-toggle-wrapper">
      <input
        type="checkbox"
        checked={isOn}
        onChange={() => setIsOn(!isOn)}
      />
      <span className="storybook-toggle"></span>
    </label>
  );
};