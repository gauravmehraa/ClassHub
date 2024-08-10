import React, { FormEvent, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useSubmitQuiz from '../hooks/quiz/useSubmitQuiz';
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5";
import { useAuthContext } from '../context/AuthContext';

const Quiz = () => {
  const { authUser } = useAuthContext();
  const location = useLocation();
  const { quiz } = location.state;
  const { loading, submitQuiz, correctAnswers } = useSubmitQuiz();

  const [data, setData] = useState({
    quizID: quiz._id,
    submittedQuestions: {}
  } as any);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await submitQuiz(data);
  }
  
  return (
    <div className='text-white'>
      <div className='text-3xl font-bold mb-8 text-center'>{quiz.topic}</div>
      {
        JSON.stringify(correctAnswers) !== "{}" &&
        <div className='text-xl font-bold mb-8 text-center'>Grade Obtained: {correctAnswers.grade}</div>
      }
      <form onSubmit={handleSubmit}>
      {
        quiz.questions.map((question: any, index: number) => (
          <div key={question._id} className="mt-4">
            <div className='flex items-center gap-3'>
              {index+1}. {question.question}
              { JSON.stringify(correctAnswers) !== "{}" &&
                (correctAnswers.results[question._id]? <FaCheck className='text-green-400'/>: <IoClose className='h-6 w-6 text-red-500'/>)
              }
            </div>
            <div className={`flex flex-row flex-wrap gap-4 ${authUser.role === "Teacher"? "tooltip":""}`} data-tip="Teachers cannot answer">
              { question.options.map((option: any, index: number) => (
                <div className="form-control" key={index}>
                  <label className="label cursor-pointer gap-2">
                    <span className="label-text">{option}</span>
                    <input
                      type="radio"
                      name={question.question}
                      value={index+1}
                      required
                      disabled={JSON.stringify(correctAnswers) !== "{}" || authUser.role === "Teacher"}
                      className={`radio checked:bg-red-500 ${(JSON.stringify(correctAnswers) !== "{}" || authUser.role === "Teacher")? "disabled":"" }`}
                      onChange={(e) => setData({
                        ...data, submittedQuestions: {
                          ...data.submittedQuestions,
                          [question._id]: parseInt(e.target.value)
                      }})}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type='submit' className={`btn m-2 btn-success block mx-auto ${(JSON.stringify(correctAnswers) !== "{}" || authUser.role === "Teacher")? "btn-disabled":"" }`}>
            { loading ? <span className='loading loading-spinner'></span>: "Submit" }
          </button>
      </form>
    </div>
  )
}

export default Quiz
