
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastEdited: number;
  isArchived: boolean;
}

export type ViewType = 'all' | 'archived' | 'tag';

export interface AppState {
  notes: Note[];
  activeNoteId: string | null;
  searchQuery: string;
  currentView: ViewType;
  selectedTag: string | null;
}
