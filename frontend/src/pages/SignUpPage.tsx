import { SignUp } from '@clerk/clerk-react';
import { Particles } from '../components/ui/Particles';
import { Link } from 'react-router-dom';

export const SignUpPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Particles */}
      <Particles />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          Omni<span className="text-primary">AI</span>
        </Link>
        <Link to="/sign-in" className="px-6 py-2 text-sm font-medium transition-all border rounded-full border-primary/50 text-primary hover:bg-primary/10">
          Sign In
        </Link>
      </nav>

      {/* Sign Up Section */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md px-4">
          <div className="p-8 rounded-2xl border border-white/10 bg-card backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400">Join OmniAI and start managing your AI infrastructure</p>
            </div>

            {/* Clerk Sign Up Component */}
            <SignUp
              appearance={{
                baseTheme: undefined,
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-transparent border-0 shadow-none',
                  headerTitle: 'text-white text-3xl font-bold',
                  headerSubtitle: 'text-gray-400',
                  socialButtonsBlockButton: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors rounded-lg h-10',
                  socialButtonsBlockButtonText: 'text-sm font-medium',
                  formFieldInput: 'bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg h-10 focus:border-secondary focus:ring-1 focus:ring-secondary',
                  formFieldLabel: 'text-gray-300 text-sm font-medium',
                  formFieldInputShowPasswordButton: 'text-gray-400 hover:text-secondary',
                  formButtonPrimary: 'bg-gradient-to-r from-secondary to-primary text-white font-bold rounded-lg h-10 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all',
                  footerActionLink: 'text-primary hover:text-secondary transition-colors',
                  dividerLine: 'bg-white/10',
                  dividerText: 'text-gray-400',
                  alternativeMethods: 'mt-6',
                },
                variables: {
                  colorPrimary: '#ff0055',
                  colorText: '#ffffff',
                  colorTextSecondary: '#9ca3af',
                  colorBackground: 'transparent',
                  colorInputBackground: 'rgba(255, 255, 255, 0.05)',
                  colorInputText: '#ffffff',
                },
              }}
              redirectUrl="/app"
            />
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-400 hover:text-secondary transition-colors text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-20"></div>
    </div>
  );
};