import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { mockModels } from '../../lib/mockData';
import { Cpu, Activity, DollarSign, Zap } from 'lucide-react';

export const ModelsPage = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Models</h1>
          <p className="text-gray-400">Performance and pricing metrics for active models</p>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-4">Model Name</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"><div className="flex items-center gap-1"><Activity size={14} /> Latency</div></th>
                  <th className="px-6 py-4"><div className="flex items-center gap-1"><Zap size={14} /> TPS</div></th>
                  <th className="px-6 py-4"><div className="flex items-center gap-1"><DollarSign size={14} /> Cost / 1k</div></th>
                  <th className="px-6 py-4">Requests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockModels.map((model, i) => (
                  <motion.tr 
                    key={model.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <Cpu size={16} className={model.status === 'healthy' ? 'text-primary' : 'text-gray-500'} />
                      {model.id}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{model.provider}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${model.status === 'healthy' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                        {model.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{model.latency}ms</td>
                    <td className="px-6 py-4 text-primary">{model.tps}</td>
                    <td className="px-6 py-4 text-secondary">${model.costPer1k.toFixed(4)}</td>
                    <td className="px-6 py-4">{model.requests.toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
