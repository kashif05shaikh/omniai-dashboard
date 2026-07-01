import { Bell, Search, User, LogOut } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useState } from 'react';

export const TopNav = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [showSignOut, setShowSignOut] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

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

        {/* User Profile Section */}
        <div className="relative">
          <button
            onClick={() => setShowSignOut(!showSignOut)}
            className="flex items-center gap-3 hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
          >
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt={user.firstName || 'User'} 
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                  <User size={16} className="text-gray-300" />
                </div>
              </div>
            )}
            <span className="text-sm font-medium text-white max-w-[150px] truncate">
              {user?.firstName || 'User'}
            </span>
          </button>

          {/* Sign Out Dropdown */}
          {showSignOut && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-white/10 rounded-lg shadow-2xl backdrop-blur-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Account</p>
                <p className="text-sm font-medium text-white mt-1">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
