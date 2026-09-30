import React from 'react';
import './AppBadge.css'; 

interface AppBadgeProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light' | 'dark';
  className?: string;
}

export const AppBadge: React.FC<AppBadgeProps> = ({
  children,
  color = 'primary',
  className = '',
}) => {
  return (
    <span className={`app-badge app-badge-${color} ${className}`}>
      {children}
    </span>
  );
};