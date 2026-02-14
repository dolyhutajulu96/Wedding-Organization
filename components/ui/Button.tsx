import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-serif tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10",
    white: "bg-white text-primary hover:bg-gray-100 shadow-md",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 rounded-sm",
    md: "text-sm px-6 py-3 rounded-md",
    lg: "text-base px-8 py-4 rounded-md",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};