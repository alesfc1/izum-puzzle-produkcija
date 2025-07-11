import React from 'react';
import { cn } from "@/lib/utils";
import { Difficulty } from "@/types/difficulty";

interface DifficultySelectorProps {
  difficulties: Difficulty[];
  selected: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  className?: string;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulties,
  selected = difficulties[0], // privzeta vrednost
  onChange,
  className
}) => {

  // definiraj barvne nivoje (gradient)
  const difficultyColors = [
    'from-blue-400 to-blue-500',    // najlazji
    'from-blue-300 to-blue-400',
    'from-cyan-300 to-cyan-400',
    'from-amber-300 to-amber-400',
    'from-orange-400 to-orange-500',
    'from-red-400 to-red-500'      // najteži
  ];

  return (
    <div className={cn("w-full py-4 mx-auto", className)}>
      <p className="text-lg font-medium text-gray-100 dark:text-gray-100 mb-3 px-1">Težavnost:</p>
      <div className="bg-[#EEEEEF] rounded-2xl p-2 w-full">
        <div className="grid grid-cols-2 grid-rows-3 gap-2 lg:flex-col lg:grid-cols-3 lg:grid-rows-2">
          {difficulties.map((difficulty, index) => {
            const isSelected = selected.label === difficulty.label;
            const bgGradient = difficultyColors[index] || 'from-gray-200 to-gray-300';
  
            return (
              <button
                key={difficulty.label}
                className={cn(
                  "px-4 py-4 text-base font-medium transition-all duration-150 h-14 flex-1 min-w-0",
                  "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400",
                  "rounded-xl whitespace-nowrap bg-[#EEEEEF]",
                  isSelected 
                    ? `text-white bg-gradient-to-r ${bgGradient} shadow-md`
                    : "text-gray-600 hover:bg-gray-200"
                )}
                onClick={() => onChange(difficulty)}
              >
                {difficulty.label.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
