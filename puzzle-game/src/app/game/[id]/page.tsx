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
import ErrorPage from "@/components/ErrorPage";
import "@/styles/style.css";

export default function GamePage() {
  const [stage, setStage] = useState<"pregame" | "game" | "complete">("pregame");
  const [currentBook, setCurrentBook] = useState<Book>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulties[0]);
  const [gameResult, setGameResult] = useState<ScoreResult>();
  const [completionTime, setCompletionTime] = useState(0);
  const [responseStatus, setResponseStatus] = useState<number>(404);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const { toast } = useToast();
  const { id } = useParams() as { id: string };

  const handleCobissBook = async (id: string) => {
    try {
      const cobissData = await bookCobiss(id);
      const book = {
        id: cobissData.id || "ID ni na voljo",
        title: cobissData.primary || "Naslov ni na voljo",
        author: cobissData.secondary || "Avtor ni na voljo",
        coverUrl: cobissData.coverUrl || "Slika ni na voljo",
        addon02: cobissData.addon02
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
    if (data.error) {
      setResponseStatus(404);
      setResponseMessage(data.error.text);
    } else if (data.coverUrl == null) {
      setResponseStatus(404);
      setResponseMessage("Iskana knjiga nima naslovnice");
    }
    else {
      setResponseStatus(response.status);
    }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.href = "/search";
  }

  const openCobiss = (id: string) => {
    if (id !== "" || id !== undefined || id !== null) {
      const cobissurl = "https://plusbeta.cobiss.net/cobiss/si/sl/data/cobib/"
      window.open(cobissurl + id);
    }
  }

  const handleGameComplete = (result: ScoreResult, completionTime: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setGameResult(result);
    setCompletionTime(completionTime);
    setStage("complete");
  }

  const onBackToSelection = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStage("pregame");
  }

  const onStart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStage("game");
  }

  if (stage === "pregame") {
    return (
      currentBook?.coverUrl == "Slika ni na voljo" ? (
        <ErrorPage status={responseStatus} message={responseMessage} />
      ) : (
        <PreGameView
          currentBook={currentBook || { id: "", title: "", author: "", coverUrl: "" }}
          selectedDifficulty={selectedDifficulty || { "cols": 2, "rows": 2, "label": "2×2 (Zelo lahko)" }}
          setSelectedDifficulty={setSelectedDifficulty}
          onStart={onStart}
          onBackToSearch={onBackToSearch}
          onOpenCobiss={openCobiss}
        />
      )
    );
  }

  if (stage === "game") {
    return (
      <GameView
        book={currentBook!}
        difficulty={selectedDifficulty!}
        handleGameComplete={handleGameComplete}
        onBackToSelection={onBackToSelection}
      />
    );
  }

  if (stage === "complete") {
    return (
      <GameCompleteView
        gameResult={gameResult!}
        onBackToSelection={onBackToSelection}
        onBackToSearch={onBackToSearch}
        difficulty={selectedDifficulty!}
        completionTime={completionTime}
        book={currentBook!}
        onOpenCobiss={openCobiss}
      />
    );
  }

  return null;
}