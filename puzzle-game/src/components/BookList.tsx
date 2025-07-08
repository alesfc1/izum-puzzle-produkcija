import React from 'react';
import BookCard from './BookCard';
import {LoadingSpinner} from './ui/loading-spinner';

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

interface BookListProps {
  books: Book[];
  onBookClick?: (book: Book) => void;
  isSearching?: boolean;
}

const BookList = ({ books, onBookClick, isSearching }: BookListProps) => {
  if (isSearching) {
    return (
      <div className="text-center mb-4">
        <LoadingSpinner />
        <p className="text-gray-300 mt-2">Iščem knjige...</p>
      </div>
    )
  }
  else if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">Ni najdenih knjig</div>
        <div className="text-gray-500 text-sm">Poskusite z drugim iskanjem</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
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