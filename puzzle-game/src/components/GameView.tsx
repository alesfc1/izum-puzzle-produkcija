"use client"

import React from 'react';
import { PuzzleGame } from '../components/PuzzleGame';
import { Button } from './ui/button';
import { Book } from '../types/book';
import { Difficulty } from '@/types/difficulty';
import { ScoreResult } from '@/utils/scoringSystem';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';

interface Props {
  book: Book;
  difficulty: Difficulty;
  handleGameComplete: (result: ScoreResult, completionTime: number) => void;
  onBackToSelection: () => void;
}

export default function GameCompleteView({ book, difficulty, handleGameComplete, onBackToSelection }: Props) {
  return (
    <div className="w-full">
      <Card className="shadow-lg border-2 border-gray-700 bg-gray-800 w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-2xl md:text-3xl text-gray-100 dark:text-gray-100">
            {difficulty.cols}×{difficulty.rows} Puzzle
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6 px-8">
          <PuzzleGame
            imageSrc={book ? book.coverUrl : ''}
            rows={difficulty ? difficulty.rows : 0}
            cols={difficulty ? difficulty.cols : 0}
            onComplete={handleGameComplete}
          />
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <div className="text-center mt-6">
            <Button variant="outline" className='transition-transform duration-300 hover:scale-105 text-gray-800 border-gray-300 hover:border-gray-400 bg-white text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-300' onClick={onBackToSelection}>Nazaj na izbiro knjige</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}