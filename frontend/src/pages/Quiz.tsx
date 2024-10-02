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
    <div className="flex flex-col text-black px-6 sm:px-4 py-4 sm:py-8 overflow-auto max-h-screen w-full">
      <div className='text-3xl font-bold mt-8 text-center'>{quiz.topic}</div>
      {
        JSON.stringify(correctAnswers) !== "{}" &&
        <div className='text-xl font-bold mt-8 text-center'>Grade Obtained: {correctAnswers.grade}</div>
      }
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      {
        quiz.questions.map((question: any, index: number) => (
          <div key={question._id} className="mt-8">
            <div className='flex text-center items-center gap-3 px-4 sm:px-8 text-xl mx-auto'>
              <b>{index+1}. {question.question} { authUser.role === "Teacher" && `[${question.score} marks]`}</b>
              { JSON.stringify(correctAnswers) !== "{}" &&
                (correctAnswers.results[question._id]? <FaCheck className='text-green-400'/>: <IoClose className='h-6 w-6 text-red-500'/>)
              }
            </div>
            <div className={`flex flex-col items-left mx-auto w-screen sm:w-96 flex-wrap px-4 gap-4 sm:px-8 ${authUser.role === "Teacher"? "tooltip":""}`} data-tip="Teachers cannot answer">
              { question.options.map((option: any, index: number) => (
                <div className="form-control" key={index}>
                  <label className="flex label text-left cursor-pointer w-fit gap-4">
                    { authUser.role === "Teacher" && 
                      <input
                      type="radio"
                      name={question.question}
                      value={index+1}
                      disabled={true}
                      readOnly
                      checked={question.answer === index+1}
                      className="radio input-bordered checked:bg-green-400 disabled border-black border-2"
                      />
                    }
                    { authUser.role === "Student" && 
                      <input
                      type="radio"
                      name={question.question}
                      value={index+1}
                      required
                      disabled={JSON.stringify(correctAnswers) !== "{}"}
                      className={`radio bg-white checked:bg-red-500 border-primary ${JSON.stringify(correctAnswers) !== "{}"? "disabled":"" }`}
                      onChange={(e) => setData({
                        ...data, submittedQuestions: {
                          ...data.submittedQuestions,
                          [question._id]: parseInt(e.target.value)
                        }})}
                        />
                      }
                      <span className="label-text text-black text-lg">{option}</span>
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
