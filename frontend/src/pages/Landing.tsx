import { motion } from 'framer-motion';
import { Activity, Cpu, Globe, Lock, Zap, Layers } from 'lucide-react';
import { Particles } from '../components/ui/Particles';
import { Counter } from '../components/ui/Counter';
import { Link } from 'react-router-dom';

const features = [
  { icon: <Cpu className="w-6 h-6 text-primary" />, title: 'Multi-Model Routing', desc: 'Dynamically route requests to the best performing AI model.' },
  { icon: <Activity className="w-6 h-6 text-secondary" />, title: 'Real-time Analytics', desc: 'Track token usage, costs, and latency across all providers.' },
  { icon: <Lock className="w-6 h-6 text-primary" />, title: 'Enterprise Security', desc: 'End-to-end encryption with advanced rate limiting.' },
  { icon: <Globe className="w-6 h-6 text-secondary" />, title: 'Global Edge Network', desc: 'Ultra-low latency inference via our distributed edge nodes.' },
  { icon: <Zap className="w-6 h-6 text-primary" />, title: 'Instant Fallbacks', desc: 'Automatic retries and model fallbacks for 99.99% uptime.' },
  { icon: <Layers className="w-6 h-6 text-secondary" />, title: 'Unified API', desc: 'One standardized API for OpenAI, Anthropic, Google, and more.' },
];

export const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Particles */}
      <Particles />

      {/* Navigation (Simplified) */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-white">
          Omni<span className="text-primary">AI</span>
        </div>
        <Link to="/app" className="px-6 py-2 text-sm font-medium transition-all border rounded-full border-primary/50 text-primary hover:bg-primary/10">
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm border rounded-full text-primary border-primary/30 bg-primary/5">
            <span className="flex w-2 h-2 mr-2 rounded-full bg-primary animate-pulse"></span>
            OmniAI OS 2.0 is now available
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Gateway</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-400 md:text-xl">
            Unify all your LLM providers under one powerful API. Manage costs, ensure reliability, and scale your AI applications with unprecedented visibility.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/app" className="inline-block px-8 py-4 text-lg font-bold text-background transition-all rounded-full bg-primary hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              Start Building Free
            </Link>
            <button className="px-8 py-4 text-lg font-bold transition-all border rounded-full border-white/20 hover:bg-white/5">
              Read Documentation
            </button>
          </div>
        </motion.div>
      </main>

      {/* Stats Section */}
      <section className="relative z-10 py-20 border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl text-primary"><Counter end={8} />+</div>
            <div className="mt-2 text-gray-400 uppercase tracking-widest text-sm">AI Providers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl text-white"><Counter end={10} suffix="k+" /></div>
            <div className="mt-2 text-gray-400 uppercase tracking-widest text-sm">Requests Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold md:text-5xl text-secondary"><Counter end={99} suffix=".99%" /></div>
            <div className="mt-2 text-gray-400 uppercase tracking-widest text-sm">Uptime SLA</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">Everything you need to <span className="text-primary">scale</span></h2>
          <p className="mt-4 text-gray-400">Architected for enterprise-grade AI applications.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 transition-all border rounded-2xl border-white/10 bg-card hover:bg-white/5 hover:border-primary/50 group"
            >
              <div className="mb-4 p-3 rounded-lg bg-white/5 inline-block group-hover:bg-primary/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer (Simplified) */}
      <footer className="relative z-10 py-8 text-center border-t border-white/10 text-gray-500">
        <p>&copy; 2026 OmniAI Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};
