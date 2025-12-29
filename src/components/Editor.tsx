import React from 'react';
import { Tag as TagIcon, Clock, Inbox, ChevronLeft } from 'lucide-react';
import { Note } from '../../types';

interface EditorProps {
  note: Note | null;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onBack?: () => void; // Função para fechar a nota no mobile
  formatTime: (ts: number) => string;
}

export const Editor: React.FC<EditorProps> = ({ note, onUpdate, onBack, formatTime }) => {
  if (!note) {
    return (
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center text-gray-400 bg-white">
        <Inbox size={64} className="mb-4 opacity-10" />
        <p>Select a note to view or edit</p>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 z-40 lg:relative lg:inset-auto flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header do Editor Mobile */}
      <div className="lg:hidden flex items-center p-4 border-b border-gray-100">
        <button onClick={onBack} className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <ChevronLeft size={20} /> Back
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 lg:p-12 max-w-4xl mx-auto w-full">
        <input 
          type="text"
          value={note.title}
          onChange={(e) => onUpdate(note.id, { title: e.target.value })}
          className="text-2xl lg:text-4xl font-bold w-full mb-6 focus:outline-none placeholder:text-gray-200 text-gray-900 bg-transparent"
          placeholder="Note Title"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 w-20 shrink-0 font-medium"><TagIcon size={14} /> Tags</span>
            <div className="flex flex-wrap gap-1">
              {note.tags.length > 0 ? note.tags.map(t => (
                <span key={t} className="px-2 py-0.5 bg-gray-100 rounded text-[10px]">{t}</span>
              )) : <span className="italic text-[10px]">No tags</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 w-20 shrink-0 font-medium"><Clock size={14} /> Edited</span>
            <span className="text-[11px]">{formatTime(note.lastEdited)}</span>
          </div>
        </div>

        <textarea 
          value={note.content}
          onChange={(e) => onUpdate(note.id, { content: e.target.value })}
          className="w-full flex-1 resize-none focus:outline-none text-gray-700 leading-relaxed min-h-[50vh] text-base lg:text-lg bg-transparent"
          placeholder="Start writing..."
        />
      </div>
    </main>
  );
};