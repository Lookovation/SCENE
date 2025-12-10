import React from 'react';
import { Menu, User, BookOpen, MonitorPlay } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, onBack }) => {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50 flex flex-col shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              <BookOpen size={18} />
            </div>
          )}
          <h1 className="font-bold text-gray-900 text-lg truncate">
            {title || "BooksToReel"}
          </h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Menu size={24} className="text-gray-600" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24">
        {children}
      </main>

      {/* Footer Navigation (only on home for MVP) */}
      {!onBack && (
        <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-40">
          <NavItem icon={<BookOpen size={24} />} label="Home" active />
          <NavItem icon={<MonitorPlay size={24} />} label="My Reels" />
          <NavItem icon={<User size={24} />} label="Profile" />
        </nav>
      )}
    </div>
  );
};

const NavItem: React.FC<{icon: React.ReactNode, label: string, active?: boolean}> = ({icon, label, active}) => (
  <div className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600' : 'text-gray-400'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);