import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success';
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'hover' | 'disabled';
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  state = 'default',
  children,
  icon: Icon,
  onClick,
  disabled = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    const isDisabled = disabled || state === 'disabled';
    const isHover = state === 'hover';

    if (isDisabled) {
      return {
        backgroundColor: '#E0E0E0',
        color: '#FFFFFF',
        border: 'none',
        cursor: 'not-allowed',
      };
    }

    switch (variant) {
      case 'primary':
        if (isHover) {
          return {
            backgroundColor: '#6B7BC2', // Muted indigo for hover
            color: '#FFFFFF',
            border: 'none',
          };
        }
        return {
          backgroundColor: '#0047FF', // Solid blue
          color: '#FFFFFF',
          border: 'none',
        };
      
      case 'secondary':
        return {
          backgroundColor: '#B8D4FF', // Pale blue
          color: '#0047FF', // Blue text
          border: 'none',
        };
      
      case 'tertiary':
        return {
          backgroundColor: '#FFFFFF', // White background
          color: '#0047FF', // Blue text
          border: '1.5px solid #0047FF', // Thin blue outline
        };
      
      case 'danger':
        return {
          backgroundColor: '#FF0000', // Bright red
          color: '#FFFFFF',
          border: 'none',
        };
      
      case 'warning':
        return {
          backgroundColor: '#FFD966', // Yellow/amber
          color: '#FFFFFF',
          border: 'none',
        };
      
      case 'success':
        return {
          backgroundColor: '#36C081', // Green
          color: '#FFFFFF',
          border: 'none',
        };
      
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 24px',
          fontSize: '14px',
          minHeight: '36px',
        };
      case 'medium':
        return {
          padding: '12px 32px',
          fontSize: '16px',
          minHeight: '44px',
        };
      case 'large':
        return {
          padding: '14px 40px',
          fontSize: '18px',
          minHeight: '52px',
        };
      default:
        return {};
    }
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: '50px', // Full pill shape
    fontWeight: 600, // Semi-bold
    fontFamily: 'var(--font-primary)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    outline: 'none',
    cursor: disabled || state === 'disabled' ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
    ...getSizeStyles(),
    ...getVariantStyles(),
  };

  const iconSize = size === 'small' ? 16 : size === 'large' ? 20 : 18;

  return (
    <button
      style={{ ...baseStyles }}
      className={className}
      onClick={onClick}
      disabled={disabled || state === 'disabled'}
      type="button"
    >
      {Icon && <Icon size={iconSize} />}
      {children}
    </button>
  );
};