'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PuzzleGame } from '@/components/PuzzleGame';
import { BookInfo } from '@/components/BookInfo';
import { DifficultySelector } from '@/components/DifficultySelector';
import { ScoreDisplay } from '@/components/ScoreDisplay';

import { BookCover } from '@/types/book';
import { useIsMobile } from '@/hooks/use-mobile';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from "@/components/ui/use-toast";
import { AppHeader } from '@/components/AppHeader';
import bookData from '../../db/essential_book_data.json';
import { ScoreResult } from '@/utils/scoringSystem';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';

// COBISS API function
const searchCobiss = async (query: string): Promise<any> => {
  const url = `https://plusbeta.cobiss.net/cobiss/api/si/sl/search/cobib?q=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("COBISS fetch error:", error);
    throw error;
  }
};

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

// Sample books data from local JSON file
const sampleBooks: Book[] = bookData.map((book, index) => ({
  id: index + 1,
  title: book.title,
  author: book.author,
  coverUrl: book.cover_url,
}));

export default function Home() {
  return <Page />;
}

type Difficulty = {
  cols: number;
  rows: number;
  label: string;
};

const DIFFICULTIES: Difficulty[] = [
  { cols: 2, rows: 2, label: "2×2 (Zelo lahko)" },
  { cols: 2, rows: 3, label: "2×3 (Lahko)" },
  { cols: 3, rows: 3, label: "3×3 (Srednje)" },
  { cols: 3, rows: 4, label: "3×4 (Težje)" },
  { cols: 4, rows: 4, label: "4×4 (Težko)" },
  { cols: 4, rows: 5, label: "4×5 (Zelo težko)" },
];

const Page = () => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [finalScore, setFinalScore] = useState<ScoreResult | null>(null);
  const [completionTime, setCompletionTime] = useState(0);
  const [bookSelection, setBookSelection] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cobissBooks, setCobissBooks] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showCobissResults, setShowCobissResults] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Prioritize COBISS results, fallback to local books when no search
  const allBooks = cobissBooks.length > 0 ? cobissBooks : sampleBooks;
  const filteredBooks = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to search COBISS and convert results to Book format
  const handleCobissSearch = async (query: string) => {
    if (!query.trim()) {
      setCobissBooks([]);
      return;
    }

    setIsSearching(true);
    try {
      const cobissData = await searchCobiss(query);
      // Pravilna pretvorba glede na COBISS API odgovor
      const items = cobissData?.value?.searchItems || [];
      const convertedBooks: Book[] = items.map((item: any, index: number) => ({
        id: item.id || index,
        title: item.primary || 'Unknown Title',
        author: item.secondary || 'Unknown Author',
        coverUrl: item.coverUrl || '/placeholder-book-cover.svg',
      }));
      setCobissBooks(convertedBooks);
      toast({
        title: "COBISS Search",
        description: `Found ${convertedBooks.length} books`,
      });
    } catch (error) {
      console.error('COBISS search failed:', error);
      toast({
        title: "Search Error", 
        description: "Failed to search COBISS database",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookSelect = (book: Book) => {
    setCurrentBook(book);
    setBookSelection(false);
    setGameStarted(false);
    setGameCompleted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameCompleted(false);
    toast({
      title: "Nova igra",
      description: `${selectedDifficulty.label}`,
    });
  };

  const handleGameComplete = (scoreResult: ScoreResult, gameTime: number) => {
    setGameCompleted(true);
    setFinalScore(scoreResult);
    setCompletionTime(gameTime);
    toast({
      title: "Čestitamo!",
      description: `${scoreResult.points} od ${scoreResult.maxPoints} točk`,
    });
  };

  const playAgain = () => {
    setGameStarted(false);
    setGameCompleted(false);
  };

  const goBackToSelection = () => {
    setBookSelection(true);
    setCurrentBook(null);
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

  // Load initial COBISS data on component mount
  useEffect(() => {
    handleCobissSearch('tiha')//default search term
  }, []);

  if (bookSelection) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center justify-start">
        <AppHeader />
        <div className="w-full max-w-4xl">
          <SearchBar onSearch={setSearchTerm} />
          {isSearching && (
            <div className="text-center mb-4">
              <LoadingSpinner />
              <p className="text-gray-300 mt-2">Searching COBISS database...</p>
            </div>
          )}
          {cobissBooks.length > 0 && !isSearching && (
            <div className="mb-4 text-center">
              <p className="text-gray-300">
                Showing books from COBISS database. Search for specific books above.
              </p>
            </div>
          )}
          {cobissBooks.length === 0 && !isSearching && searchTerm.trim() === '' && (
            <div className="mb-4 text-center">
              <p className="text-gray-300">
                Showing local books. Start typing to search COBISS database.
              </p>
            </div>
          )}
          <BookList books={filteredBooks} onBookClick={handleBookSelect} />
        </div>
      </div>
    );
  }

  if (!gameStarted && currentBook) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center justify-start">
        <AppHeader />
        <div className="w-full max-w-4xl mt-6">
          <Card className="shadow-lg border-2 border-gray-700 bg-gray-800 w-full">
            <CardContent className="py-12 px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex justify-center">
                  <Image
                    src={currentBook.coverUrl}
                    alt={currentBook.title}
                    width={250}
                    height={380}
                    className="rounded-md shadow-md object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-100">{currentBook.title}</h2>
                  <p className="text-sm text-gray-300">{currentBook.author}</p>
                  <DifficultySelector
                    difficulties={DIFFICULTIES}
                    selected={selectedDifficulty}
                    onChange={setSelectedDifficulty}
                  />
                  <div className="pt-2">
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <Button
                        onClick={startGame}
                        disabled={!currentBook}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base py-5 flex-1 shadow-sm hover:shadow-md transition-all duration-200 ease-out font-medium tracking-wide rounded-xl transition-transform duration-300"
                        size="lg"
                      >
                        Začni igro
                      </Button>
                      <Button variant="outline" onClick={goBackToSelection} className="bg-white hover:bg-gray-300 text-gray-800 border-gray-300 hover:border-gray-400 text-base py-5 flex-1 shadow-sm hover:shadow-md transition-all duration-200 ease-out font-medium tracking-wide rounded-xl" size="lg">Nazaj</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameStarted && currentBook && !gameCompleted) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
        <AppHeader />
        <div className="w-full max-w-4xl">
          <PuzzleGame
            imageSrc={currentBook.coverUrl}
            rows={selectedDifficulty.rows}
            cols={selectedDifficulty.cols}
            onComplete={handleGameComplete}
          />
          <div className="text-center mt-6">
            <Button variant="outline" onClick={goBackToSelection}>Nazaj na izbiro knjige</Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameCompleted && currentBook && finalScore) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
        <AppHeader />
        <div className="w-full max-w-4xl space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-md p-6">
            <div className="text-center text-white text-2xl mb-4">🎉 Čestitke! 🎉</div>
            <ScoreDisplay
              scoreResult={finalScore!}
              completionTime={completionTime}
              rows={selectedDifficulty.rows}
              cols={selectedDifficulty.cols}
            />
            <div className="pt-2">
              <div className="flex sm:flex-row gap-3 w-full">
                <Button
                  onClick={playAgain}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-5 hover:scale-105 transition-transform duration-300 rounded-xl shadow-md w-full sm:w-auto justify-center text-base"
                  size={isMobile ? "lg" : "default"}
                >
                  Igraj ponovno
                </Button>
                <Button variant="outline" onClick={goBackToSelection} className="bg-white hover:bg-gray-300 text-gray-800 border-gray-300 hover:border-gray-400 text-base py-5 flex-1 shadow-sm hover:shadow-md transition-all duration-200 ease-out font-medium tracking-wide rounded-xl transition-transform duration-300 hover:scale-105" size="lg">Nazaj</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};