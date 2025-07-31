import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Calculator } from './components/Calculator';
import { Reports } from './components/Reports';
import { OrgAdminDashboard } from './components/admin/OrgAdminDashboard';
import { APIPlayground } from './components/api/APIPlayground';
import { ProfilePage } from './components/profile/ProfilePage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { Footer } from './components/Footer';
import { TabType, FootprintData } from './types';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showApp, setShowApp] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [footprintHistory, setFootprintHistory] = useState<FootprintData[]>([
    {
      id: '1',
      userId: 'user_1',
      date: '2024-12-01',
      travel: 120,
      homeEnergy: 85,
      foodPurchases: 45,
      total: 250,
      source: 'manual'
    },
    {
      id: '2',
      userId: 'user_1',
      date: '2024-11-01',
      travel: 95,
      homeEnergy: 92,
      foodPurchases: 38,
      total: 225,
      source: 'manual'
    },
    {
      id: '3',
      userId: 'user_1',
      date: '2024-10-01',
      travel: 140,
      homeEnergy: 78,
      foodPurchases: 52,
      total: 270,
      source: 'manual'
    },
    {
      id: '4',
      userId: 'user_1',
      date: '2024-09-01',
      travel: 110,
      homeEnergy: 88,
      foodPurchases: 42,
      total: 240,
      source: 'api'
    },
    {
      id: '5',
      userId: 'user_1',
      date: '2024-08-01',
      travel: 130,
      homeEnergy: 95,
      foodPurchases: 55,
      total: 280,
      source: 'integration'
    },
    {
      id: '6',
      userId: 'user_1',
      date: '2024-07-01',
      travel: 125,
      homeEnergy: 82,
      foodPurchases: 48,
      total: 255,
      source: 'manual'
    }
  ]);

  const addFootprintData = (data: Omit<FootprintData, 'id' | 'userId'>) => {
    const newData: FootprintData = {
      ...data,
      id: Date.now().toString(),
      userId: user?.id || 'user_1'
    };
    setFootprintHistory(prev => [newData, ...prev]);
  };

  const currentFootprint = footprintHistory[0]?.total || 0;
  const averageFootprint = 320; // Global average kg CO₂e per month

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="text-secondary-600 font-medium">Loading ReLeaf Sync...</p>
        </motion.div>
      </div>
    );
  }

  // Show landing page if no user and app hasn't been accessed
  if (!user && !showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  // Show auth page if no user but app has been accessed
  if (!user) {
    return <AuthPage />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <Dashboard 
                footprintHistory={footprintHistory}
                currentFootprint={currentFootprint}
                averageFootprint={averageFootprint}
              />
            )}
            
            {activeTab === 'calculator' && (
              <Calculator onSubmit={addFootprintData} />
            )}
            
            {activeTab === 'reports' && (
              <Reports footprintHistory={footprintHistory} />
            )}
            
            {activeTab === 'admin' && user.role === 'org_admin' && (
              <OrgAdminDashboard footprintHistory={footprintHistory} />
            )}
            
            {activeTab === 'api' && (
              <APIPlayground />
            )}
            
            {activeTab === 'profile' && (
              <ProfilePage />
            )}
            
            {activeTab === 'notifications' && (
              <NotificationsPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </motion.div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;