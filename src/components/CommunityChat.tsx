import React, { useState } from 'react';
import { Send, MessageCircle, Clock, MapPin, AlertTriangle, Heart, Reply, MoreHorizontal } from 'lucide-react';

interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
  category: 'danger' | 'delay' | 'story' | 'general';
  location?: string;
  route?: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

const CommunityChat: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const defaultMessages: ChatMessage[] = [
    {
      id: 'msg001',
      username: 'SafeCommuter',
      avatar: '👤',
      message: '⚠️ DANGER ALERT: Avoid the underpass at Central Station after 8 PM. Poor lighting and several incidents reported this week. Security presence is minimal. Stay safe everyone!',
      timestamp: '2 hours ago',
      category: 'danger',
      location: 'Central Station',
      route: 'Metro Line A',
      likes: 23,
      replies: 8,
      isLiked: false
    },
    {
      id: 'msg002',
      username: 'DailyRider',
      avatar: '🚌',
      message: '🕐 LONG DELAY: Bus Route 45 is running 45+ minutes behind schedule due to construction on Main Street. Alternative: Take Route 78 via University Ave. Traffic is moving better there.',
      timestamp: '3 hours ago',
      category: 'delay',
      location: 'Main Street',
      route: 'Bus Route 45',
      likes: 15,
      replies: 4,
      isLiked: true
    },
    {
      id: 'msg003',
      username: 'StudentTraveler',
      avatar: '🎓',
      message: '💔 Personal Story: Last night on the late bus home, a stranger made me very uncomfortable with inappropriate comments. The driver noticed and intervened, which I\'m grateful for. Ladies, trust your instincts and don\'t hesitate to speak up or move seats.',
      timestamp: '5 hours ago',
      category: 'story',
      location: 'University District',
      route: 'Night Bus 12',
      likes: 47,
      replies: 12,
      isLiked: false
    },
    {
      id: 'msg004',
      username: 'CommuterMom',
      avatar: '👩‍👧',
      message: '🚨 WARNING: Pickpocket activity reported on Metro Line B during rush hours. Keep bags in front and stay alert, especially near the doors. Saw someone get their phone stolen yesterday.',
      timestamp: '6 hours ago',
      category: 'danger',
      location: 'Metro Line B',
      route: 'Downtown Section',
      likes: 31,
      replies: 6,
      isLiked: true
    },
    {
      id: 'msg005',
      username: 'WeekendWarrior',
      avatar: '🏃',
      message: '😤 MASSIVE DELAYS: Train service completely disrupted due to signal failure. Been waiting 2 hours! They\'re running shuttle buses but it\'s chaos. Plan extra time if you\'re heading downtown.',
      timestamp: '8 hours ago',
      category: 'delay',
      location: 'Downtown Terminal',
      route: 'Express Train',
      likes: 19,
      replies: 9,
      isLiked: false
    },
    {
      id: 'msg006',
      username: 'NightShiftWorker',
      avatar: '🌙',
      message: '💪 Positive Story: Shoutout to the amazing bus driver on Route 67 who waited for me when I was running late from work at 11 PM. Small acts of kindness make such a difference. Thank you!',
      timestamp: '12 hours ago',
      category: 'story',
      location: 'Industrial District',
      route: 'Bus Route 67',
      likes: 89,
      replies: 15,
      isLiked: true
    },
    {
      id: 'msg007',
      username: 'SafetyFirst',
      avatar: '🛡️',
      message: '⚠️ SAFETY TIP: The parking garage at North Station has broken lights on Level 3. Very dark and isolated. Use Level 1 or 2 instead, much better lighting and more people around.',
      timestamp: '1 day ago',
      category: 'danger',
      location: 'North Station Parking',
      route: 'Multiple Lines',
      likes: 26,
      replies: 3,
      isLiked: false
    },
    {
      id: 'msg008',
      username: 'RegularRider',
      avatar: '🚊',
      message: '😔 Personal Experience: Had a panic attack on the crowded morning train today. A kind passenger gave me their seat and another offered water. Sometimes humanity shines through in the chaos of commuting. Grateful for good people.',
      timestamp: '1 day ago',
      category: 'story',
      location: 'Morning Express',
      route: 'Metro Line A',
      likes: 156,
      replies: 28,
      isLiked: true
    },
    {
      id: 'msg009',
      username: 'ConcernedCitizen',
      avatar: '👮',
      message: '🚨 URGENT: Suspicious individual hanging around the bus stops near the mall. Approaching young women inappropriately. Security has been notified but please be extra cautious in that area.',
      timestamp: '2 days ago',
      category: 'danger',
      location: 'Shopping Mall Stops',
      route: 'Multiple Routes',
      likes: 42,
      replies: 11,
      isLiked: false
    },
    {
      id: 'msg010',
      username: 'ElderlyCommuter',
      avatar: '👴',
      message: '❤️ Heartwarming: Young man helped me with my heavy groceries and made sure I got a seat on the bus today. Faith in humanity restored! There are still good people out there.',
      timestamp: '3 days ago',
      category: 'story',
      location: 'Grocery District',
      route: 'Bus Route 23',
      likes: 203,
      replies: 34,
      isLiked: true
    }
  ];

  const categories = [
    { id: 'general', name: 'General', icon: MessageCircle, color: 'blue' },
    { id: 'danger', name: 'Danger Alert', icon: AlertTriangle, color: 'red' },
    { id: 'delay', name: 'Delays', icon: Clock, color: 'yellow' },
    { id: 'story', name: 'Personal Story', icon: Heart, color: 'purple' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      case 'delay': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'story': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'danger': return '⚠️';
      case 'delay': return '🕐';
      case 'story': return '💭';
      default: return '💬';
    }
  };

  const filteredMessages = filterCategory === 'all' 
    ? defaultMessages 
    : defaultMessages.filter(msg => msg.category === filterCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to a backend
      console.log('New message:', { message: newMessage, category: selectedCategory });
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Safety Chat</h2>
        <p className="text-gray-600">Share experiences, report dangers, and help fellow commuters stay safe</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterCategory === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Messages
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterCategory === category.id
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4 inline mr-1" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Message Composer */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share with the Community</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category.id
                    ? getCategoryColor(category.id)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-3 h-3 inline mr-1" />
                {category.name}
              </button>
            ))}
          </div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share your experience, report a danger, or help fellow commuters..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Be respectful and constructive. Help keep our community safe.
            </p>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>

      {/* Messages Feed */}
      <div className="space-y-6">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {message.avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-900">{message.username}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(message.category)}`}>
                      {getCategoryIcon(message.category)} {message.category.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                {(message.location || message.route) && (
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    {message.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{message.location}</span>
                      </div>
                    )}
                    {message.route && (
                      <div className="flex items-center space-x-1">
                        <span>•</span>
                        <span>{message.route}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-gray-800 leading-relaxed mb-4">{message.message}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                    message.isLiked ? 'text-red-500' : ''
                  }`}>
                    <Heart className={`w-4 h-4 ${message.isLiked ? 'fill-current' : ''}`} />
                    <span>{message.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <Reply className="w-4 h-4" />
                    <span>{message.replies} replies</span>
                  </button>
                  <span>•</span>
                  <span>Report</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Guidelines */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Community Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">✅ Do:</h4>
            <ul className="space-y-1">
              <li>• Share accurate, helpful information</li>
              <li>• Be respectful and supportive</li>
              <li>• Report genuine safety concerns</li>
              <li>• Use appropriate categories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">❌ Don't:</h4>
            <ul className="space-y-1">
              <li>• Share personal information</li>
              <li>• Post false or misleading reports</li>
              <li>• Use offensive language</li>
              <li>• Spam or self-promote</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="text-sm text-red-800">
            <p className="font-medium mb-1">Emergency Situations</p>
            <p>
              For immediate emergencies, call 911. For transit security issues, contact transit police directly. 
              This chat is for community support and information sharing, not emergency response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;