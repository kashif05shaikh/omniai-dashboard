import { Bell, Search, User } from 'lucide-react';

export const TopNav = () => {
  return (
    <header className="h-20 px-8 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search providers, models, or logs..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full border border-background"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer">
          <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
            <User size={16} className="text-gray-300" />
          </div>
        </div>
      </div>
    </header>
  );
};
