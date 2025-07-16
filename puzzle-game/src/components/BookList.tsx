import React from 'react';
import BookCard from './BookCard';
import { LoadingSpinner } from './ui/loading-spinner';
import { Book } from '@/types/book';
import "../styles/style.css"

interface BookListProps {
  books: Book[];
  onBookClick?: (book: Book) => void;
  isSearching?: boolean;
  showInitialPrompt?: boolean;
}

const BookList = ({ books, onBookClick, isSearching, showInitialPrompt }: BookListProps) => {
  if (isSearching) {
    return (
      <div className="loading flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-300 mt-2">Iščem knjige...</p>
        </div>
      </div>
    )
  }
  else if (showInitialPrompt) {
    return (
      <div className="text-center md:py-12 py-5">
          <div className="text-gray-400 text-lg mb-2">Vnesite ime knjige ali avtorja</div>
          <div className="text-gray-500 text-sm">Začnite z iskanjem</div>
        <img
          src="/jigsaw-puzzle-774055.svg"
          alt="Search Icon"
          className="lg:mt-16 mt-12 mx-auto w-50 h-50 lg:w-70 lg:h-70"
        />
      </div>
    );
  }
  else if (!isSearching && books.length <= 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">Ni najdenih knjig</div>
        <div className="text-gray-500 text-sm">Poskusite z drugim iskanjem</div>
      </div>
    );
  }

  return (
    <div className="book-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => onBookClick?.(book)}
        />
      ))}
    </div>
  );
};

export default BookList;