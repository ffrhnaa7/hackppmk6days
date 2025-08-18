import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: 'mint' | 'blue' | 'purple' | 'green' | 'orange';
  className?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  color = 'mint',
  className = '',
  showPercentage = false
}) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  const colorClasses = {
    mint: 'bg-mint-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500'
  };

  const backgroundColorClasses = {
    mint: 'bg-mint-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    green: 'bg-green-100',
    orange: 'bg-orange-100'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`w-full h-3 rounded-full ${backgroundColorClasses[color]}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-gray-600 mt-1 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};
