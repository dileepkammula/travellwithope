import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, User, Star, Filter, ChevronDown } from 'lucide-react';

interface HarassmentReport {
  id: string;
  location: string;
  route: string;
  transportMode: string;
  rating: number;
  comment: string;
  imageUrl: string;
  timestamp: string;
  reporterType: 'anonymous' | 'verified';
  severity: 'low' | 'medium' | 'high';
  status: 'reported' | 'investigating' | 'resolved';
}

const HarassmentReports: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const reports: HarassmentReport[] = [
    {
      id: 'HR001',
      location: 'Downtown Metro Station',
      route: 'Metro Line A',
      transportMode: 'rail',
      rating: 2,
      comment: 'Poorly lit platform area near the south entrance. Multiple reports of inappropriate behavior during evening hours. Security presence is minimal.',
      imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '2 hours ago',
      reporterType: 'anonymous',
      severity: 'high',
      status: 'investigating'
    },
    {
      id: 'HR002',
      location: 'Central Bus Terminal',
      route: 'Bus Route 45',
      transportMode: 'bus',
      rating: 3,
      comment: 'Overcrowded waiting area with insufficient supervision. Witnessed verbal harassment during peak hours. Need better crowd management.',
      imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '5 hours ago',
      reporterType: 'verified',
      severity: 'medium',
      status: 'reported'
    },
    {
      id: 'HR003',
      location: 'University District Stop',
      route: 'Bus Route 78',
      transportMode: 'bus',
      rating: 4,
      comment: 'Generally safe but isolated bus stop with poor lighting after 9 PM. Would benefit from better illumination and emergency call boxes.',
      imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '1 day ago',
      reporterType: 'anonymous',
      severity: 'low',
      status: 'resolved'
    },
    {
      id: 'HR004',
      location: 'Financial District Station',
      route: 'Metro Line B',
      transportMode: 'rail',
      rating: 1,
      comment: 'Serious safety concerns in the underground walkway. Multiple incidents reported. Urgent need for increased security patrols and better lighting.',
      imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '2 days ago',
      reporterType: 'verified',
      severity: 'high',
      status: 'investigating'
    },
    {
      id: 'HR005',
      location: 'Shopping Mall Transit Hub',
      route: 'Multiple Routes',
      transportMode: 'mixed',
      rating: 3,
      comment: 'Busy transit hub with mixed safety record. Some areas well-monitored, others need attention. Late evening hours particularly concerning.',
      imageUrl: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '3 days ago',
      reporterType: 'anonymous',
      severity: 'medium',
      status: 'reported'
    },
    {
      id: 'HR006',
      location: 'Airport Express Terminal',
      route: 'Airport Line',
      transportMode: 'rail',
      rating: 5,
      comment: 'Well-maintained and secure area with good lighting and regular security patrols. Feels safe even during late hours.',
      imageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
      timestamp: '4 days ago',
      reporterType: 'verified',
      severity: 'low',
      status: 'resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    if (rating >= 2) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'bus': return '🚌';
      case 'rail': return '🚊';
      case 'mixed': return '🚌🚊';
      default: return '🚌';
    }
  };

  const filteredReports = reports.filter(report => {
    if (selectedFilter !== 'all' && report.transportMode !== selectedFilter) return false;
    if (selectedSeverity !== 'all' && report.severity !== selectedSeverity) return false;
    return true;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'rating-low':
        return a.rating - b.rating;
      case 'rating-high':
        return b.rating - a.rating;
      case 'severity':
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      default: // recent
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Harassment & Safety Reports</h2>
        <p className="text-gray-600">Community-reported safety concerns with visual documentation</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Transport</option>
            <option value="bus">Bus</option>
            <option value="rail">Rail</option>
            <option value="mixed">Mixed</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="rating-low">Lowest Rating</option>
            <option value="rating-high">Highest Rating</option>
            <option value="severity">By Severity</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={report.imageUrl}
                alt={`Safety concern at ${report.location}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                  {report.severity.toUpperCase()} RISK
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getTransportIcon(report.transportMode)}</span>
                    <h3 className="font-semibold text-gray-900">{report.location}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{report.route}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{report.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{report.reporterType}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= report.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm font-medium ${getRatingColor(report.rating)}`}>
                    {report.rating}/5
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {report.comment}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Report ID: {report.id}
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {reports.filter(r => r.severity === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.severity === 'medium').length}
            </div>
            <div className="text-sm text-gray-600">Medium Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {reports.filter(r => r.status === 'investigating').length}
            </div>
            <div className="text-sm text-gray-600">Under Investigation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Important Notice</p>
            <p>
              These reports are submitted by community members and reflect individual experiences. 
              All reports are reviewed for accuracy and appropriateness. If you witness or experience 
              harassment, please report it to local authorities and transit security immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarassmentReports;