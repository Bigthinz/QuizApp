'use client';

import { motion } from 'framer-motion';
import React, { useLayoutEffect, useState } from 'react';

import QuizFooter from '@/components/QuizFooter/QuizFooter';
import QuizQuestion from '@/components/QuizQuestion/QuizQuestion';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  questions: QuizQuestion[];
}

function QuizApp() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [remainder, setRemainder] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  const currentQuestion = quizQuestions[currentQuestionIdx];
  const quizLimit = 10;

  useLayoutEffect(() => {
    // Fetch questions from API
    fetch('/api/quiz')
      .then((response) => response.json())
      .then((data: QuizData) => {
        // Shuffle the questions array to randomize the order
        const shuffledQuestions = data.questions.sort(
          () => Math.random() - 0.5
        );

        // Shuffle options for each question
        const questionsWithShuffledOptions = shuffledQuestions.map(
          (question) => {
            const shuffledOptions = question.options.sort(
              () => Math.random() - 0.5
            );
            return { ...question, options: shuffledOptions };
          }
        );

        setQuizQuestions(questionsWithShuffledOptions);
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleNextQuestion = () => {
    setIsVisible(false);

    if (selected === currentQuestion.correctAnswer) {
      // Update score when the correct answer is selected
      setScore(score + 1);
    }

    if (currentQuestionIdx < 11) {
      setTimeout(() => {
        // Move to the next question
        setCurrentQuestionIdx(currentQuestionIdx + 1);
        setSelected(null); // Reset selected option
        calculate();
      }, 500);

      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  };

  const retryHandler = () => {
    setScore(0);
    setCurrentQuestionIdx(0);
    setSelected(null); // Reset selected option
  };

  const calculate = () => {
    const ramains: any = (
      (currentQuestionIdx / quizQuestions.length) *
      100
    ).toFixed(0);

    setRemainder(ramains);
  };

  return (
    <div className='bg-bgColor h-[100vh]'>
      <div className='layout relative flex min-h-[50vh] flex-col items-center justify-center py-12 text-center'>
        <motion.div
          className='layout relative flex min-h-[50vh] flex-col items-center justify-center py-12 text-center'
          initial={{ opacity: 1 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentQuestionIdx >= quizLimit ? (
            <div className='space-y-10'>
              {score > 7 && (
                <h2 className='text-primaryText text-5xl'>You made it! 🎊</h2>
              )}
              {score < 5 && (
                <h2 className='text-primaryText text-5xl'>
                  Better luck next time! 😄
                </h2>
              )}
              {score >= 5 && score <= 7 && (
                <h2 className='text-primaryText text-5xl'>Well done! 🙌</h2>
              )}
              <p className='text-2xl'>You scored: {score}</p>
            </div>
          ) : (
            <QuizQuestion
              question={currentQuestion?.question}
              options={currentQuestion?.options}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </motion.div>
      </div>
      <QuizFooter
        currentQuestionIdx={currentQuestionIdx}
        quizQuestionsLength={quizQuestions.length}
        remainder={remainder}
        handleNextQuestion={handleNextQuestion}
        retryHandler={retryHandler}
      />
    </div>
  );
}

export default QuizApp;
