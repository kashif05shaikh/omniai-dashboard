import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { Counter } from '../../components/ui/Counter';
import { mockProviders, mockAnalytics } from '../../lib/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp } from 'lucide-react';

export const CostsPage = () => {
  const totalCost = mockProviders.reduce((acc, p) => acc + p.stats.cost, 0);
  const budgetLimit = 500;
  const budgetPercentage = (totalCost / budgetLimit) * 100;
  
  // Color shifts based on usage
  let budgetColor = 'bg-primary';
  let budgetGradient = 'from-primary to-secondary';
  let statusText = 'On Track';
  let statusClasses = 'border-primary/30 text-primary bg-primary/10';
  
  if (budgetPercentage > 90) {
    budgetColor = 'bg-red-500';
    budgetGradient = 'from-red-500 to-red-700';
    statusText = 'Critical';
    statusClasses = 'border-red-500/30 text-red-500 bg-red-500/10';
  } else if (budgetPercentage > 75) {
    budgetColor = 'bg-yellow-500';
    budgetGradient = 'from-yellow-400 to-yellow-600';
    statusText = 'Warning';
    statusClasses = 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10';
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Costs & Billing</h1>
          <p className="text-gray-400">Track and optimize your AI expenditure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Spend */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${budgetColor} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
            <h3 className="text-gray-400 flex items-center gap-2 mb-2"><DollarSign size={16} /> Total Spend (MTD)</h3>
            <div className="text-4xl font-bold flex items-baseline gap-1">
              $ <Counter end={totalCost} duration={1.5} decimals={2} />
            </div>
            <p className="text-xs text-gray-500 mt-4">+12.5% from last month</p>
          </motion.div>

          {/* Budget Health Indicator */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-white/5 p-6 rounded-2xl md:col-span-2 relative overflow-hidden">
            <h3 className="text-gray-400 flex items-center justify-between mb-4">
              <span className="flex items-center gap-2"><TrendingUp size={16} /> Budget Health</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full border ${statusClasses}`}>
                {statusText}
              </span>
            </h3>
            
            <div className="mb-2 flex justify-between items-end">
              <span className="text-2xl font-bold">${totalCost.toFixed(2)} <span className="text-sm font-normal text-gray-500">used</span></span>
              <span className="text-sm font-bold text-gray-400">${budgetLimit.toFixed(2)} <span className="font-normal text-gray-500">limit</span></span>
            </div>
            
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${budgetGradient} relative`}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Graph */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-white/5 p-6 rounded-2xl lg:col-span-2 h-96">
            <h3 className="text-lg font-bold mb-4">Cost Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAnalytics.monthlyCosts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ backgroundColor: '#0b0a1a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#00f0ff' }} />
                <Area type="monotone" dataKey="cost" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Provider Breakdown */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-white/5 p-6 rounded-2xl flex flex-col">
            <h3 className="text-lg font-bold mb-4">Provider Breakdown</h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {mockProviders.sort((a, b) => b.stats.cost - a.stats.cost).map((provider) => (
                <div key={provider.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10" style={{ backgroundColor: `${provider.color}15`, color: provider.color }}>
                      {provider.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{provider.name}</p>
                      <p className="text-xs text-gray-500">{((provider.stats.cost / totalCost) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="font-bold text-sm">
                    ${provider.stats.cost.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};
