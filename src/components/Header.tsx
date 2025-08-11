import React from 'react';
import { Shield, MapPin, BarChart3, AlertTriangle, Car, MessageCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Safety Map', icon: MapPin },
    { id: 'report', label: 'Report', icon: Shield },
    { id: 'harassment', label: 'Harassment Reports', icon: AlertTriangle },
    { id: 'accidents', label: 'Accident Zones', icon: Car },
    { id: 'chat', label: 'Community Chat', icon: MessageCircle }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Transit Safety Pulse</h1>
              <p className="text-xs text-gray-500">Real-time Safety Intelligence</p>
            </div>
          </div>
          
          <nav className="flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;