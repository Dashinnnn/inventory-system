'use client';

import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  type?: 'button';
  children: React.ReactNode; 
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; 
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  type = 'button',
  children,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button} ${styles[variant]}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;