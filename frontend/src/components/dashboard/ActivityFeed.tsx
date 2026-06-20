import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const mockEvents = [
  { id: 1, type: 'success', text: 'Routed 1.2k tokens to GPT-4o', time: 'Just now' },
  { id: 2, type: 'warning', text: 'Latency spike on Claude-3-Opus', time: '2m ago' },
  { id: 3, type: 'success', text: 'Fallback to Gemini Pro successful', time: '5m ago' },
  { id: 4, type: 'info', text: 'Rate limit refreshed for DeepSeek', time: '12m ago' },
  { id: 5, type: 'success', text: 'Processed batch request (450 items)', time: '18m ago' },
];

export const ActivityFeed = () => {
  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        Live Activity Feed
      </h3>
      <div className="space-y-4">
        {mockEvents.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            {event.type === 'success' && <CheckCircle2 className="text-primary mt-0.5" size={16} />}
            {event.type === 'warning' && <AlertCircle className="text-yellow-500 mt-0.5" size={16} />}
            {event.type === 'info' && <Clock className="text-blue-400 mt-0.5" size={16} />}
            
            <div className="flex-1">
              <p className="text-sm text-gray-200">{event.text}</p>
              <p className="text-xs text-gray-500 mt-1">{event.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
