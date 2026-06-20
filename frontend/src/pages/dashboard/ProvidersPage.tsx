import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { mockProviders } from '../../lib/mockData';
import { Network, Database, Zap, Clock, Key } from 'lucide-react';

export const ProvidersPage = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Providers</h1>
            <p className="text-gray-400">Manage your connected AI models and accounts</p>
          </div>
          <button className="px-4 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Key size={16} />
            Add Provider
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockProviders.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-card border border-white/5 p-5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                style={{ background: `radial-gradient(circle at center, ${provider.color} 0%, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: `${provider.color}15`, color: provider.color }}
                    >
                      <Network size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{provider.name}</h3>
                      <p className="text-xs text-gray-500">{provider.accountName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                      <div className={`w-2 h-2 rounded-full ${provider.status === 'connected' ? 'bg-primary shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse' : 'bg-gray-500'}`} />
                      <span className="text-[10px] uppercase tracking-wider text-gray-300">{provider.status}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-gray-400 flex items-center gap-1.5"><Zap size={14} /> Requests</span>
                    <span className="font-medium">{provider.stats.requests.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-gray-400 flex items-center gap-1.5"><Database size={14} /> Tokens (M)</span>
                    <span className="font-medium">{(provider.stats.totalTokens / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Est. Cost</span>
                    <span className="font-medium text-secondary">${provider.stats.cost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5">
                  <Clock size={12} /> Last active: {provider.lastActivity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
