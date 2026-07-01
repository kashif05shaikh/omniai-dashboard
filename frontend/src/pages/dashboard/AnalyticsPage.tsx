import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { Skeleton } from '../../components/ui/Skeleton';
import { getAnalytics } from '../../lib/api';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

interface AnalyticsData {
  dailyTokens?: Array<{ date: string; [key: string]: any }>;
  monthlyCosts?: Array<{ month: string; cost: number }>;
  providerDist?: Array<{ name: string; value: number; color: string }>;
}

export const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAnalytics();
        setAnalytics(data || {});
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
        setAnalytics({});
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const mockAnalytics = {
    dailyTokens: Array.from({ length: 14 }).map((_, i) => ({
      date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      OpenAI: Math.floor(Math.random() * 500) + 100,
      Claude: Math.floor(Math.random() * 400) + 50,
      Gemini: Math.floor(Math.random() * 300) + 80,
    })),
    monthlyCosts: Array.from({ length: 6 }).map((_, i) => ({
      month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
      cost: Math.floor(Math.random() * 300) + 150,
    })),
    providerDist: [
      { name: 'OpenAI', value: 45, color: '#10a37f' },
      { name: 'Claude', value: 25, color: '#d97757' },
      { name: 'Gemini', value: 20, color: '#4285f4' },
      { name: 'DeepSeek', value: 10, color: '#4d6bfe' },
    ]
  };

  const displayData = {
    dailyTokens: analytics.dailyTokens || mockAnalytics.dailyTokens,
    monthlyCosts: analytics.monthlyCosts || mockAnalytics.monthlyCosts,
    providerDist: analytics.providerDist || mockAnalytics.providerDist,
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Analytics</h1>
          <p className="text-gray-400">Deep dive into usage, costs, and token consumption</p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-400 font-medium mb-2">Failed to load analytics</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Token Usage - Area Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-white/5 p-6 rounded-2xl h-96"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-200">Daily Token Usage</h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayData.dailyTokens} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOpenAI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10a37f" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10a37f" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClaude" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97757" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d97757" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0b0a1a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="OpenAI" stroke="#10a37f" fillOpacity={1} fill="url(#colorOpenAI)" />
                  <Area type="monotone" dataKey="Claude" stroke="#d97757" fillOpacity={1} fill="url(#colorClaude)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Monthly Cost - Bar Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-white/5 p-6 rounded-2xl h-96"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-200">Monthly Cost (USD)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayData.monthlyCosts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0b0a1a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="cost" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Provider Distribution - Pie Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-white/5 p-6 rounded-2xl h-80"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-200">Request Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={displayData.providerDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {displayData.providerDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0b0a1a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#ccc' }} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Usage Heatmap (Custom implementation) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-white/5 p-6 rounded-2xl h-80 flex flex-col"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-200">90-Day Activity Heatmap</h3>
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5 p-4 bg-black/20 rounded-xl border border-white/5">
                  {Array.from({ length: 90 }).map((_, i) => {
                    const value = Math.floor(Math.random() * 100);
                    let opacity = 0.1;
                    if (value > 75) opacity = 1;
                    else if (value > 50) opacity = 0.7;
                    else if (value > 25) opacity = 0.4;
                    
                    return (
                      <div 
                        key={i} 
                        className="w-3 h-3 rounded-sm transition-all hover:scale-125 cursor-help"
                        style={{ backgroundColor: `rgba(0, 240, 255, ${opacity})` }}
                        title={`${value} requests`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-end items-center gap-2 mt-2 text-xs text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0.1, 0.4, 0.7, 1].map(op => (
                    <div key={op} className="w-2 h-2 rounded-sm" style={{ backgroundColor: `rgba(0, 240, 255, ${op})` }} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};