import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { mockProviders } from '../../lib/mockData';
import { User, Key, Bell, Palette, Plus, Trash2 } from 'lucide-react';

const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
  <div onClick={onChange} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative flex items-center ${enabled ? 'bg-primary' : 'bg-white/10 border border-white/20'}`}>
    <motion.div layout className={`bg-white w-4 h-4 rounded-full shadow-sm ${enabled ? '' : 'bg-gray-400'}`} animate={{ x: enabled ? 24 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
  </div>
);

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({ budget: true, errors: true, weekly: false });
  const [theme, setTheme] = useState(true); // true = dark/cyber
  
  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'apikeys', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-gray-400">Manage your workspace preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-card border border-white/5 rounded-2xl p-6 min-h-[400px]">
              
              {activeTab === 'account' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-xl">
                  <h3 className="text-xl font-bold border-b border-white/10 pb-4 mb-6">Account Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Workspace Name</label>
                      <input type="text" defaultValue="OmniAI Production" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary/50 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                      <input type="email" defaultValue="admin@omniai.dev" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary/50 focus:outline-none transition-colors" />
                    </div>
                    <button className="px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors mt-4">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'apikeys' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <h3 className="text-xl font-bold">Provider API Keys</h3>
                    <button className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/10">
                      <Plus size={14} /> Add Provider
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockProviders.slice(0,4).map(provider => (
                      <div key={provider.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10" style={{ backgroundColor: `${provider.color}15`, color: provider.color }}>
                            {provider.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold">{provider.name}</p>
                            <p className="text-xs text-gray-500 font-mono">sk-••••••••••••{Math.floor(Math.random()*9000)+1000}</p>
                          </div>
                        </div>
                        <button className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/5">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-xl">
                  <h3 className="text-xl font-bold border-b border-white/10 pb-4 mb-6">Alerts & Notifications</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Budget Alerts</p>
                        <p className="text-sm text-gray-400">Get notified when spend exceeds 80% of limit.</p>
                      </div>
                      <Toggle enabled={notifications.budget} onChange={() => setNotifications(s => ({...s, budget: !s.budget}))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Routing Errors</p>
                        <p className="text-sm text-gray-400">Instant alerts when fallback models are engaged.</p>
                      </div>
                      <Toggle enabled={notifications.errors} onChange={() => setNotifications(s => ({...s, errors: !s.errors}))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Summary</p>
                        <p className="text-sm text-gray-400">Receive a weekly token & cost report via email.</p>
                      </div>
                      <Toggle enabled={notifications.weekly} onChange={() => setNotifications(s => ({...s, weekly: !s.weekly}))} />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'appearance' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-xl">
                  <h3 className="text-xl font-bold border-b border-white/10 pb-4 mb-6">Theme Preferences</h3>
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div>
                      <p className="font-medium flex items-center gap-2">Cyberglass Mode <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30 uppercase">Default</span></p>
                      <p className="text-sm text-gray-400 mt-1">Dark theme with neon accents and particle effects.</p>
                    </div>
                    <Toggle enabled={theme} onChange={() => setTheme(!theme)} />
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
