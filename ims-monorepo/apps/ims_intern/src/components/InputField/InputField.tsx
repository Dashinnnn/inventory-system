'use client';

import React from 'react';
import styles from './InputField.module.css';

type InputFieldProps = {
  variant?: 'primary' | 'password' | 'email' | 'number';
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  variant = 'primary',
  type = 'text',
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        type = {type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${styles[variant]}`}
      />
    </div>
  );
};

export default InputField;