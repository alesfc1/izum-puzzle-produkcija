"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DifficultySelector } from "@/components/DifficultySelector";
import { Book } from "@/types/book";
import { Difficulty } from "@/types/difficulty";
import difficulties from "../../db/difficulties.json";

interface Props {
    currentBook: Book;
    selectedDifficulty: Difficulty;
    setSelectedDifficulty: (difficulty: Difficulty) => void;
    onStart: () => void;
    onBackToSearch: () => void;
}

const DIFFICULTIES: Difficulty[] = difficulties.map((d) => ({
    cols: d.cols,
    rows: d.rows,
    label: d.label
}));

export default function PreGameView({ currentBook, selectedDifficulty, setSelectedDifficulty, onStart, onBackToSearch }: Props) {
    return (
        <div className="bg-gray-900 p-4 flex flex-col items-center justify-start">
            <div className="w-full max-w-4xl mt-6">
                <Card className="shadow-lg border-2 border-gray-700 bg-gray-800 w-full">
                    <CardContent className="py-12 px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex justify-center">
                                {currentBook && (
                                    <Image
                                        src={currentBook.coverUrl}
                                        alt={currentBook.title}
                                        width={250}
                                        height={380}
                                        className="object-cover rounded-md shadow-md transition-transform duration-300 ease-out hover:scale-105"
                                    />
                                )}
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
            </div>
        </div>
    );
};