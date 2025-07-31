import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Leaf, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  TrendingDown,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'AI-powered insights to track and reduce your carbon footprint with personalized recommendations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Manage organization-wide carbon goals with team dashboards and competitive leaderboards.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-time Tracking',
      description: 'Connect smart devices and services for automatic carbon footprint monitoring.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with API access controls and comprehensive audit trails.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '2.5M', label: 'Tons CO₂ Saved', icon: Leaf },
    { number: '150+', label: 'Companies', icon: Globe },
    { number: '99.9%', label: 'Uptime', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ReLeaf Sync</span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#features" className="text-secondary-600 hover:text-primary-600 font-medium">Features</a>
              <a href="#about" className="text-secondary-600 hover:text-primary-600 font-medium">About</a>
              <button 
                onClick={onGetStarted}
                className="btn-primary"
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Track Your <span className="gradient-text">Carbon Impact</span>
              <br />
              <span className="text-secondary-700">Make a Difference</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The most comprehensive platform for individuals and organizations to monitor, 
              analyze, and reduce their carbon footprint with AI-powered insights.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button onClick={onGetStarted} className="btn-primary text-lg px-8 py-4 flex items-center">
              Start Tracking Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4 flex items-center">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Your Carbon Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm opacity-80">This Month</p>
                    <p className="text-2xl font-bold">250 kg</p>
                    <p className="text-sm text-green-300">↓ 15% vs last month</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm opacity-80">Annual Target</p>
                    <p className="text-2xl font-bold">2.4 tons</p>
                    <p className="text-sm text-green-300">On track</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="text-sm opacity-80">Rank</p>
                    <p className="text-2xl font-bold">#12</p>
                    <p className="text-sm text-green-300">Top 5%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-2">{stat.number}</h3>
                <p className="text-secondary-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span> for Every Need
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              From individual tracking to enterprise-wide carbon management, 
              we've got the tools you need to make a real impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-2xl p-8 card-hover"
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-800 mb-4">{feature.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Reduce Your Impact</span>?
            </h2>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Join thousands of individuals and organizations making a difference. 
              Start your carbon tracking journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={onGetStarted} className="btn-primary text-lg px-8 py-4 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">ReLeaf Sync</span>
              </div>
              <p className="text-secondary-400 leading-relaxed">
                Empowering individuals and organizations to track, understand, and reduce their carbon footprint.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">Smart Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Team Collaboration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real-time Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-800 mt-12 pt-8 text-center text-secondary-400">
            <p>Made with 💚 for the planet by <span className="text-white font-medium">Dipanta Bhattacharyya</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};