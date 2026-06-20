import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Network, Cpu, BarChart3, DollarSign, Activity, Settings, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/app', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/app/providers', icon: Network, label: 'Providers' },
  { path: '/app/models', icon: Cpu, label: 'Models' },
  { path: '/app/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/app/costs', icon: DollarSign, label: 'Costs' },
  { path: '/app/activity', icon: Activity, label: 'Activity' },
  { path: '/app/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-6 left-4 z-50 p-2 bg-card border border-white/10 rounded-lg text-white"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260, x: mobileOpen ? 0 : (window.innerWidth < 768 ? -260 : 0) }}
        className={`fixed md:relative flex flex-col h-screen bg-black/80 md:bg-black/40 backdrop-blur-xl border-r border-white/10 z-50 md:z-20 transition-transform duration-300 md:transition-none`}
      >
        <div className="flex items-center justify-between p-6">
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold tracking-tighter text-white">
              Omni<span className="text-primary">AI</span>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-full text-center text-primary font-bold">O</div>
          )}
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block absolute -right-3 top-7 bg-card border border-white/20 rounded-full p-1 hover:bg-white/10"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          
          {/* Mobile Close */}
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              onClick={() => window.innerWidth < 768 && setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`
              }
            >
              <item.icon size={22} className="min-w-[22px]" />
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-nowrap">
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
};
