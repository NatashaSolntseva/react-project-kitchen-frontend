import React, { SyntheticEvent, ReactElement } from 'react';
import styles from './button.module.scss';
//--------------------------------------------------------------------------------

export const Button: React.FC<{
  children?: string;
  type?: 'secondary' | 'primary';
  color?: 'secondary' | 'primary';
  icon?: ReactElement;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}> = ({
  children,
  type = 'primary',
  color = 'primary',
  icon,
  onClick,
  disabled = false,
  name,
  htmlType,
}) => {
  const className = `${styles.button} ${
    type === 'primary'
      ? styles.button_type_primary
      : styles.button_type_secondary
  } ${
    color === 'primary'
      ? styles.button_color_primary
      : styles.button_color_secondary
  }`;

  return (
    <button
      type={htmlType}
      disabled={disabled}
      name={name}
      onClick={onClick}
      className={className}>
      {icon}
      {children}
    </button>
  );
};
