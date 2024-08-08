import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const { quiz } = location.state;

  const [data, setData] = useState({
    quizID: quiz._id,
    submittedQuestions: {}
  } as any);

  console.log(data);
  return (
    <div className='text-white'>
      <div className='text-3xl font-bold mb-8'>{quiz.topic}</div>
      <div>
      {
        quiz.questions.map((question: any, index: number) => (
          <div key={question._id}>
            <div>{index+1}. {question.question}</div>
            <div className='flex flex-row gap-4'>
              {
                question.options.map((option: any, index: number) => (
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <span className="label-text">{option}</span>
                      <input
                        type="radio"
                        name={question.question}
                        value={index}
                        className="radio checked:bg-red-500"
                        onChange={(e) => setData({
                          ...data, submittedQuestions: {
                            ...data.submittedQuestions,
                            [question._id]: parseInt(e.target.value)
                            }
                          })}
                      />
                    </label>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Quiz
