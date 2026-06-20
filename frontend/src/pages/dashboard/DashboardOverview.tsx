import { PageTransition } from '../../components/ui/PageTransition';
import { Counter } from '../../components/ui/Counter';
import { AIOrbit } from '../../components/dashboard/AIOrbit';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { Zap, TrendingUp, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardOverview = () => {
  const stats = [
    { label: 'Total Requests', value: 14520, prefix: '', suffix: '', decimals: 0 },
    { label: 'Tokens Processed', value: 2.4, prefix: '', suffix: 'M', decimals: 1 },
    { label: 'Total Cost', value: 342, prefix: '$', suffix: '', decimals: 2 },
    { label: 'Active Providers', value: 8, prefix: '', suffix: '', decimals: 0 },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Overview</h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">System Healthy</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">
                {stat.prefix}
                <Counter end={stat.value} duration={1} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Orbit Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-white/5 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4">Multi-Model Routing Hub</h3>
              <AIOrbit />
            </div>
            
            {/* Budget Health & Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-white/5 p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-primary" size={18} />
                  Budget Health
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Spend</span>
                    <span className="font-bold">$342.00 / $500.00</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '68%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                  <p className="text-xs text-gray-500">68% of monthly budget used. Projected to stay within limit.</p>
                </div>
              </div>

              <div className="bg-card border border-white/5 p-6 rounded-2xl bg-gradient-to-br from-card to-primary/5 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Zap className="text-yellow-400" size={18} />
                  Smart Insights
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Routing background tasks from <strong>GPT-4o</strong> to <strong>Claude-3-Haiku</strong> could save approximately <strong>$45.00</strong> this week without affecting latency.
                </p>
                <button className="text-xs font-bold text-primary hover:text-white transition-colors uppercase tracking-wider">Apply Optimization &rarr;</button>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <ActivityFeed />
            
            <div className="bg-card border border-white/5 p-6 rounded-2xl">
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldAlert className="text-secondary" size={18} />
                  Security Alerts
                </h3>
                <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg text-sm text-gray-200">
                  <p className="font-bold text-secondary mb-1">Unusual Traffic Detected</p>
                  <p className="text-xs">Spike in requests from IP 192.168.1.42. Rate limiting engaged automatically.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
