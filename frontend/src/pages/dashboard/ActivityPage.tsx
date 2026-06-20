import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { mockActivities, mockProviders } from '../../lib/mockData';
import { CheckCircle2, AlertTriangle, Clock, Filter, Activity as ActivityIcon } from 'lucide-react';

export const ActivityPage = () => {
  const [activities, setActivities] = useState(mockActivities);
  const [filter, setFilter] = useState('All');

  // Simulate real-time events coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const providers = ['OpenAI', 'Claude', 'Gemini', 'DeepSeek'];
      const randomProvider = providers[Math.floor(Math.random() * providers.length)];
      
      const newActivity = {
        id: `act_${Date.now()}`,
        provider: randomProvider,
        model: `${randomProvider.toLowerCase()}-live`,
        action: 'API call',
        details: `Routed ${Math.floor(Math.random() * 500) + 100} tokens (success)`,
        time: 'Just now',
        type: 'success'
      };
      
      setActivities(prev => [newActivity, ...prev].slice(0, 50)); // keep last 50
    }, 8000); // add a new event every 8s
    
    return () => clearInterval(interval);
  }, []);

  const filteredActivities = filter === 'All' 
    ? activities 
    : activities.filter(a => a.provider === filter);

  return (
    <PageTransition>
      <div className="space-y-6 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Live Activity</h1>
            <p className="text-gray-400">Real-time gateway routing and event logs</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
            <Filter size={14} className="text-gray-400 ml-2" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent border-none text-sm text-white focus:ring-0 outline-none cursor-pointer py-1 pr-4 pl-2"
            >
              <option value="All">All Providers</option>
              {mockProviders.map(p => <option key={p.id} value={p.name} className="bg-background">{p.name}</option>)}
            </select>
          </div>
        </div>

        <div className="flex-1 bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center gap-2 text-sm font-medium text-gray-400">
            <ActivityIcon size={16} className="text-primary animate-pulse" /> Live Stream Connected
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <AnimatePresence initial={false}>
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-colors mb-2"
                >
                  <div className="mt-1">
                    {activity.type === 'success' && <CheckCircle2 className="text-primary" size={18} />}
                    {activity.type === 'warning' && <AlertTriangle className="text-yellow-500" size={18} />}
                    {activity.type === 'info' && <Clock className="text-blue-400" size={18} />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        {activity.provider} <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">{activity.model}</span>
                      </h4>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{activity.details}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredActivities.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <Filter size={32} className="mb-2 opacity-50" />
                <p>No activity found for {filter}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
