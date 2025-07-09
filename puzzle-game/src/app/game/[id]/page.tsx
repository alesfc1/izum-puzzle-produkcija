"use client"

import { useState, useEffect } from "react";
import PreGameView from "../../../components/PreGameView";
import GameView from "../../../components/GameView";
import GameCompleteView from "../../../components/GameCompleteView";
import { Book } from "@/types/book";
import { Difficulty } from "@/types/difficulty";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ScoreResult } from "@/utils/scoringSystem";
import difficulties from "../../../../db/difficulties.json";

export default function GamePage() {
  const [stage, setStage] = useState<"pregame" | "game" | "complete">("pregame");
  const [currentBook, setCurrentBook] = useState<Book>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulties[0]);
  const [gameResult, setGameResult] = useState<ScoreResult>();
  const [completionTime, setCompletionTime] = useState(0);
  const { toast } = useToast();
  const { id } = useParams() as { id: string };
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

const onBackToSearch = () => {
    setCurrentBook(undefined);
    window.location.href = "/search";
}

  if (stage === "pregame") {
    return (
      <PreGameView
        currentBook={currentBook || { id: "", title: "", author: "", coverUrl: ""}}
        selectedDifficulty={selectedDifficulty || {"cols": 2, "rows": 2, "label": "2×2 (Zelo lahko)"}}
        setSelectedDifficulty={setSelectedDifficulty}
        onStart={() => setStage("game")}
        onBackToSearch={onBackToSearch}
      />
    );
  }

  if (stage === "game") {
    return (
      <GameView
        book={currentBook!}
        difficulty={selectedDifficulty!}
        handleGameComplete={(result) => {
          setGameResult(result);
          setStage("complete");
        }}
        onBackToSelection={() => setStage("pregame")}
      />
    );
  }

  if (stage === "complete") {
    return (
      <GameCompleteView
        gameResult={gameResult!}
        onBackToSelection={() => {
          setStage("pregame");
        }}
        onBackToSearch={onBackToSearch}
        difficulty={selectedDifficulty!}
        completionTime={completionTime}
        book={currentBook!}
      />
    );
  }

  return null;
}