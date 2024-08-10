import React, { FormEvent, useState } from 'react'
import useAddNote from '../hooks/notes/useAddNote';
import useGetSubjects from '../hooks/subjects/useGetSubjects';

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [subjectID, setSubjectID] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const { addNote, loading } = useAddNote();
  const { subjects } = useGetSubjects();

  const handleIncrement: any = () => {
    setCount(count+1);
    setQuestions([...questions, {
      question: '',
      options: [],
      answer: 0,
      score: 0,
    }])
  }

  console.log(questions);

  const handleReset: any = async(e: FormEvent) => {
    setCount(0);
    setQuestions([]);
  }

  const handleSubmit: any = async(e: FormEvent) => {
    e.preventDefault();
    //await addNote(data);
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, newValue: string) => {
    const updatedQuestions = [...questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = newValue;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions,
    };
    setQuestions(updatedQuestions);
  };

  return (
    <div className='w-2/3'>

      <h3 className="text-2xl text-center">Create Quiz</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        
        <div className="mt-6">
          <label className="ml-2 font-semibold">Topic</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
            autoComplete='false'
            required={true}
          />
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <label className="ml-2 font-semibold">Subject</label>
          <select
            className="grow select mt-2 select-bordered focus:outline-none"
            value={subjectID}
            autoComplete="off"
            onChange={(e) => setSubjectID(e.target.value)}
            required={true}
          >
            <option value="" disabled={true} selected>Select Class</option>
            { typeof(subjects) !== "undefined" && subjects.map((subject: any) => (
              <option key={subject._id} value={subject._id}>{subject.name}</option>
            ))}
          </select>
        </div>

        <div className='btn flex min-w-48 max-w-48 mx-auto mt-6 mb-4' onClick={handleIncrement}>Add Question</div>
            
        {
          questions.map((qn: any, index: number) => (
            <div key={index}>
              <div className="mt-4">
                <label className="ml-2 font-semibold">Question {index+1}</label>
                <input
                  type='text'
                  value={qn.question}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index] = { ...updatedQuestions[index], question: e.target.value };
                    setQuestions(updatedQuestions);
                  }}
                  className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
                  autoComplete='false'
                  required={true}
                />
              </div>
              <div className='flex justify-between'>
                <div className='flex-wrap items-center'>
                  <label className="md:ml-2 font-semibold">No. of Options</label>
                  <select
                    className="grow select mt-2 ml-2 select-bordered focus:outline-none"
                    autoComplete="off"
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index] = { ...updatedQuestions[index], options: Array(parseInt(e.target.value)).fill(null).map((_, i) => `Option ${i+1}`) };
                      setQuestions(updatedQuestions);
                    }}
                    required={true}
                  >
                    <option value="" disabled={true} selected>Select</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </select>
                </div>
                <div className='flex-wrap items-center'>
                  <label className="md:ml-2 font-semibold">Score</label>
                  <input
                    type="number"
                    step={0.1}
                    min={0.5}
                    max={10}
                    className="grow input input-bordered mt-2 ml-2 w-16 focus:outline-none"
                    value={qn.score}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index] = { ...updatedQuestions[index], score: e.target.value }
                      setQuestions(updatedQuestions);
                    }}
                    required={true}
                  />
                </div>
                <div className='flex-wrap items-center'>
                  <label className="md:ml-2 font-semibold">Correct Answer</label>
                  <select
                    className="grow select mt-2 ml-2 select-bordered focus:outline-none"
                    autoComplete="off"
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index] = { ...updatedQuestions[index], answer: parseInt(e.target.value) };
                      setQuestions(updatedQuestions);
                    }}
                    required={true}
                  >
                    <option value="" disabled={true} selected>Select</option>
                    { qn.options.map((option: any, index: number) => (
                    <option key={index} value={index+1}>{index+1}</option>
                   ))}
                  </select>
                </div>
              </div>
              <div className='flex flex-col gap-2 mt-2'>
                {
                  qn.options.map((option: any, optionIndex: number) => (
                    <input
                      key={optionIndex}
                      value={option}
                      className={`input input-bordered ${qn.answer === optionIndex+1? "text-green-400": ""}`}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
        
        <div className='mt-6 flex justify-end'>
          <button type='reset' className="btn m-2 btn-info"> Reset </button>
          <button type='submit' className="btn m-2 btn-success">
            { loading ? <span className='loading loading-spinner'></span>: "Save" }
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddQuiz
