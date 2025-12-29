import React from 'react';
import { Menu, Search, Globe } from 'lucide-react';
import { ViewType } from '../../types';

interface HeaderProps {
  currentView: ViewType;
  selectedTag: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, selectedTag, searchQuery, setSearchQuery, onMenuClick 
}) => {
  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 bg-white shrink-0">
      <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md">
          <Menu size={20} />
        </button>
        <h2 className="text-base lg:text-lg font-bold truncate">
          {selectedTag ? `Tag: ${selectedTag}` : currentView === 'all' ? 'All Notes' : 'Archived'}
        </h2>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 w-32 sm:w-48 lg:w-64 text-sm bg-gray-50 lg:bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full text-gray-500">
          <Globe size={18} />
        </button>
      </div>
    </header>
  );
};