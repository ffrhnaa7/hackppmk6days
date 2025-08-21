import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface ModernStatsProps {
  stats: StatItem[];
  className?: string;
}

export const ModernStats: React.FC<ModernStatsProps> = ({ stats, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="card-modern p-6 hover-lift hover-glow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              {stat.trend && (
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend.isPositive ? 'text-green-700' : 'text-red-600'
                }`}>
                  <span>{stat.trend.isPositive ? '+' : ''}{stat.trend.value}%</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900 group-hover:text-mint-700 transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-gray-700">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
