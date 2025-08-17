import React from 'react';
import { Check, Gift } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
  showNumbers?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'mint' | 'purple' | 'green' | 'orange';
  isCompleted?: boolean;
  reward?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  target,
  label,
  showNumbers = true,
  size = 'md',
  color = 'blue',
  isCompleted = false,
  reward,
  className = ''
}) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const actualCompleted = current >= target;

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: actualCompleted ? 'bg-blue-500' : 'bg-blue-400',
    mint: actualCompleted ? 'bg-mint-500' : 'bg-mint-400',
    purple: actualCompleted ? 'bg-purple-500' : 'bg-purple-400',
    green: actualCompleted ? 'bg-green-500' : 'bg-green-400',
    orange: actualCompleted ? 'bg-orange-500' : 'bg-orange-400'
  };

  const textColorClasses = {
    blue: 'text-blue-600',
    mint: 'text-mint-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    orange: 'text-orange-600'
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and Numbers */}
      {(label || showNumbers) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showNumbers && (
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-semibold ${textColorClasses[color]}`}>
                {current}/{target}
              </span>
              {actualCompleted && (
                <div className="flex items-center space-x-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-semibold text-green-600">완료</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
          <div
            className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out relative`}
            style={{ width: `${percentage}%` }}
          >
            {/* Animated shine effect for completed bars */}
            {actualCompleted && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Percentage text overlay for larger bars */}
        {size === 'lg' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-sm">
              {percentage}%
            </span>
          </div>
        )}
      </div>

      {/* Reward info */}
      {reward && (
        <div className="flex items-center space-x-1 text-xs">
          <Gift className="h-3 w-3 text-red-500" />
          <span className="text-red-600 font-medium">🎁 {reward}</span>
        </div>
      )}

      {/* Completion message */}
      {actualCompleted && (
        <div className="text-xs text-green-600 font-medium flex items-center space-x-1">
          <Check className="h-3 w-3" />
          <span>목표 달성! 리워드를 받을 수 있습니다.</span>
        </div>
      )}
    </div>
  );
};
