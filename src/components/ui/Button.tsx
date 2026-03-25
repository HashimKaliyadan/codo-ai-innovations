import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
      {...props}
    />
  );
};
