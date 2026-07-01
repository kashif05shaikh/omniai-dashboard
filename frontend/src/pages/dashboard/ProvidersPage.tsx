import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { Skeleton } from '../../components/ui/Skeleton';
import { getProviders, createProvider } from '../../lib/api';
import { Network, Database, Zap, Clock, Key, X } from 'lucide-react';

interface Provider {
  _id?: string;
  id?: string;
  name: string;
  accountName: string;
  status: 'connected' | 'disconnected';
  color?: string;
  stats?: { requests?: number; totalTokens?: number; cost?: number };
}

const PROVIDER_OPTIONS = [
  { value: 'OpenAI', label: 'OpenAI', color: '#10a37f' },
  { value: 'Claude', label: 'Anthropic Claude', color: '#d97757' },
  { value: 'Gemini', label: 'Google Gemini', color: '#4285f4' },
  { value: 'DeepSeek', label: 'DeepSeek', color: '#4d6bfe' },
  { value: 'Groq', label: 'Groq', color: '#f55036' },
  { value: 'Perplexity', label: 'Perplexity', color: '#22b8cd' },
];

export const ProvidersPage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', accountName: '', apiKey: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProviders();
      setProviders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch providers');
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleAddClick = () => {
    setFormData({ name: '', accountName: '', apiKey: '' });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🔵 [ProvidersPage] handleSubmit called with event:', e);
    e.preventDefault();
    console.log('🔵 [ProvidersPage] preventDefault called, formData:', formData);
    
    if (!formData.name || !formData.accountName || !formData.apiKey) {
      console.warn('🔴 [ProvidersPage] Form validation failed - missing fields:', {
        name: !!formData.name,
        accountName: !!formData.accountName,
        apiKey: !!formData.apiKey,
      });
      alert('Please fill in all required fields');
      return;
    }

    console.log('🟢 [ProvidersPage] Form validation passed, setting isSubmitting=true');
    setIsSubmitting(true);
    
    try {
      const selectedProvider = PROVIDER_OPTIONS.find(p => p.value === formData.name);
      console.log('🟢 [ProvidersPage] About to call createProvider with payload:', {
        name: formData.name,
        accountName: formData.accountName,
        apiKeyRef: formData.apiKey,
        status: 'connected',
        color: selectedProvider?.color || '#00f0ff',
      });
      
      await createProvider({
        name: formData.name,
        accountName: formData.accountName,
        apiKeyRef: formData.apiKey,
        status: 'connected',
        color: selectedProvider?.color || '#00f0ff',
      });
      
      console.log('🟢 [ProvidersPage] createProvider API call succeeded');
      setShowModal(false);
      await fetchProviders();
    } catch (err) {
      console.error('🔴 [ProvidersPage] Error in handleSubmit:', err);
      alert(err instanceof Error ? err.message : 'Failed to add provider');
    } finally {
      console.log('🟢 [ProvidersPage] Finally block, setting isSubmitting=false');
      setIsSubmitting(false);
    }
  };

  const getProviderColor = (name: string) => {
    const colors: { [key: string]: string } = {
      'OpenAI': '#10a37f',
      'Claude': '#d97757',
      'Gemini': '#4285f4',
      'DeepSeek': '#4d6bfe',
      'Groq': '#f55036',
      'Perplexity': '#22b8cd',
    };
    return colors[name] || '#00f0ff';
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Providers</h1>
            <p className="text-gray-400">Manage your connected AI models and accounts</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="px-4 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Key size={16} />
            Add Provider
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-400 font-medium mb-2">Failed to load providers</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && providers.length === 0 && !error && (
          <div className="bg-card border border-white/5 rounded-2xl p-12 text-center">
            <Network size={48} className="mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-bold mb-2">No providers connected yet</h3>
            <p className="text-gray-400 mb-6">Add your first AI provider to get started</p>
            <button 
              onClick={handleAddClick}
              className="px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <Key size={16} />
              Add Provider
            </button>
          </div>
        )}

        {/* Providers Grid */}
        {!loading && providers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {providers.map((provider, i) => {
              const color = provider.color || getProviderColor(provider.name);
              return (
                <motion.div
                  key={provider._id || provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-card border border-white/5 p-5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  {/* Hover Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                    style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10"
                          style={{ backgroundColor: `${color}15`, color: color }}
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
                        <span className="font-medium">{(provider.stats?.requests || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5"><Database size={14} /> Tokens (M)</span>
                        <span className="font-medium">{((provider.stats?.totalTokens || 0) / 1000000).toFixed(2)}M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Est. Cost</span>
                        <span className="font-medium text-secondary">${(provider.stats?.cost || 0).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5">
                      <Clock size={12} /> Last active: N/A
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Provider Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Provider</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Provider *
                </label>
                <select
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="">Select a provider</option>
                  {PROVIDER_OPTIONS.map(option => (
                    <option key={option.value} value={option.value} className="bg-background">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., my-openai-account"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  API Key *
                </label>
                <input
                  type="password"
                  placeholder="Enter your API key"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Your API key will be securely stored</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Adding...' : 'Add Provider'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
};
