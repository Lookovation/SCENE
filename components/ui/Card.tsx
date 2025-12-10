import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, active = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 shadow-sm border transition-all duration-200 
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-200' : ''} 
        ${active ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100'}
        ${className}`}
    >
      {children}
    </div>
  );
};