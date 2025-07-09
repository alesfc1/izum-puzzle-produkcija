"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DifficultySelector } from "@/components/DifficultySelector";
import { Book } from "@/types/book";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Difficulty } from "@/types/difficulty";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    currentBook: Book;
    selectedDifficulty: Difficulty;
    setSelectedDifficulty: (difficulty: Difficulty) => void;
    onStart: () => void;
    onBack: () => void;
}

const DIFFICULTIES: Difficulty[] = [
    { cols: 2, rows: 2, label: "2×2 (Zelo lahko)" },
    { cols: 2, rows: 3, label: "2×3 (Lahko)" },
    { cols: 3, rows: 3, label: "3×3 (Srednje)" },
    { cols: 3, rows: 4, label: "3×4 (Težje)" },
    { cols: 4, rows: 4, label: "4×4 (Težko)" },
    { cols: 4, rows: 5, label: "4×5 (Zelo težko)" },
  ];

export default function PreGamePage({ onStart, onBack }: Props) {
    const { id } = useParams() as { id: string };
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
    const { toast } = useToast();
    console.log("ID iz URL-ja:", id);

    const handleCobissBook = async (id: string) => {
        try {
            const cobissData = await bookCobiss(id);
            const book = {
                id: cobissData.id || "ID ni na voljo",
                title: cobissData.primary || "Naslov ni na voljo",
                author: cobissData.secondary || "Avtor ni na voljo",
                coverUrl: cobissData.coverUrl || "Slika ni na voljo",
                addon02: cobissData.addon02 || "Opis ni na voljo"
            };
            setCurrentBook(book);
        } catch (error) {
            console.error("Error fetching COBISS book:", error);
            toast({
                title: "Napaka pri pridobivanju podatkov o knjigi",
                description: "Prišlo je do napake pri pridobivanju podatkov iz COBISS."
            });
        }
    }

    interface CobissBookResponse {
        id?: string;
        primary?: string;
        secondary?: string;
        coverUrl?: string;
        addon02?: string;
    }

    // COBISS API function
    const bookCobiss = async (id: string): Promise<CobissBookResponse> => {
        const response = await fetch(`/api/${id}`);
        const data = await response.json();
        console.log("Prejeti podatki iz COBISS:", data);
        console.log("ID: ", data.id, "Naslov: ", data.primary, "Avtor: ", data.secondary, "Slika: ", data.coverUrl);
        return {
            ...data
        }
    };


    useEffect(() => {
        if (id) {
            handleCobissBook(id);
        } else {
            toast({
                title: "Napaka",
                description: "ID knjige ni bil najden v URL-ju."
            });
        }
    }, [id, toast]);


    return (
        <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center justify-start">
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
                                    difficulties={[
                                        { cols: 2, rows: 2, label: "2×2 (Zelo lahko)" },
                                        { cols: 2, rows: 3, label: "2×3 (Lahko)" },
                                        { cols: 3, rows: 3, label: "3×3 (Srednje)" },
                                        { cols: 3, rows: 4, label: "3×4 (Težje)" },
                                        { cols: 4, rows: 4, label: "4×4 (Težko)" },
                                        { cols: 4, rows: 5, label: "4×5 (Zelo težko)" },
                                    ]}
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
                                        <Button variant="outline" onClick={onBack} className="bg-white hover:bg-gray-300 text-gray-800 border-gray-300 hover:border-gray-400 text-base py-5 flex-1 shadow-sm hover:shadow-md ease-out font-medium tracking-wide rounded-xl transition-transform duration-300 hover:scale-105" size="lg">Nazaj</Button>
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