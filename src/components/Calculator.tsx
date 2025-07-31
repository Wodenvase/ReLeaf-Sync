import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, ShoppingCart, Plane } from 'lucide-react';
import { FootprintData } from '../types';
import { AnimatedCard } from './ui/AnimatedCard';
import { GradientButton } from './ui/GradientButton';

interface CalculatorProps {
  onSubmit: (data: Omit<FootprintData, 'id' | 'userId'>) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    travel: {
      flightMiles: 0,
      carMiles: 0,
      publicTransport: 0
    },
    homeEnergy: {
      electricity: 0,
      gas: 0,
      heating: 0
    },
    foodPurchases: {
      meat: 0,
      dairy: 0,
      processed: 0
    }
  });

  const steps = [
    {
      title: 'Travel',
      icon: Plane,
      description: 'Calculate emissions from transportation',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Home Energy',
      icon: Home,
      description: 'Track your household energy consumption',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Food & Purchases',
      icon: ShoppingCart,
      description: 'Monitor consumption and shopping habits',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const calculateTravelFootprint = () => {
    const { flightMiles, carMiles, publicTransport } = formData.travel;
    return (flightMiles * 0.25) + (carMiles * 0.4) + (publicTransport * 0.1);
  };

  const calculateHomeEnergyFootprint = () => {
    const { electricity, gas, heating } = formData.homeEnergy;
    return (electricity * 0.5) + (gas * 0.2) + (heating * 0.3);
  };

  const calculateFoodFootprint = () => {
    const { meat, dairy, processed } = formData.foodPurchases;
    return (meat * 6.5) + (dairy * 3.2) + (processed * 2.1);
  };

  const totalFootprint = calculateTravelFootprint() + calculateHomeEnergyFootprint() + calculateFoodFootprint();

  const updateFormData = (category: string, field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    const data = {
      date: new Date().toISOString().split('T')[0],
      travel: Math.round(calculateTravelFootprint()),
      homeEnergy: Math.round(calculateHomeEnergyFootprint()),
      foodPurchases: Math.round(calculateFoodFootprint()),
      total: Math.round(totalFootprint),
      source: 'manual' as const
    };
    onSubmit(data);
    setCurrentStep(0);
    setFormData({
      travel: { flightMiles: 0, carMiles: 0, publicTransport: 0 },
      homeEnergy: { electricity: 0, gas: 0, heating: 0 },
      foodPurchases: { meat: 0, dairy: 0, processed: 0 }
    });
  };

  const renderTravelStep = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { key: 'flightMiles', label: 'Flight Miles (per month)', icon: '✈️' },
          { key: 'carMiles', label: 'Car Miles (per month)', icon: '🚗' },
          { key: 'publicTransport', label: 'Public Transport (trips/month)', icon: '🚌' }
        ].map((field, index) => (
          <motion.div
            key={field.key}
            className="glass-card rounded-xl p-6 border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl mb-3">{field.icon}</div>
            <label className="block text-sm font-semibold text-secondary-700 mb-3">
              {field.label}
            </label>
            <input
              type="number"
              value={formData.travel[field.key as keyof typeof formData.travel]}
              onChange={(e) => updateFormData('travel', field.key, Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="0"
            />
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-blue-700 font-medium">
          Travel Footprint: <span className="text-xl font-bold">{Math.round(calculateTravelFootprint())} kg CO₂e</span>
        </p>
      </motion.div>
    </motion.div>
  );

  const renderHomeEnergyStep = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { key: 'electricity', label: 'Electricity (kWh/month)', icon: '⚡' },
          { key: 'gas', label: 'Natural Gas (therms/month)', icon: '🔥' },
          { key: 'heating', label: 'Heating Oil (gallons/month)', icon: '🛢️' }
        ].map((field, index) => (
          <motion.div
            key={field.key}
            className="glass-card rounded-xl p-6 border border-yellow-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl mb-3">{field.icon}</div>
            <label className="block text-sm font-semibold text-secondary-700 mb-3">
              {field.label}
            </label>
            <input
              type="number"
              value={formData.homeEnergy[field.key as keyof typeof formData.homeEnergy]}
              onChange={(e) => updateFormData('homeEnergy', field.key, Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
              placeholder="0"
            />
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-yellow-700 font-medium">
          Home Energy Footprint: <span className="text-xl font-bold">{Math.round(calculateHomeEnergyFootprint())} kg CO₂e</span>
        </p>
      </motion.div>
    </motion.div>
  );

  const renderFoodStep = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { key: 'meat', label: 'Meat Consumption (lbs/month)', icon: '🥩' },
          { key: 'dairy', label: 'Dairy Products (lbs/month)', icon: '🥛' },
          { key: 'processed', label: 'Processed Foods (lbs/month)', icon: '🥫' }
        ].map((field, index) => (
          <motion.div
            key={field.key}
            className="glass-card rounded-xl p-6 border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl mb-3">{field.icon}</div>
            <label className="block text-sm font-semibold text-secondary-700 mb-3">
              {field.label}
            </label>
            <input
              type="number"
              value={formData.foodPurchases[field.key as keyof typeof formData.foodPurchases]}
              onChange={(e) => updateFormData('foodPurchases', field.key, Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="0"
            />
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-green-700 font-medium">
          Food Footprint: <span className="text-xl font-bold">{Math.round(calculateFoodFootprint())} kg CO₂e</span>
        </p>
      </motion.div>
    </motion.div>
  );

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold gradient-text mb-3">Carbon Footprint Calculator</h2>
        <p className="text-xl text-secondary-600">Calculate your monthly environmental impact</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${
                currentStep >= index 
                  ? `bg-gradient-to-r ${step.color} text-white shadow-lg` 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`font-semibold transition-colors duration-300 ${
                currentStep >= index ? 'text-primary-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatedCard className="mb-8 border border-primary-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-3 bg-gradient-to-r ${currentStepData.color} rounded-xl shadow-lg`}>
            <StepIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary-800">{currentStepData.title}</h3>
            <p className="text-secondary-600">{currentStepData.description}</p>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {currentStep === 0 && renderTravelStep()}
          {currentStep === 1 && renderHomeEnergyStep()}
          {currentStep === 2 && renderFoodStep()}
        </AnimatePresence>
      </AnimatedCard>

      {/* Total Footprint */}
      <motion.div 
        className="bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-8 mb-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <p className="text-primary-100 mb-2 text-lg">Total Monthly Footprint</p>
          <motion.p 
            className="text-5xl font-bold mb-2"
            key={totalFootprint}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(totalFootprint)}
          </motion.p>
          <p className="text-primary-100 text-lg">kg CO₂e</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <GradientButton
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          variant="secondary"
          className={currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </GradientButton>

        {currentStep < steps.length - 1 ? (
          <GradientButton
            onClick={() => setCurrentStep(currentStep + 1)}
            variant="primary"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </GradientButton>
        ) : (
          <GradientButton
            onClick={handleSubmit}
            variant="accent"
            size="lg"
          >
            Save Results
          </GradientButton>
        )}
      </div>
    </div>
  );
};