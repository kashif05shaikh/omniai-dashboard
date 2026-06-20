import { PageTransition } from '../../components/ui/PageTransition';

export const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-primary text-2xl font-bold">
          {title.charAt(0)}
        </div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 max-w-md">
          This is a placeholder for the {title} module. Functionality will be implemented in a future update.
        </p>
      </div>
    </PageTransition>
  );
};
