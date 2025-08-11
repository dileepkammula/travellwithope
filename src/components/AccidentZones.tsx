import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, Car, Truck, Zap, Filter, TrendingUp, TrendingDown } from 'lucide-react';

interface AccidentReport {
  id: string;
  location: string;
  route: string;
  vehicleType: string;
  severity: 'minor' | 'moderate' | 'severe';
  accidentType: string;
  description: string;
  imageUrl: string;
  timestamp: string;
  casualties: number;
  status: 'reported' | 'investigating' | 'resolved';
  weatherCondition: string;
  timeOfDay: string;
}

const AccidentZones: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const accidentReports: AccidentReport[] = [
    {
      id: 'AZ001',
      location: 'Highway 101 & Main Street Intersection',
      route: 'Bus Route 45',
      vehicleType: 'bus',
      severity: 'severe',
      accidentType: 'Collision with Vehicle',
      description: 'Bus collision at busy intersection during rush hour. Poor visibility due to construction barriers. Multiple passengers injured. Traffic signal timing needs review.',
      imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '3 hours ago',
      casualties: 8,
      status: 'investigating',
      weatherCondition: 'Rainy',
      timeOfDay: 'Rush Hour'
    },
    {
      id: 'AZ002',
      location: 'Downtown Metro Rail Crossing',
      route: 'Metro Line A',
      vehicleType: 'train',
      severity: 'moderate',
      accidentType: 'Pedestrian Incident',
      description: 'Train-pedestrian incident at grade crossing. Warning signals were functioning but visibility was reduced due to parked vehicles blocking sight lines.',
      imageUrl: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '1 day ago',
      casualties: 1,
      status: 'investigating',
      weatherCondition: 'Clear',
      timeOfDay: 'Evening'
    },
    {
      id: 'AZ003',
      location: 'Industrial District Loading Zone',
      route: 'Freight Route 12',
      vehicleType: 'truck',
      severity: 'minor',
      accidentType: 'Loading Dock Collision',
      description: 'Delivery truck backed into loading dock barrier. Minor property damage only. Area needs better marking and guidance systems for large vehicles.',
      imageUrl: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '2 days ago',
      casualties: 0,
      status: 'resolved',
      weatherCondition: 'Clear',
      timeOfDay: 'Morning'
    },
    {
      id: 'AZ004',
      location: 'University Campus Transit Hub',
      route: 'Campus Shuttle',
      vehicleType: 'bus',
      severity: 'minor',
      accidentType: 'Slip and Fall',
      description: 'Passenger slipped while boarding bus during wet conditions. Bus floor was slippery from rain. Need better non-slip surfaces and weather protection.',
      imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '3 days ago',
      casualties: 1,
      status: 'resolved',
      weatherCondition: 'Rainy',
      timeOfDay: 'Afternoon'
    },
    {
      id: 'AZ005',
      location: 'Electric Bus Charging Station',
      route: 'Green Line Express',
      vehicleType: 'electric',
      severity: 'moderate',
      accidentType: 'Electrical Malfunction',
      description: 'Electric bus experienced charging system malfunction causing minor electrical fire. No injuries but service disrupted. Charging infrastructure needs inspection.',
      imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '5 days ago',
      casualties: 0,
      status: 'investigating',
      weatherCondition: 'Clear',
      timeOfDay: 'Morning'
    },
    {
      id: 'AZ006',
      location: 'Airport Express Terminal',
      route: 'Airport Shuttle',
      vehicleType: 'bus',
      severity: 'severe',
      accidentType: 'Brake Failure',
      description: 'Airport shuttle experienced brake failure in terminal area. Collided with concrete barrier. Multiple passengers injured. Vehicle maintenance records under review.',
      imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '1 week ago',
      casualties: 12,
      status: 'investigating',
      weatherCondition: 'Clear',
      timeOfDay: 'Morning'
    }
  ];

  const vehicleTypes = [
    { id: 'all', name: 'All Vehicles', icon: Car },
    { id: 'bus', name: 'Bus', icon: Car },
    { id: 'train', name: 'Train', icon: Car },
    { id: 'truck', name: 'Truck', icon: Truck },
    { id: 'electric', name: 'Electric', icon: Zap }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'minor': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'reported': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bus': return '🚌';
      case 'train': return '🚊';
      case 'truck': return '🚛';
      case 'electric': return '⚡';
      default: return '🚗';
    }
  };

  const filteredReports = accidentReports.filter(report => {
    if (selectedVehicle !== 'all' && report.vehicleType !== selectedVehicle) return false;
    if (selectedSeverity !== 'all' && report.severity !== selectedSeverity) return false;
    return true;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'severity':
        const severityOrder = { severe: 3, moderate: 2, minor: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      case 'casualties':
        return b.casualties - a.casualties;
      default: // recent
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Accident Zones & Vehicle Incidents</h2>
        <p className="text-gray-600">Documented vehicle accidents and safety incidents across transit networks</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {accidentReports.filter(r => r.severity === 'severe').length}
              </div>
              <div className="text-sm text-gray-600">Severe Incidents</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {accidentReports.reduce((sum, r) => sum + r.casualties, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Casualties</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {accidentReports.filter(r => r.status === 'investigating').length}
              </div>
              <div className="text-sm text-gray-600">Under Investigation</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {((accidentReports.filter(r => r.status === 'resolved').length / accidentReports.length) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Resolution Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Vehicles</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="truck">Truck</option>
            <option value="electric">Electric</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="severe">Severe</option>
            <option value="moderate">Moderate</option>
            <option value="minor">Minor</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="severity">By Severity</option>
            <option value="casualties">By Casualties</option>
          </select>
        </div>
      </div>

      {/* Accident Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={report.imageUrl}
                alt={`Accident at ${report.location}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                  {report.severity.toUpperCase()}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {report.casualties} casualties
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getVehicleIcon(report.vehicleType)}</span>
                    <h3 className="font-semibold text-gray-900">{report.location}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{report.route}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{report.timestamp}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-red-600 mb-2">
                    {report.accidentType}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {report.description}
              </p>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <span className="text-gray-500">Weather:</span>
                  <span className="ml-1 font-medium">{report.weatherCondition}</span>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <span className="ml-1 font-medium">{report.timeOfDay}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Incident ID: {report.id}
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
                  View Full Report →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Recommendations */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">High-Risk Areas</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Highway 101 & Main Street - Install better traffic signals</li>
              <li>• Downtown Metro Crossing - Improve sight line visibility</li>
              <li>• Airport Terminal - Enhanced vehicle maintenance protocols</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Prevention Measures</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Regular vehicle maintenance inspections</li>
              <li>• Weather-appropriate safety protocols</li>
              <li>• Enhanced driver training programs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="text-sm text-red-800">
            <p className="font-medium mb-1">Emergency Notice</p>
            <p>
              If you witness or are involved in a transit accident, immediately call emergency services (911) 
              and report to transit authorities. This data is for informational and planning purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentZones;