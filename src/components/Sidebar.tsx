import React from 'react';
import { Home, Archive, Tag as TagIcon, ChevronRight, X } from 'lucide-react';
import { ViewType } from '../../types';
import { AVAILABLE_TAGS } from '../../constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen, setIsOpen, currentView, setCurrentView, selectedTag, setSelectedTag
}) => {
  return (
    <>
      {/* Overlay para Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-[70] transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-50 border-r border-gray-200 w-72 lg:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center font-serif">N</div>
              NotesApp
            </h1>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-200 rounded-full">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1 mb-8">
            <button 
              onClick={() => { setCurrentView('all'); setSelectedTag(null); setIsOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${currentView === 'all' && !selectedTag ? 'bg-white shadow-sm font-medium border border-gray-100' : 'hover:bg-gray-200 text-gray-600'}`}
            >
              <span className="flex items-center gap-3"><Home size={18} /> All notes</span>
              <ChevronRight size={14} className={currentView === 'all' && !selectedTag ? 'opacity-100' : 'opacity-0'} />
            </button>
            <button 
              onClick={() => { setCurrentView('archived'); setSelectedTag(null); setIsOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${currentView === 'archived' ? 'bg-white shadow-sm font-medium border border-gray-100' : 'hover:bg-gray-200 text-gray-600'}`}
            >
              <span className="flex items-center gap-3"><Archive size={18} /> Archived notes</span>
              <ChevronRight size={14} className={currentView === 'archived' ? 'opacity-100' : 'opacity-0'} />
            </button>
          </nav>

          <div className="flex-1 overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Tags</h3>
            <div className="space-y-1">
              {AVAILABLE_TAGS.map(tag => (
                <button 
                  key={tag}
                  onClick={() => { setSelectedTag(tag); setCurrentView('tag'); setIsOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${selectedTag === tag ? 'bg-white shadow-sm font-medium border border-gray-100' : 'hover:bg-gray-200 text-gray-600'}`}
                >
                  <TagIcon size={16} /> {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};