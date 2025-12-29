import React from 'react';
import { Plus, Inbox, Tag as TagIcon } from 'lucide-react';
import { Note } from '../../types';

interface NotesListProps {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNoteId: (id: string) => void;
  onCreateNote: () => void;
  formatTime: (ts: number) => string;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes, activeNoteId, setActiveNoteId, onCreateNote, formatTime
}) => {
  return (
    <section className="w-80 border-r border-gray-200 flex flex-col bg-white shrink-0">
      <div className="p-4 border-b border-gray-200">
        <button 
          onClick={onCreateNote}
          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-black py-2 rounded-md font-bold hover:bg-gray-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <Plus size={18} /> Create new note
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Inbox className="mx-auto mb-2 opacity-20" size={32} />
            <p className="text-sm">No notes found</p>
          </div>
        ) : (
          notes.map(note => (
            <button
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`w-full text-left p-4 border-b border-gray-100 transition-colors ${activeNoteId === note.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
            >
              <h3 className="font-bold text-sm mb-1 truncate">{note.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {note.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                    <TagIcon size={10} /> {tag}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">{formatTime(note.lastEdited)}</span>
            </button>
          ))
        )}
      </div>
    </section>
  );
};