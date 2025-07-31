import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Award, Filter } from 'lucide-react';
import { Notification } from '../../types';

export const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const notifications: Notification[] = [
    {
      id: '1',
      userId: 'user_1',
      type: 'achievement',
      title: 'Goal Achieved! 🎉',
      message: 'Congratulations! You\'ve reduced your carbon footprint by 15% this month.',
      read: false,
      createdAt: '2024-12-15T10:30:00Z',
      data: { reduction: 15, target: 200 }
    },
    {
      id: '2',
      userId: 'user_1',
      type: 'alert',
      title: 'High Carbon Alert',
      message: 'Your travel emissions are 25% above your monthly target. Consider using public transport.',
      read: false,
      createdAt: '2024-12-15T09:15:00Z',
      data: { category: 'travel', excess: 25 }
    },
    {
      id: '3',
      userId: 'user_1',
      type: 'system',
      title: 'Integration Sync Complete',
      message: 'Successfully synced data from your Smart Energy Meter. 12 new data points added.',
      read: true,
      createdAt: '2024-12-15T08:45:00Z',
      data: { integration: 'smart_meter', dataPoints: 12 }
    },
    {
      id: '4',
      userId: 'user_1',
      type: 'reminder',
      title: 'Weekly Report Available',
      message: 'Your weekly carbon footprint report is ready. Check out your progress and recommendations.',
      read: true,
      createdAt: '2024-12-14T18:00:00Z'
    },
    {
      id: '5',
      userId: 'user_1',
      type: 'achievement',
      title: 'Streak Milestone! 🔥',
      message: 'Amazing! You\'ve logged your carbon data for 30 consecutive days.',
      read: true,
      createdAt: '2024-12-13T12:00:00Z',
      data: { streak: 30 }
    }
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return <Award className="h-5 w-5 text-yellow-600" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-blue-600" />;
      case 'system':
        return <Info className="h-5 w-5 text-gray-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationBg = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-50 border-yellow-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      case 'reminder':
        return 'bg-blue-50 border-blue-200';
      case 'system':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Marking all notifications as read');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
          <p className="text-gray-600">
            Stay updated with your carbon tracking progress
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-green-100 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by type:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All', count: notifications.length },
            { value: 'achievement', label: 'Achievements', count: notifications.filter(n => n.type === 'achievement').length },
            { value: 'alert', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length },
            { value: 'reminder', label: 'Reminders', count: notifications.filter(n => n.type === 'reminder').length },
            { value: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
          ].map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === filterOption.value
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-green-100 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No notifications found for the selected filter.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm p-4 border transition-all hover:shadow-md ${
                !notification.read ? 'border-l-4 border-l-green-500' : 'border-green-100'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getNotificationBg(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <p className={`mt-1 text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  
                  {notification.data && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(notification.data).map(([key, value]) => (
                        <span
                          key={key}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {!notification.read && (
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                    <CheckCircle className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Live Feed Indicator */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-4 border border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live Feed Active</span>
          </div>
          <span className="text-xs text-gray-500">
            Real-time notifications from integrations and system events
          </span>
        </div>
      </div>
    </div>
  );
};