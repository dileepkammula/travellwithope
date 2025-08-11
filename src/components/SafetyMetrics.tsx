import React from 'react';
import { Shield, Users, Clock, AlertTriangle } from 'lucide-react';

const SafetyMetrics: React.FC = () => {
  const metrics = [
    {
      category: 'Comfort',
      score: 8.1,
      reports: 234,
      trend: '+0.3',
      color: 'blue'
    },
    {
      category: 'Cleanliness',
      score: 7.8,
      reports: 189,
      trend: '+0.1',
      color: 'green'
    },
    {
      category: 'Harassment',
      score: 6.2,
      reports: 45,
      trend: '-0.2',
      color: 'red'
    },
    {
      category: 'Lighting',
      score: 8.5,
      reports: 67,
      trend: '+0.4',
      color: 'yellow'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBarColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Safety Metrics Breakdown</h3>
        <Shield className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900">{metric.category}</span>
                <span className="text-sm text-gray-500">({metric.reports} reports)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score}
                </span>
                <span className={`text-xs font-medium ${
                  metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getBarColor(metric.score)}`}
                style={{ width: `${(metric.score / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Latest Updates</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Route 45 - Comfort improved</span>
            <span className="text-gray-500">2 min ago</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Metro Line A - Cleanliness alert</span>
            <span className="text-gray-500">15 min ago</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Bus Route 12 - Safety report filed</span>
            <span className="text-gray-500">1 hr ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMetrics;