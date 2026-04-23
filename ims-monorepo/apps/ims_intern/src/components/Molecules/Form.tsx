'use client';

import React from 'react';
import InputField from '../InputField/InputField';
import styles from './Form.module.css';

type FormProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  error?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form: React.FC<FormProps> = ({
  label,
  name,
  value,
  placeholder,
  type = 'text',
  error,
  required = false,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <InputField
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Form;