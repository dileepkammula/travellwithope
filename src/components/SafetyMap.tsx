import React, { useState } from 'react';
import { Filter, MapPin, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';

const SafetyMap: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState<string>('overall');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);

  const modes = [
    { id: 'all', name: 'All Modes', icon: '🚌' },
    { id: 'bus', name: 'Bus', icon: '🚌' },
    { id: 'rail', name: 'Rail', icon: '🚊' },
    { id: 'ridehail', name: 'Ride-hail', icon: '🚗' }
  ];

  const metrics = [
    { id: 'overall', name: 'Overall Safety' },
    { id: 'comfort', name: 'Comfort' },
    { id: 'cleanliness', name: 'Cleanliness' },
    { id: 'harassment', name: 'Harassment' },
    { id: 'lighting', name: 'Lighting' }
  ];

  const mapData = [
    {
      id: 1,
      x: 25,
      y: 30,
      score: 8.2,
      route: 'Bus 45',
      reports: 23,
      type: 'bus'
    },
    {
      id: 2,
      x: 60,
      y: 45,
      score: 6.1,
      route: 'Metro A',
      reports: 31,
      type: 'rail'
    },
    {
      id: 3,
      x: 40,
      y: 70,
      score: 7.8,
      route: 'Bus 78',
      reports: 18,
      type: 'bus'
    },
    {
      id: 4,
      x: 75,
      y: 25,
      score: 5.4,
      route: 'Metro B',
      reports: 12,
      type: 'rail'
    },
    {
      id: 5,
      x: 20,
      y: 60,
      score: 8.7,
      route: 'Uber Downtown',
      reports: 45,
      type: 'ridehail'
    },
    {
      id: 6,
      x: 85,
      y: 55,
      score: 7.2,
      route: 'Bus 92',
      reports: 27,
      type: 'bus'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 7) return 'bg-yellow-400';
    if (score >= 6) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreSize = (score: number) => {
    if (score >= 8) return 'w-4 h-4';
    if (score >= 6) return 'w-5 h-5';
    return 'w-6 h-6';
  };

  const filteredData = selectedMode === 'all' 
    ? mapData 
    : mapData.filter(item => item.type === selectedMode);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Real-time Safety Heat Map</h2>
        <p className="text-gray-600">Interactive visualization of transit safety data across all routes</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Transport Mode:</span>
            </div>
            <div className="flex space-x-2">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMode === mode.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{mode.icon}</span>
                  {mode.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {metrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showHeatmap
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {showHeatmap ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>Heat Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <div className="relative bg-gray-50 rounded-lg h-96 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Heat map overlay */}
          {showHeatmap && (
            <div className="absolute inset-0">
              {filteredData.map((point) => (
                <div
                  key={point.id}
                  className="absolute rounded-full opacity-20"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: '80px',
                    height: '80px',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, ${
                      point.score >= 8 ? '#10b981' :
                      point.score >= 7 ? '#f59e0b' :
                      point.score >= 6 ? '#f97316' : '#ef4444'
                    } 0%, transparent 70%)`
                  }}
                />
              ))}
            </div>
          )}

          {/* Data points */}
          {filteredData.map((point) => (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <div className={`${getScoreColor(point.score)} ${getScoreSize(point.score)} rounded-full shadow-lg border-2 border-white transition-transform group-hover:scale-125`}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {point.score}
                  </span>
                </div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                  <div className="font-semibold">{point.route}</div>
                  <div>Score: {point.score}/10</div>
                  <div>{point.reports} reports today</div>
                </div>
              </div>
            </div>
          ))}

          {/* Map labels */}
          <div className="absolute top-4 left-4 text-sm text-gray-600">
            Downtown District
          </div>
          <div className="absolute top-4 right-4 text-sm text-gray-600">
            Financial District
          </div>
          <div className="absolute bottom-4 left-4 text-sm text-gray-600">
            Residential Area
          </div>
          <div className="absolute bottom-4 right-4 text-sm text-gray-600">
            Industrial Zone
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Safety Score:</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">8.0-10</span>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-xs text-gray-600">7.0-7.9</span>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-600">6.0-6.9</span>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Below 6.0</span>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredData.filter(p => p.score >= 8).length}
              </div>
              <div className="text-sm text-gray-600">Safe Routes</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredData.filter(p => p.score >= 6 && p.score < 8).length}
              </div>
              <div className="text-sm text-gray-600">Moderate Risk</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredData.filter(p => p.score < 6).length}
              </div>
              <div className="text-sm text-gray-600">High Risk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;