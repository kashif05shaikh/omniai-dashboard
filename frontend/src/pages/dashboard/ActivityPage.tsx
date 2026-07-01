import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { Skeleton } from '../../components/ui/Skeleton';
import { getUsageLogs } from '../../lib/api';
import { CheckCircle2, AlertTriangle, Clock, Filter, Activity as ActivityIcon } from 'lucide-react';

interface UsageLog {
  _id?: string;
  id?: string;
  provider: string;
  model: string;
  status?: string;
  cost?: number;
  timestamp?: string;
}

export const ActivityPage = () => {
  const [activities, setActivities] = useState<UsageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [providers, setProviders] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsageLogs();
        const logs = Array.isArray(data) ? data : [];
        setActivities(logs);
        const uniqueProviders = [...new Set(logs.map(l => l.provider))];
        setProviders(uniqueProviders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch usage logs');
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
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
              {providers.map(p => <option key={p} value={p} className="bg-background">{p}</option>)}
            </select>
          </div>
        </div>

        {loading && (
          <div className="flex-1 bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5">
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex-1 p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-400 font-medium mb-2">Failed to load activity</p>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && activities.length === 0 && !error && (
          <div className="flex-1 bg-card border border-white/5 rounded-2xl p-12 flex items-center justify-center">
            <div className="text-center">
              <ActivityIcon size={48} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">No activity yet</h3>
              <p className="text-gray-400">Usage logs will appear here when requests are made</p>
            </div>
          </div>
        )}

        {!loading && activities.length > 0 && (
          <div className="flex-1 bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 flex items-center gap-2 text-sm font-medium text-gray-400">
              <ActivityIcon size={16} className="text-primary animate-pulse" /> Live Stream Connected
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              <AnimatePresence initial={false}>
                {filteredActivities.map((activity) => (
                  <motion.div
                    key={activity._id || activity.id}
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-colors mb-2"
                  >
                    <div className="mt-1">
                      {activity.status === 'success' ? (
                        <CheckCircle2 className="text-primary" size={18} />
                      ) : activity.status === 'error' ? (
                        <AlertTriangle className="text-yellow-500" size={18} />
                      ) : (
                        <Clock className="text-blue-400" size={18} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {activity.provider} / {activity.model}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cost: ${(activity.cost || 0).toFixed(4)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(activity.timestamp || Date.now()).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};