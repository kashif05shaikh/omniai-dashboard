import { Outlet, useNavigation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Particles } from '../ui/Particles';
import { Skeleton } from '../ui/Skeleton';

export const DashboardLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden">
      <Particles />
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-3 gap-6">
                <Skeleton className="h-64 col-span-2" />
                <Skeleton className="h-64" />
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};
