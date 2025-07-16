import React from 'react';
import { Book } from '@/types/book';
import { useState } from 'react';

interface BookInfoProps {
  book: Book | null;
}

export const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!book) return null;

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-xl font-bold text-white">{book.title}</h3>
      
      <div className="space-y-2">
        <div>
          <span className="text-gray-300 font-medium">Avtor: </span>
          <span className="text-white">{book.author}</span>
        </div>
      </div>
      
      {/* Opis */}
      {book.addon02 && (
        <div className="pt-2">
          <button
            className="text-gray-300 underline cursor-pointer"
            onClick={() => setShowDescription(v => !v)}
          >
            {showDescription ? 'Skrij opis' : 'Prikaži opis'}
          </button>
          {showDescription && (
            <div className="mt-2 text-gray-200">{book.addon02}</div>
          )}
        </div>
      )}
    </div>
  );
};
