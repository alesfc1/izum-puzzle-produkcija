"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ScoreDisplay } from './ScoreDisplay';
import { ScoreResult } from '@/utils/scoringSystem';
import { Difficulty } from '@/types/difficulty';
import { useIsMobile } from '@/hooks/use-mobile';
import { Book } from '@/types/book';
import { BookInfo } from './BookInfo';
import "../styles/style.css";

interface Props {
    gameResult: ScoreResult;
    onBackToSelection: () => void;
    onBackToSearch: () => void;
    difficulty: Difficulty;
    completionTime: number;
    book: Book;
    onOpenCobiss: (id: string) => void;
}

export default function GameCompleteView({ gameResult, onBackToSelection, onBackToSearch, difficulty, completionTime, book, onOpenCobiss }: Props) {
    const isMobile = useIsMobile();

    return (
        <div className="w-full">
            <Card className="shadow-lg border-2 border-gray-700 bg-gray-800 w-full">
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-center text-2xl md:text-3xl text-gray-100 flex items-center justify-center gap-2">
                        <span className="text-2xl">🎉 Čestitke! 🎉</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-6 px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-6">
                            <ScoreDisplay
                                scoreResult={gameResult!}
                                completionTime={completionTime}
                                rows={difficulty.rows}
                                cols={difficulty.cols}
                            />
                        </div>
                        <div className="space-y-6 w-full">
                            <div className="relative flex justify-center max-w-[220px] aspect-[2/3] mx-auto group overflow-hidden rounded-md">
                                <Image
                                    src={book.coverUrl}
                                    alt={book.title}
                                    fill
                                    className="object-cover rounded-md shadow-md transform-gpu will-change-transform transition-all duration-300 ease-out group-hover:scale-105 cursor-pointer"
                                    onClick={() => onOpenCobiss(book.id)}
                                />
                                <div
                                    className="absolute bottom-3 right-3 bg-gray-800/90 hover:bg-gray-700/90 text-white px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer backdrop-blur-sm hover:backdrop-blur transition-all duration-200 flex items-center shadow-sm hover:shadow"
                                    onClick={() => onOpenCobiss(book.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    COBISS
                                </div>
                            </div>

                            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 text-gray-200 w-full">
                                <BookInfo book={book} />
                            </div>
                        </div>
                    </div>
                    <div className="pt-5 sm:pt-10 pb-6 px-6">
                        <div className="flex sm:flex-row flex-col md:gap-13 gap-5 w-full">
                            <Button
                                onClick={onBackToSelection}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-5 rounded-xl shadow-md justify-center text-base flex-1 transition-transform duration-300 hover:scale-105"
                                size="lg"
                            >
                                Igraj ponovno
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onBackToSearch}
                                className="bg-white hover:bg-gray-300 text-gray-800 border-gray-300 hover:border-gray-400 text-base py-5 font-medium rounded-xl flex-1 transition-transform duration-300 hover:scale-105"
                                size="lg"
                            >
                                Nazaj
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}