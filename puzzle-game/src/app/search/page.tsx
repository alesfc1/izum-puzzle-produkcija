"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import BookList from "@/components/BookList";
import { useToast } from "@/components/ui/use-toast";
import { Book } from "@/types/book";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Upravljanje iskalnega izraza
  const [books, setBooks] = useState<Book[]>([]); // Knjige iz API-ja
  const [isSearching, setIsSearching] = useState(false); // Stanje iskanja
  const [hasSearched, setHasSearched] = useState(false); // Ali je uporabnik že iskal
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [bookSelection, setBookSelection] = useState(true);
  const [cobissBooks, setCobissBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  /* Sample books data from local JSON file
  const sampleBooks: Book[] = bookData.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    coverUrl: book.cover_url,
  })); */

  // Book list can be empty initially;
  const filteredBooks = cobissBooks.length !== 0
    ? cobissBooks.filter((book: Book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // Function to search COBISS and convert results to Book format
  const handleCobissSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const cobissData = await searchCobiss(query);

      const items = cobissData?.value?.searchItems || [];
      const convertedBooks: Book[] = items.map((item, index) => ({
        id: (item.id || index).toString(),
        title: item.primary || 'No title',
        author: item.secondary || 'No author',
        coverUrl: item.coverUrl || 'No cover url',
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
    if (book.coverUrl === 'No cover url' || book.title === 'No title' || book.author === 'No author') {
      toast({
        title: "Napaka",
        description: "Izbrana knjiga nima vseh potrebnih podatkov."
      });
    } else {
      setCurrentBook(book);
      setBookSelection(false);
      setGameStarted(false);
      setGameCompleted(false);
      window.location.href = `/game/${book.id}`;
    }
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

  // Handle search term change
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!hasSearched && value.trim() !== "") {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl">
        <SearchBar onSearch={handleSearch} />
        <BookList
          books={filteredBooks}
          onBookClick={handleBookSelect}
          isSearching={isSearching}
          showInitialPrompt={!hasSearched}
        />
      </div>
    </div>
  );
}