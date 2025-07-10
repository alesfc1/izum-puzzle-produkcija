"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DifficultySelector } from "@/components/DifficultySelector";
import { Book } from "@/types/book";
import { Difficulty } from "@/types/difficulty";
import difficulties from "../../db/difficulties.json";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
//import css
import "../styles/style.css";

interface Props {
    currentBook: Book;
    selectedDifficulty: Difficulty;
    setSelectedDifficulty: (difficulty: Difficulty) => void;
    onStart: () => void;
    onBackToSearch: () => void;
    onOpenCobiss: (id: string) => void;
}

const DIFFICULTIES: Difficulty[] = difficulties.map((d) => ({
    cols: d.cols,
    rows: d.rows,
    label: d.label
}));

export default function PreGameView({ currentBook, selectedDifficulty, setSelectedDifficulty, onStart, onBackToSearch, onOpenCobiss }: Props) {
    return (
        <div className="bg-gray-900 p-4 flex flex-col items-center justify-start">
            <div className="w-full max-w-4xl mt-6">

                {currentBook.id != '' ? (
                    <Card className="shadow-lg border-2 border-gray-700 bg-gray-800 w-full">
                        <CardContent className="py-12 px-8 min-h-[300px] min-w-[450px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div className="flex justify-center">
                                    <div className="relative h-[380px] w-[250px] sm:h-[480px] sm:w-[316px] group overflow-hidden rounded-md" style={{ width: 250, height: 380 }}>
                                        <Image
                                            src={currentBook.coverUrl}
                                            alt={currentBook.title}
                                            fill
                                            className="object-cover rounded-md shadow-md transform-gpu will-change-transform transition-all duration-300 ease-out group-hover:scale-105 cursor-pointer"
                                            onClick={() => onOpenCobiss(currentBook.id)}
                                        />
                                        <div
                                            className="absolute bottom-3 right-3 bg-gray-800/90 hover:bg-gray-700/90 text-white px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer backdrop-blur-sm hover:backdrop-blur transition-all duration-200 flex items-center shadow-sm hover:shadow"
                                            onClick={() => onOpenCobiss(currentBook.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                            COBISS
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-gray-100">{currentBook?.title || "Naslov ni na voljo"}</h2>
                                    <p className="text-sm text-gray-300">{currentBook?.author || "Avtor ni na voljo"}</p>
                                    <DifficultySelector
                                        difficulties={DIFFICULTIES}
                                        selected={selectedDifficulty}
                                        onChange={setSelectedDifficulty}
                                    />
                                    <div className="pt-2">
                                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                                            <Button
                                                onClick={onStart}
                                                disabled={!currentBook}
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base py-5 flex-1 shadow-sm hover:shadow-md transition-all duration-200 ease-out font-medium tracking-wide rounded-xl transition-transform duration-300 hover:scale-105"
                                                size="lg"
                                            >
                                                Začni igro
                                            </Button>
                                            <Button variant="outline" onClick={onBackToSearch} className="bg-white hover:bg-gray-300 text-gray-800 border-gray-300 hover:border-gray-400 text-base py-5 flex-1 shadow-sm hover:shadow-md ease-out font-medium tracking-wide rounded-xl transition-transform duration-300 hover:scale-105" size="lg">Nazaj</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="loading flex items-center justify-center">
                        <div className="text-center">
                            <LoadingSpinner />
                            <p className="text-gray-300 mt-2">Nalaganje...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};