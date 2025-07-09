"use client"

import React from 'react';
import Image from 'next/image';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScoreDisplay } from './ScoreDisplay';
import { ScoreResult } from '@/utils/scoringSystem';
import { Difficulty } from '@/types/difficulty';
import { useIsMobile } from '@/hooks/use-mobile';
import { Book } from '@/types/book';

interface Props {
    gameResult: ScoreResult;
    onBackToSelection: () => void;
    onBackToSearch: () => void;
    difficulty: Difficulty;
    completionTime: number;
    book: Book;
}

export default function GameCompleteView({ gameResult, onBackToSelection, onBackToSearch, difficulty, completionTime, book }: Props) {
    const isMobile = useIsMobile();

    return (
        <div className="bg-gray-900 p-4 flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-6">
                <Card className="bg-gray-800 border-gray-700 shadow-md p-6">
                    <div className="text-center text-white text-2xl mb-4">🎉 Čestitke! 🎉</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                        <div className="flex justify-center">
                            <div className="relative w-full max-w-[220px] aspect-[2/3] group overflow-hidden rounded-md">
                                <Image
                                    src={book.coverUrl}
                                    alt={book.title}
                                    fill
                                    className="object-cover rounded-md shadow-md cursor-pointer"
                                    onClick={() => book.coverUrl && window.open(book.coverUrl, '_blank', 'noopener,noreferrer')}
                                    unoptimized={!book.coverUrl.startsWith('/')}
                                />
                                {book.coverUrl && (
                                    <div
                                        className="absolute bottom-3 right-3 bg-gray-800/90 hover:bg-gray-700/90 text-white px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer flex items-center shadow-sm"
                                        onClick={e => {
                                            e.stopPropagation();
                                            window.open(book.coverUrl, '_blank', 'noopener,noreferrer');
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        COBISS
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-xl font-bold text-gray-100 mb-1">{book.title}</h2>
                            <p className="text-sm text-gray-300 mb-2">{book.author}</p>
                            <p className="text-gray-200 text-sm">{book.description}</p>
                        </div>
                    </div>
                    <ScoreDisplay
                        scoreResult={gameResult!}
                        completionTime={completionTime}
                        rows={difficulty.rows}
                        cols={difficulty.cols}
                    />
                    <div className="pt-2">
                        <div className="flex sm:flex-row gap-3 w-full">
                            <Button
                                onClick={onBackToSelection}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-5 rounded-xl shadow-md w-full sm:w-auto justify-center text-base flex-1 transition-transform duration-300 hover:scale-105"
                                size={isMobile ? "lg" : "default"}
                            >
                                Igraj ponovno
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onBackToSearch}
                                className="bg-white hover:bg-gray-300 text-gray-800 border-gray-300 hover:border-gray-400 text-base px-6 py-5 font-medium rounded-xl flex-1 transition-transform duration-300 hover:scale-105"
                                size="lg"
                            >
                                Nazaj
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}