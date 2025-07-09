"use client"

import React from 'react';
import {PuzzleGame} from '../components/PuzzleGame';
import { Button } from './ui/button';
import { Book } from '../types/book';
import { Difficulty } from '@/types/difficulty';

interface Props {
    book: Book;
    difficulty: Difficulty;
    handleGameComplete: (result: any) => void;
    onBackToSelection: () => void;
}

export default function GameCompleteView({ book, difficulty, handleGameComplete, onBackToSelection }: Props) {
    return (
        <div className="bg-gray-900  p-4 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <PuzzleGame
              imageSrc={book ? book.coverUrl : ''}
              rows={difficulty ? difficulty.rows : 0}
              cols={difficulty ? difficulty.cols : 0}
              onComplete={handleGameComplete}
            />
            <div className="text-center mt-6">
              <Button variant="outline" className='transition-transform duration-300 hover:scale-105 text-gray-800 border-gray-300 hover:border-gray-400 bg-white text-gray-900 hover:bg-gray-300 dark:hover:bg-gray-300' onClick={onBackToSelection}>Nazaj na izbiro knjige</Button>
            </div>
          </div>
        </div>
      );
    }