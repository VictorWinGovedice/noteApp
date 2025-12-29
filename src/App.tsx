import React, { useState, useMemo } from 'react';
import { Archive, Trash2 } from 'lucide-react';
import { Note, ViewType } from '../types';
import { INITIAL_NOTES } from '../constants';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { NotesList } from './components/NotesList';
import { Editor } from './components/Editor';

const App: React.FC = () => {
  // --- Estados Principais ---
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(INITIAL_NOTES[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<ViewType>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Lógica de Dados (Memoizada para performance) ---
  const activeNote = useMemo(() => 
    notes.find(n => n.id === activeNoteId) || null
  , [notes, activeNoteId]);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesArchive = currentView === 'archived' ? note.isArchived : !note.isArchived;
      const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;
      
      return matchesSearch && matchesArchive && matchesTag;
    });
  }, [notes, searchQuery, currentView, selectedTag]);

  // --- Handlers (Ações) ---
  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      tags: [],
      lastEdited: Date.now(),
      isArchived: false,
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setCurrentView('all');
    setSelectedTag(null);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(n => 
      n.id === id ? { ...n, ...updates, lastEdited: Date.now() } : n
    ));
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(n => n.id !== id));
      setActiveNoteId(null);
    }
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="flex h-[100dvh] w-full bg-white overflow-hidden text-gray-800 selection:bg-black selection:text-white">
      
      {/* 1. Sidebar de Navegação (Mobile Drawer + Desktop Sidebar) */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen}
        currentView={currentView} 
        setCurrentView={setCurrentView}
        selectedTag={selectedTag} 
        setSelectedTag={setSelectedTag}
      />

      <div className="flex flex-1 flex-col overflow-hidden w-full">
        
        {/* 2. Header Superior */}
        <Header 
          currentView={currentView} 
          selectedTag={selectedTag}
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="flex flex-1 overflow-hidden relative">
          
          {/* 3. Lista de Notas (Oculta no mobile quando uma nota está aberta) */}
          <div className={`
            ${activeNoteId ? 'hidden lg:flex' : 'flex'} 
            w-full lg:w-80 shrink-0 border-r border-gray-200 bg-white
          `}>
            <NotesList 
              notes={filteredNotes} 
              activeNoteId={activeNoteId}
              setActiveNoteId={setActiveNoteId} 
              onCreateNote={handleCreateNote}
              formatTime={formatTime}
            />
          </div>

          {/* 4. Editor de Conteúdo (Ocupa a tela cheia no mobile se nota ativa) */}
          <Editor 
            note={activeNote} 
            onUpdate={handleUpdateNote} 
            onBack={() => setActiveNoteId(null)} 
            formatTime={formatTime} 
          />

          {/* 5. Sidebar de Ações (Apenas Desktop XL) */}
          <aside className="w-64 border-l border-gray-200 p-6 hidden xl:block bg-white">
            {activeNote && (
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-left">Actions</h3>
                
                <button 
                  onClick={() => handleUpdateNote(activeNote.id, { isArchived: !activeNote.isArchived })}
                  className="w-full text-left py-2 px-4 border border-gray-200 rounded-md font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 bg-white text-gray-700"
                >
                  <Archive size={16} /> 
                  {activeNote.isArchived ? 'Restore note' : 'Archive note'}
                </button>

                <button 
                  onClick={() => handleDeleteNote(activeNote.id)}
                  className="w-full text-left py-2 px-4 border border-gray-200 rounded-md font-bold text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 bg-white"
                >
                  <Trash2 size={16} /> 
                  Delete note
                </button>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
};

export default App;