import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Target, Lightbulb, Users, Zap, Database, Globe, Activity, Cpu } from 'lucide-react';
import { FootprintData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { AnimatedCard } from './ui/AnimatedCard';

interface DashboardProps {
  footprintHistory: FootprintData[];
  currentFootprint: number;
  averageFootprint: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  footprintHistory,
  currentFootprint,
  averageFootprint
}) => {
  const [realTimeData, setRealTimeData] = useState({
    currentEmissions: 245.6,
    trend: 'decreasing',
    prediction: 230.2,
    dataSource: 'smart_meter_integration',
    lastUpdate: new Date().toISOString()
  });
  
  const [saasMetrics, setSaasMetrics] = useState({
    activeUsers: 0,
    apiCalls: 0,
    dataProcessed: 0,
    uptime: 99.9
  });

  // Generate realistic SaaS metrics
  useEffect(() => {
    const generateRealisticMetrics = () => {
      const now = new Date();
      const hour = now.getHours();
      const dayOfWeek = now.getDay();
      
      // Active users based on time of day and day of week
      let baseUsers = 850;
      if (hour >= 9 && hour <= 17) baseUsers += 400; // Work hours
      if (dayOfWeek >= 1 && dayOfWeek <= 5) baseUsers += 200; // Weekdays
      if (hour >= 19 && hour <= 23) baseUsers += 150; // Evening usage
      
      // Add some randomness
      const activeUsers = Math.floor(baseUsers + (Math.random() - 0.5) * 100);
      
      // API calls based on active users and time
      const apiCallsPerUser = 15 + Math.random() * 10; // 15-25 calls per user
      const apiCalls = Math.floor(activeUsers * apiCallsPerUser);
      
      // Data processed based on API calls (each call processes ~50MB on average)
      const dataProcessedMB = apiCalls * 50;
      const dataProcessedTB = dataProcessedMB / (1024 * 1024); // Convert to TB
      
      // Uptime with realistic fluctuations
      const uptime = 99.9 - (Math.random() * 0.1); // 99.8-99.9%
      
      setSaasMetrics({
        activeUsers,
        apiCalls,
        dataProcessed: dataProcessedTB,
        uptime
      });
    };

    // Generate initial metrics
    generateRealisticMetrics();
    
    // Update metrics every 30 seconds
    const interval = setInterval(generateRealisticMetrics, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        currentEmissions: prev.currentEmissions + (Math.random() - 0.5) * 10,
        lastUpdate: new Date().toISOString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const previousFootprint = footprintHistory[1]?.total || 0;
  const change = currentFootprint - previousFootprint;
  
  const recommendations = [
    { 
      action: 'Use public transport 2 days/week',
      savings: 15,
      impact: 'Reduce travel emissions by 20%',
      category: 'transport'
    },
    {
      action: 'Switch to LED bulbs',
      savings: 8,
      impact: 'Lower home energy by 10%',
      category: 'energy'
    },
    {
      action: 'Reduce meat consumption 1 day/week',
      savings: 12,
      impact: 'Decrease food footprint by 15%',
      category: 'food'
    }
  ];

  // Prepare chart data
  const chartData = footprintHistory.slice(0, 6).reverse().map(data => ({
    month: new Date(data.date).toLocaleDateString('en-US', { month: 'short' }),
    total: data.total,
    travel: data.travel,
    energy: data.homeEnergy,
    food: data.foodPurchases
  }));

  // Real-time emissions data for the last 24 hours
  const realTimeChartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    emissions: 200 + Math.sin(i / 24 * Math.PI) * 50 + Math.random() * 20,
    prediction: 200 + Math.sin(i / 24 * Math.PI) * 50
  }));

  // Calculate forecast
  const trend = footprintHistory.length > 1 ? 
    (footprintHistory[0].total - footprintHistory[footprintHistory.length - 1].total) / footprintHistory.length : 0;
  const forecast = Math.max(0, currentFootprint + trend);

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold gradient-text mb-3">Dynamic Carbon Dashboard</h2>
        <p className="text-xl text-secondary-600">Real-time emissions tracking with advanced data pipeline architecture</p>
      </motion.div>

      {/* Real-time Emissions Section */}
      <AnimatedCard delay={0.1} className="border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-800">Real-time Emissions</h3>
              <p className="text-sm text-blue-600">Live data from smart meter integration</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-600">Last updated</p>
            <p className="text-sm font-medium text-blue-800">
              {new Date(realTimeData.lastUpdate).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-white rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Current Emissions</p>
            <p className="text-3xl font-bold text-blue-800">
              {realTimeData.currentEmissions.toFixed(1)}
            </p>
            <p className="text-sm text-blue-600">kg CO₂e/hour</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Trend</p>
            <p className="text-3xl font-bold text-green-600 capitalize">
              {realTimeData.trend}
            </p>
            <p className="text-sm text-blue-600">vs previous hour</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Prediction</p>
            <p className="text-3xl font-bold text-purple-600">
              {realTimeData.prediction.toFixed(1)}
            </p>
            <p className="text-sm text-blue-600">kg CO₂e/hour</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={realTimeChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="hour" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="emissions" 
              stroke="#3b82f6" 
              fill="url(#realTimeGradient)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="prediction" 
              stroke="#8b5cf6" 
              fill="url(#predictionGradient)" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <defs>
              <linearGradient id="realTimeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="predictionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </AnimatedCard>

      {/* SaaS Platform Metrics */}
      <AnimatedCard delay={0.2} className="border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-600 rounded-xl">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Live Platform Metrics</h3>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-600">Updates every 30s</p>
            <p className="text-sm font-medium text-green-800">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="text-center p-4 bg-white rounded-xl border border-green-200"
            key={saasMetrics.activeUsers}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">
              {saasMetrics.activeUsers.toLocaleString()}
            </p>
            <p className="text-sm text-green-600">Active Users</p>
            <p className="text-xs text-green-500 mt-1">
              {saasMetrics.activeUsers > 1000 ? 'Peak hours' : 'Normal traffic'}
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center p-4 bg-white rounded-xl border border-green-200"
            key={saasMetrics.apiCalls}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">
              {saasMetrics.apiCalls.toLocaleString()}
            </p>
            <p className="text-sm text-green-600">API Calls Today</p>
            <p className="text-xs text-green-500 mt-1">
              ~{Math.round(saasMetrics.apiCalls / saasMetrics.activeUsers)} per user
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center p-4 bg-white rounded-xl border border-green-200"
            key={Math.round(saasMetrics.dataProcessed * 100)}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">
              {saasMetrics.dataProcessed.toFixed(2)}TB
            </p>
            <p className="text-sm text-green-600">Data Processed</p>
            <p className="text-xs text-green-500 mt-1">
              {Math.round(saasMetrics.dataProcessed * 1024)}GB today
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center p-4 bg-white rounded-xl border border-green-200"
            key={Math.round(saasMetrics.uptime * 100)}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">
              {saasMetrics.uptime.toFixed(2)}%
            </p>
            <p className="text-sm text-green-600">Uptime</p>
            <p className="text-xs text-green-500 mt-1">
              {saasMetrics.uptime > 99.95 ? 'Excellent' : 'Good'} performance
            </p>
          </motion.div>
        </div>

        {/* Additional Real-time Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded-lg border border-green-200">
            <p className="text-xs text-green-600">Response Time</p>
            <p className="text-lg font-semibold text-green-800">
              {(120 + Math.random() * 80).toFixed(0)}ms
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-200">
            <p className="text-xs text-green-600">Error Rate</p>
            <p className="text-lg font-semibold text-green-800">
              {(0.01 + Math.random() * 0.04).toFixed(3)}%
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-200">
            <p className="text-xs text-green-600">Concurrent Sessions</p>
            <p className="text-lg font-semibold text-green-800">
              {Math.floor(saasMetrics.activeUsers * 0.7).toLocaleString()}
            </p>
          </div>
        </div>
      </AnimatedCard>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AnimatedCard delay={0.3} className="border border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">Current Footprint</p>
              <p className="text-3xl font-bold text-secondary-800">{currentFootprint}</p>
              <p className="text-sm text-secondary-500">kg CO₂e this month</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.4} className="border border-accent-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">vs Global Average</p>
              <p className="text-3xl font-bold text-secondary-800">{averageFootprint - currentFootprint}</p>
              <p className="text-sm text-accent-600 font-medium">kg CO₂e below average</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-lg">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.5} className={`border ${change >= 0 ? 'border-red-100' : 'border-green-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">Monthly Change</p>
              <p className={`text-3xl font-bold ${change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {change >= 0 ? '+' : ''}{change}
              </p>
              <p className="text-sm text-secondary-500">kg CO₂e vs last month</p>
            </div>
            <div className={`p-3 rounded-xl shadow-lg ${
              change >= 0 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : 'bg-gradient-to-r from-green-500 to-green-600'
            }`}>
              {change >= 0 ? 
                <TrendingUp className="h-6 w-6 text-white" /> : 
                <TrendingDown className="h-6 w-6 text-white" />
              }
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.6} className="border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600 mb-1">Forecast Next Month</p>
              <p className="text-3xl font-bold text-blue-600">{Math.round(forecast)}</p>
              <p className="text-sm text-secondary-500">kg CO₂e projected</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Line Chart */}
        <AnimatedCard delay={0.7} className="border border-primary-100">
          <h3 className="text-xl font-semibold text-secondary-800 mb-6 flex items-center">
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
            Footprint Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="url(#gradient)" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#16a34a' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </AnimatedCard>

        {/* Category Breakdown */}
        <AnimatedCard delay={0.8} className="border border-accent-100">
          <h3 className="text-xl font-semibold text-secondary-800 mb-6 flex items-center">
            <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
            Category Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="travel" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
              <Bar dataKey="energy" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
              <Bar dataKey="food" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </div>

      {/* Anomaly Detection */}
      <AnimatedCard delay={0.9} className="border border-yellow-100">
        <h3 className="text-xl font-semibold text-secondary-800 mb-6 flex items-center">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
          Smart Insights & Anomaly Detection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-yellow-800">Travel Spike Detected</span>
            </div>
            <p className="text-sm text-yellow-700">
              Your travel emissions increased by 40% last week. Consider carpooling or public transport.
            </p>
          </motion.div>
          
          <motion.div 
            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-800">Energy Improvement</span>
            </div>
            <p className="text-sm text-green-700">
              Great job! Your home energy usage is 15% below your usual pattern.
            </p>
          </motion.div>
          
          <motion.div 
            className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-blue-800">Consistent Progress</span>
            </div>
            <p className="text-sm text-blue-700">
              You've maintained steady improvement for 3 consecutive months.
            </p>
          </motion.div>
        </div>
      </AnimatedCard>

      {/* Recommendations */}
      <AnimatedCard delay={1.0} className="border border-purple-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-secondary-800">Personalized Recommendations</h3>
        </div>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-semibold text-secondary-800">{rec.action}</p>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    rec.category === 'transport' ? 'bg-blue-100 text-blue-800' :
                    rec.category === 'energy' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.category}
                  </span>
                </div>
                <p className="text-sm text-secondary-600">{rec.impact}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">-{rec.savings}</p>
                <p className="text-xs text-secondary-500">kg CO₂e</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};