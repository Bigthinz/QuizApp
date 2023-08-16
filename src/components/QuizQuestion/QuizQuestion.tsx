import { RadioGroup } from '@headlessui/react';
import React from 'react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  selected: string | null;
  setSelected: (value: string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function QuizQuestion({
  question,
  options,
  selected,
  setSelected,
}: QuizQuestionProps) {
  return (
    <>
      <div>
        <h1 className='mt-4'>{question}</h1>
        <p className='mt-2 text-lg text-gray-800'>Select an answer</p>
      </div>
      <div className='mt-20 w-10/12'>
        <RadioGroup value={selected} onChange={setSelected}>
          <div className='relative -space-y-px rounded-md'>
            <div className='grid grid-cols-2 gap-4'>
              {options?.map((option, optionIdx) => (
                <RadioGroup.Option
                  key={optionIdx}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      optionIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                      optionIdx === options.length - 1
                        ? 'rounded-bl-md rounded-br-md'
                        : '',
                      checked
                        ? 'border-lightGreen bg-lightGreen z-10'
                        : 'bg-primaryGray border-gray-200',
                      'relative flex cursor-pointer flex-col rounded border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <span className='flex items-center text-sm'>
                        <span
                          className={classNames(
                            checked
                              ? 'bg-deepGreen border-transparent'
                              : 'border-gray-300 bg-white',
                            active ? 'ring-deepGreen ring-2 ring-offset-2' : '',
                            'flex h-4 w-4 items-center justify-center rounded-full border'
                          )}
                          aria-hidden='true'
                        >
                          <span className='h-1.5 w-1.5 rounded-full bg-white' />
                        </span>
                      </span>
                      <RadioGroup.Label
                        as='span'
                        className={classNames(
                          checked ? 'text-indigo-900' : 'text-gray-900',
                          'ml-3 font-medium'
                        )}
                      >
                        {option}
                      </RadioGroup.Label>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </div>
        </RadioGroup>
      </div>
    </>
  );
}

export default QuizQuestion;
