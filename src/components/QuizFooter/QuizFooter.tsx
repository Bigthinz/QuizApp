import { ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react';
import React from 'react';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';

interface QuizFooterProps {
  currentQuestionIdx: number;
  quizQuestionsLength: number;
  remainder: number;
  handleNextQuestion: () => void;
  retryHandler: () => void;
}

function QuizFooter({
  currentQuestionIdx,
  quizQuestionsLength,
  remainder,
  handleNextQuestion,
  retryHandler,
}: QuizFooterProps) {
  return (
    <div className='absolute bottom-10 left-1/2 mx-auto w-10/12 -translate-x-1/2 transform flex-col items-center justify-center rounded-2xl bg-white py-5 text-center shadow-md '>
      <footer className='text-gray-70 bottom-10 flex items-center justify-between space-x-4 px-4'>
        <IconButton
          className='text-btnColor bg-[#F6F7FA] outline-none'
          variant='light'
          icon={ArrowLeft}
        />
        <div className='w-full flex-1 rounded-full bg-gray-200 dark:bg-[#F6F7FA]'>
          <div
            className={
              remainder
                ? 'bg-btnColor h-full rounded-full p-0.5 text-center text-[8px] font-medium leading-none text-blue-100'
                : 'bg-btnColor h-full rounded-full p-0.5 text-center text-[8px] font-medium leading-none text-blue-100'
            }
            style={{
              width: `${(
                (currentQuestionIdx / quizQuestionsLength) *
                100
              ).toFixed(0)}%`,
              transition: 'width 0.3s ease-in-out',
            }}
          >
            {((currentQuestionIdx / quizQuestionsLength) * 100).toFixed(0)}%
          </div>
        </div>
        {currentQuestionIdx >= quizQuestionsLength ? (
          <Button
            onClick={retryHandler}
            rightIcon={RefreshCcw}
            className='bg-btnColor hover:bg-btnHoverColor rounded-md text-xs'
          >
            Try Again
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            rightIcon={ArrowRight}
            className='bg-btnColor hover:bg-btnHoverColor rounded-md text-xs'
          >
            Next Question
          </Button>
        )}
      </footer>
    </div>
  );
}

export default QuizFooter;
