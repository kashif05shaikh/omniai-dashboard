import { motion } from 'framer-motion';

const providers = [
  { name: 'OpenAI', color: '#10a37f' },
  { name: 'Gemini', color: '#4285f4' },
  { name: 'Claude', color: '#d97757' },
  { name: 'Grok', color: '#ffffff' },
  { name: 'DeepSeek', color: '#4d6bfe' },
  { name: 'Perplexity', color: '#22b8cd' },
  { name: 'OpenRouter', color: '#3b82f6' },
  { name: 'Groq', color: '#f55036' },
];

export const AIOrbit = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-80 bg-card border border-white/5 rounded-2xl overflow-hidden">
      {/* Background circles */}
      <div className="absolute w-48 h-48 border border-white/10 rounded-full" />
      <div className="absolute w-64 h-64 border border-white/5 rounded-full border-dashed" />
      
      {/* Central Hub */}
      <div className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)]">
        <span className="font-bold text-background text-lg">HUB</span>
      </div>

      {/* Orbiting nodes */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64"
      >
        {providers.map((p, i) => {
          const angle = (i * 360) / providers.length;
          const radius = 128; // half of w-64
          // Convert polar to cartesian
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <motion.div
              key={p.name}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-background border flex items-center justify-center text-[10px] font-bold shadow-lg"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                borderColor: p.color,
                color: p.color
              }}
              // Counter-rotate so text stays upright
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {p.name.substring(0,2).toUpperCase()}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
