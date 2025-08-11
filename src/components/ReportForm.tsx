import React, { useState } from 'react';
import { Send, MapPin, Clock, User, AlertCircle, CheckCircle } from 'lucide-react';

const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    transportMode: '',
    routeId: '',
    location: '',
    comfort: 5,
    cleanliness: 5,
    harassment: 5,
    lighting: 5,
    overall: 5,
    description: '',
    anonymous: true
  });

  const [submitted, setSubmitted] = useState(false);

  const transportModes = [
    { id: 'bus', name: 'Bus', icon: '🚌' },
    { id: 'rail', name: 'Rail/Metro', icon: '🚊' },
    { id: 'ridehail', name: 'Ride-hailing', icon: '🚗' }
  ];

  const handleRatingChange = (category: string, value: number) => {
    setFormData(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const RatingSlider = ({ label, value, onChange, icon }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon?: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <label className="text-sm font-medium text-gray-700">{label}</label>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Poor</span>
          <span className={`text-lg font-bold ${
            value >= 8 ? 'text-green-600' :
            value >= 6 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {value}
          </span>
          <span className="text-sm text-gray-500">Excellent</span>
        </div>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #ef4444 0%, #f97316 30%, #f59e0b 60%, #10b981 100%)`
        }}
      />
    </div>
  );

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for helping improve transit safety. Your report has been recorded and will be processed immediately.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Report ID:</strong> TSP-{Date.now().toString(36).toUpperCase()}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              Your feedback helps transit operators improve service quality and safety measures.
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                transportMode: '',
                routeId: '',
                location: '',
                comfort: 5,
                cleanliness: 5,
                harassment: 5,
                lighting: 5,
                overall: 5,
                description: '',
                anonymous: true
              });
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Safety Report</h2>
        <p className="text-gray-600">Help improve transit safety by sharing your experience</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
        {/* Transport Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Transport Mode</label>
          <div className="grid grid-cols-3 gap-4">
            {transportModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, transportMode: mode.id }))}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  formData.transportMode === mode.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{mode.icon}</div>
                <div className="text-sm font-medium">{mode.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Route and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="routeId" className="block text-sm font-medium text-gray-700 mb-2">
              Route/Line ID
            </label>
            <input
              type="text"
              id="routeId"
              value={formData.routeId}
              onChange={(e) => setFormData(prev => ({ ...prev, routeId: e.target.value }))}
              placeholder="e.g., Bus 45, Metro A"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location/Stop
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Station or stop name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Safety Ratings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Rate Your Experience</h3>
          
          <RatingSlider
            label="Comfort Level"
            value={formData.comfort}
            onChange={(value) => handleRatingChange('comfort', value)}
            icon={<span className="text-blue-500">🛋️</span>}
          />
          
          <RatingSlider
            label="Cleanliness"
            value={formData.cleanliness}
            onChange={(value) => handleRatingChange('cleanliness', value)}
            icon={<span className="text-green-500">🧽</span>}
          />
          
          <RatingSlider
            label="Safety from Harassment"
            value={formData.harassment}
            onChange={(value) => handleRatingChange('harassment', value)}
            icon={<AlertCircle className="w-4 h-4 text-red-500" />}
          />
          
          <RatingSlider
            label="Lighting Quality"
            value={formData.lighting}
            onChange={(value) => handleRatingChange('lighting', value)}
            icon={<span className="text-yellow-500">💡</span>}
          />
          
          <RatingSlider
            label="Overall Safety"
            value={formData.overall}
            onChange={(value) => handleRatingChange('overall', value)}
            icon={<span className="text-purple-500">🛡️</span>}
          />
        </div>

        {/* Additional Comments */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments (Optional)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            placeholder="Describe any specific incidents or observations..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Anonymous Option */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="anonymous"
            checked={formData.anonymous}
            onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-700">
            Submit anonymously (recommended for harassment reports)
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Safety Report</span>
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Privacy Notice:</strong> Your report will be shared with relevant transit operators to improve safety.
            Anonymous reports cannot be traced back to you. All data is encrypted and handled according to our privacy policy.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;