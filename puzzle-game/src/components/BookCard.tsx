import React from 'react';
import { Book } from '@/types/book';
import "../styles/style.css";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <div 
      className="book-card bg-slate-700/50 rounded-xl p-4 border border-slate-600 hover:border-blue-500 transition-all duration-200 cursor-pointer group hover:bg-slate-700/70"
      onClick={onClick}
    >
      <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-purple-600 relative">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;