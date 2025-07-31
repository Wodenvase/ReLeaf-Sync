import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, BarChart3, Calculator, FileText, Users, Code, User, Bell, LogOut } from 'lucide-react';
import { TabType } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'calculator' as TabType, label: 'Calculator', icon: Calculator },
    { id: 'reports' as TabType, label: 'Reports', icon: FileText },
    ...(user?.role === 'org_admin' ? [{ id: 'admin' as TabType, label: 'Team Admin', icon: Users }] : []),
    { id: 'api' as TabType, label: 'API', icon: Code },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell }
  ];

  return (
    <motion.header 
      className="glass-card sticky top-0 z-40 border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl shadow-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">ReLeaf Sync</h1>
              {user && (
                <motion.p 
                  className="text-xs text-secondary-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome back, {user.name} 
                  {user.role === 'org_admin' && ' (Admin)'}
                </motion.p>
              )}
            </div>
          </motion.div>
          
          <nav className="flex items-center space-x-1">
            {tabs.map(({ id, label, icon: Icon }, index) => (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-white/50'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{label}</span>
              </motion.button>
            ))}
            
            <motion.button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 ml-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tabs.length * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};