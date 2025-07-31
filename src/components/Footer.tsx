import React from 'react';
import { Leaf, Zap, Database, Globe, Shield, BarChart3, Code, TestTube } from 'lucide-react';

export const Footer: React.FC = () => {
  const features = [
    { icon: Zap, label: 'Real-time Calc', color: 'text-blue-600' },
    { icon: Database, label: 'REST API', color: 'text-green-600' },
    { icon: TestTube, label: 'API Testing', color: 'text-purple-600' },
    { icon: Shield, label: 'SaaS Ready', color: 'text-orange-600' },
    { icon: Code, label: 'React', color: 'text-cyan-600' },
    { icon: BarChart3, label: 'Emissions Data', color: 'text-red-600' },
    { icon: Globe, label: 'Postman', color: 'text-indigo-600' },
    { icon: Leaf, label: 'Selenium', color: 'text-emerald-600' },
  ];

  return (
    <footer className="bg-white border-t border-green-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-8">
          <div className="flex items-center space-x-2 mb-6 lg:mb-0">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <span className="text-xl font-semibold text-gray-800">ReLeaf Sync</span>
              <p className="text-sm text-gray-600">Dynamic Carbon Footprint Calculator</p>
            </div>
          </div>
          
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Full-Stack SaaS Solution</h3>
            <p className="text-sm text-gray-600 max-w-md">
              Advanced data pipeline architecture with real-time emissions processing and comprehensive API integration.
            </p>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <feature.icon className={`h-5 w-5 ${feature.color} mb-2`} />
              <span className="text-xs text-gray-700 text-center font-medium">{feature.label}</span>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              <p>&copy; 2024 ReLeaf Sync Platform. Track your carbon footprint and make a positive impact.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">API Docs</a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};