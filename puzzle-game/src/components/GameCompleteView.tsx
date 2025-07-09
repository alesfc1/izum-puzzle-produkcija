"use client"

import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScoreDisplay } from './ScoreDisplay';
import { ScoreResult } from '@/utils/scoringSystem';
import { Difficulty } from '@/types/difficulty';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
    gameResult: ScoreResult;
    onBackToSelection: () => void;
    onBackToSearch: () => void;
    difficulty: Difficulty;
    completionTime: number;
}

export default function GameCompleteView({ gameResult, onBackToSelection, onBackToSearch, difficulty, completionTime }: Props) {
    const isMobile = useIsMobile();
    
    return (
        <div className="bg-gray-900 p-4 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-6">
            <Card className="bg-gray-800 border-gray-700 shadow-md p-6">
              <div className="text-center text-white text-2xl mb-4">🎉 Čestitke! 🎉</div>
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
                  <Button variant="outline" onClick={onBackToSearch} className="bg-white hover:bg-gray-300 text-gray-800 border-gray-300 hover:border-gray-400 text-base px-6 py-5 font-medium rounded-xl flex-1 transition-transform duration-300 hover:scale-105" size="lg">Nazaj</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }