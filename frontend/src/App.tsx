import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Landing } from './pages/Landing';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { ProvidersPage } from './pages/dashboard/ProvidersPage';
import { ModelsPage } from './pages/dashboard/ModelsPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { CostsPage } from './pages/dashboard/CostsPage';
import { ActivityPage } from './pages/dashboard/ActivityPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

// Component to handle route animations
const AnimatedOutlet = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <AnimatedOutlet />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: 'providers', element: <ProvidersPage /> },
          { path: 'models', element: <ModelsPage /> },
          { path: 'analytics', element: <AnalyticsPage /> },
          { path: 'costs', element: <CostsPage /> },
          { path: 'activity', element: <ActivityPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
