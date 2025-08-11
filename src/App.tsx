import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SafetyMap from './components/SafetyMap';
import ReportForm from './components/ReportForm';
import HarassmentReports from './components/HarassmentReports';
import AccidentZones from './components/AccidentZones';
import CommunityChat from './components/CommunityChat';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <SafetyMap />;
      case 'report':
        return <ReportForm />;
      case 'harassment':
        return <HarassmentReports />;
      case 'accidents':
        return <AccidentZones />;
      case 'chat':
        return <CommunityChat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;