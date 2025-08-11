import React from 'react';
import { MapPin, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const RoutesList: React.FC = () => {
  const routes = [
    {
      id: 'bus-45',
      name: 'Bus Route 45',
      type: 'Bus',
      score: 8.4,
      trend: 'up',
      change: '+0.3',
      lastReport: '5 min ago',
      status: 'good',
      reports: 23
    },
    {
      id: 'metro-a',
      name: 'Metro Line A',
      type: 'Rail',
      score: 7.1,
      trend: 'down',
      change: '-0.2',
      lastReport: '12 min ago',
      status: 'warning',
      reports: 31
    },
    {
      id: 'bus-78',
      name: 'Bus Route 78',
      type: 'Bus',
      score: 6.8,
      trend: 'up',
      change: '+0.1',
      lastReport: '18 min ago',
      status: 'caution',
      reports: 18
    },
    {
      id: 'uber-downtown',
      name: 'Downtown Uber Zone',
      type: 'Ride-hailing',
      score: 8.7,
      trend: 'up',
      change: '+0.4',
      lastReport: '3 min ago',
      status: 'good',
      reports: 45
    },
    {
      id: 'metro-b',
      name: 'Metro Line B',
      type: 'Rail',
      score: 5.9,
      trend: 'down',
      change: '-0.5',
      lastReport: '8 min ago',
      status: 'alert',
      reports: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'caution': return 'bg-orange-100 text-orange-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 7) return 'text-yellow-600';
    if (score >= 6) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Bus': return '🚌';
      case 'Rail': return '🚊';
      case 'Ride-hailing': return '🚗';
      default: return '🚌';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Routes Activity</h3>
        <MapPin className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getTypeIcon(route.type)}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{route.name}</h4>
                  <p className="text-xs text-gray-500">{route.type} • {route.reports} reports today</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                  {route.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className={`text-lg font-bold ${getScoreColor(route.score)}`}>
                    {route.score}
                  </span>
                  <div className="flex items-center space-x-1">
                    {route.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      route.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {route.change}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500">Last report</p>
                <p className="text-xs font-medium text-gray-900">{route.lastReport}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
          View all routes →
        </button>
      </div>
    </div>
  );
};

export default RoutesList;