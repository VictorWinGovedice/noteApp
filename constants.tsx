import { Note } from './types';

export const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: 'V12 Booking',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id blandit augue. Maecenas eu consequat nisl. Sed bibendum cursus nunc id varius. Mauris fringilla sed neque vitae ultrices. Morbi bibendum cursus nunc id varius. Mauris fringilla sed neque vitae ultrices.',
    tags: [
      'Travel', 'Paris', 'London', 'Miami', 'Roma',
      'Hotel', 'Experience', 'Dinner', 'Food'
    ],
    lastEdited: Date.now() - 180000, // 3 mins ago
    isArchived: false,
  },
  {
    id: '2',
    title: 'Dinner at Le Meurice',
    content: 'The experience was amazing. The food was top-notch and the service was impeccable.',
    tags: ['Paris', 'Dinner', 'Food'],
    lastEdited: Date.now() - 3600000, // 1 hour ago
    isArchived: false,
  },
  {
    id: '3',
    title: 'London Trip Planning',
    content: 'Need to book tickets for the London Eye and visit the British Museum.',
    tags: ['London', 'Travel'],
    lastEdited: Date.now() - 86400000, // 1 day ago
    isArchived: false,
  }
];

export const AVAILABLE_TAGS = [
  'Travel', 'Paris', 'London', 'Miami', 'Roma',
  'Hotel', 'Experience', 'Dinner', 'Food'
];
