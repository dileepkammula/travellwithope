import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Bus, Train, Car, BarChart3, MapPin } from 'lucide-react';
import SafetyMetrics from './SafetyMetrics';
import RoutesList from './RoutesList';

const Dashboard: React.FC = () => {
  const overallStats = [
    {
      title: 'Overall Safety Score',
      value: '7.8/10',
      change: '+0.2',
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Active Reports Today',
      value: '1,247',
      change: '+18%',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-2',
      trend: 'down',
      color: 'red'
    },
    {
      title: 'Routes Monitored',
      value: '156',
      change: '+5',
      trend: 'up',
      color: 'purple'
    }
  ];

  const transportModes = [
    {
      name: 'Bus Transit',
      icon: Bus,
      score: 7.4,
      totalRoutes: 89,
      activeReports: 634,
      trend: '+0.1'
    },
    {
      name: 'Rail Transit',
      icon: Train,
      score: 8.2,
      totalRoutes: 45,
      activeReports: 423,
      trend: '+0.3'
    },
    {
      name: 'Ride-hailing',
      icon: Car,
      score: 7.9,
      totalRoutes: 22,
      activeReports: 190,
      trend: '-0.1'
    }
  ];

  const getSafetyColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSafetyBg = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Safety Dashboard</h2>
        <p className="text-gray-600">Real-time insights into transit safety across all modes of transport</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overallStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`ml-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs yesterday</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'red' ? 'bg-red-100' : 'bg-purple-100'
              } flex items-center justify-center`}>
                {stat.title.includes('Score') && <CheckCircle className="w-6 h-6 text-green-600" />}
                {stat.title.includes('Reports') && <BarChart3 className="w-6 h-6 text-blue-600" />}
                {stat.title.includes('Alerts') && <AlertTriangle className="w-6 h-6 text-red-600" />}
                {stat.title.includes('Routes') && <MapPin className="w-6 h-6 text-purple-600" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transport Modes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {transportModes.map((mode, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${getSafetyBg(mode.score)} flex items-center justify-center`}>
                  <mode.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{mode.name}</h3>
                  <p className="text-sm text-gray-500">{mode.totalRoutes} routes</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getSafetyColor(mode.score)}`}>
                  {mode.score}
                </div>
                <div className="text-xs text-gray-500">Safety Score</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{mode.activeReports} reports today</span>
              <span className={`font-medium ${
                mode.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {mode.trend}
              </span>
            </div>
            
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  mode.score >= 8 ? 'bg-green-500' :
                  mode.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(mode.score / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SafetyMetrics />
        <RoutesList />
      </div>
    </div>
  );
};

export default Dashboard;