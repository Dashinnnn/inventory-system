'use client';

import React from 'react';
import styles from './TextArea.module.css';

type TextAreaProps = {
  variant?: 'primary';
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  variant = 'primary',
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange && onChange(e);
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
        }}
         rows={3}
        className={`${styles.input} ${styles[variant]}`}
      />
    </div>
  );
};

export default TextArea;