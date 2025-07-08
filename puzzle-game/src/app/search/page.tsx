"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import BookList from "@/components/BookList";
import { useToast } from "@/components/ui/use-toast";
import bookData from "../../../db/essential_book_data.json";
import { Book } from "@/types/book";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Upravljanje iskalnega izraza
  const [books, setBooks] = useState<Book[]>([]); // Knjige iz API-ja
  const [isSearching, setIsSearching] = useState(false); // Stanje iskanja
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [bookSelection, setBookSelection] = useState(true);
  const [cobissBooks, setCobissBooks] = useState<Book[]>([]);
  const { toast } = useToast();

// Sample books data from local JSON file
let id = 1;
const sampleBooks: Book[] = bookData.map((book) => ({
    id: (id++).toString(),
    title: book.title,
    author: book.author,
    coverUrl: book.cover_url,
  }));

  // Prioritize COBISS results, fallback to local books when no search
  const allBooks = cobissBooks.length > 0 ? cobissBooks : sampleBooks;
  const filteredBooks = allBooks.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

 // Function to search COBISS and convert results to Book format
 const handleCobissSearch = async (query: string) => {
    setIsSearching(true);
    try{
      const cobissData = await searchCobiss(query);
    
      const items = cobissData?.value?.searchItems || [];
      const convertedBooks: Book[] = items.map((item, index) => ({
        id: (item.id || index).toString(),
        title: item.primary || 'Unknown Title',
        author: item.secondary || 'Unknown Author', 
        coverUrl: item.coverUrl || '/placeholder-book-cover.svg',
      }));
      setCobissBooks(convertedBooks);
    } catch (error) {
        console.error("Error fetching COBISS data:", error);
        toast({
            title: "Napaka pri iskanju",
            description: "Prišlo je do napake pri pridobivanju podatkov iz COBISS."
        });
    } finally {
      setIsSearching(false);
    }
  };

  interface CobissResponse {
    value?: {
      searchItems: {
        id?: number;
        primary?: string;
        secondary?: string;
        coverUrl?: string;
      }[];
    };
  }

  // COBISS API function
  const searchCobiss = async (query: string): Promise<CobissResponse> => {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data);
    return {
      ...data,
      value: {
        ...data.value,
        searchItems: data.value.searchItems.filter((i: { coverUrl?: string | null }) => i.coverUrl)
      }
    };
  };

  const handleBookSelect = (book: Book) => {
    setCurrentBook(book);
    setBookSelection(false);
    setGameStarted(false);
    setGameCompleted(false);
  };

  // Clear COBISS results when search term is empty
    useEffect(() => {
      if (searchTerm.trim() === '') {
        setCobissBooks([]);
      }
    }, [searchTerm]);
  
    // Debounced COBISS search
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (searchTerm.trim().length > 2) {
          handleCobissSearch(searchTerm);
        }
      }, 500); // 500ms delay
  
      return () => clearTimeout(timeoutId);
    }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl">
        <SearchBar onSearch={setSearchTerm} />
        <BookList
          books={filteredBooks}
          onBookClick={handleBookSelect}
          isSearching={isSearching}
        />
      </div>
    </div>
  );
}