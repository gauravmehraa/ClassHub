import { FormEvent, useEffect, useState } from 'react'
import useGetAllSubjects from '../hooks/subjects/useGetAllSubjects';
import useAddQuiz from '../hooks/quiz/useAddQuiz';

const AddQuiz = () => {
  const [topic, setTopic] = useState('');
  const [subjectID, setSubjectID] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [fadeOutIndex, setFadeOutIndex] = useState(-1);
  const [fadeInIndex, setFadeInIndex] = useState(-1);

  const { addQuiz, loading } = useAddQuiz();
  const { allSubjects } = useGetAllSubjects();

  const inputClass = 'w-full mt-2 input input-bordered flex items-center bg-white focus:outline-none';

  const handleIncrement: any = () => {
    setCount(count + 1);
    setFadeInIndex(count);
    setQuestions([...questions, {
      question: '',
      options: [],
      answer: 0,
      score: 0,
    }]);
    setTimeout(() => setFadeInIndex(-1), 1000);
  }

  const handleDecrement: any = (deleteIndex: number) => {
    setFadeOutIndex(deleteIndex);
    setTimeout(() => {
      setCount(count - 1);
      const updatedQuestions = questions.filter((_, index) => index !== deleteIndex);
      setQuestions(updatedQuestions);
      setFadeOutIndex(-1);
    }, 1000);
  }

  const handleReset: any = async(e: FormEvent) => {
    setCount(0);
    setQuestions([]);
  }

  const handleSubmit: any = async(e: FormEvent) => {
    e.preventDefault();
    await addQuiz({topic, subjectID, questions});
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
    <div className="flex flex-col text-black p-8 overflow-auto w-full">

      <h3 className="text-2xl text-center">Create Quiz</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        
        <div className="mt-6">
          <label className="ml-2 font-semibold">Topic</label>
          <input
            type='text'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={inputClass}
            autoComplete='false'
            required={true}
          />
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <label className="ml-2 font-semibold">Subject</label>
          <select
            className="grow select mt-2 select-bordered bg-white focus:outline-none"
            value={subjectID}
            autoComplete={"off"}
            onChange={(e) => setSubjectID(e.target.value)}
            required={true}
          >
            <option value="" disabled={true} selected>Select Subject</option>
            { typeof(allSubjects) !== "undefined" && allSubjects.map((subject: any) => (
              <option key={subject._id} value={subject._id}>{subject.name}</option>
            ))}
          </select>
        </div>

            
        {
          questions.map((qn: any, index: number) => (
            <div
              key={index}
              className={`bg-slate-200 rounded-2xl p-4 my-8 ${fadeOutIndex === index ? 'animate-fade-out' : ''} ${fadeInIndex === index ? 'animate-fade-in' : ''}`}>
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
                  className={inputClass}
                  autoComplete='false'
                  required={true}
                />
              </div>
              <div className='flex flex-row flex-wrap justify-around gap-4'>
                <div className='flex-wrap items-center'>
                  <label className="md:ml-2 font-semibold">Options</label>
                  <select
                    className="grow select bg-white mt-4 ml-2 select-bordered focus:outline-none"
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
                    className="grow input input-bordered bg-white mt-4 ml-2 w-16 focus:outline-none"
                    value={qn.score}
                    onChange={(e) => {
                      const validScore = e.target.value.trim() === ""? "": parseFloat(e.target.value);
                      const updatedQuestions = [...questions];
                      updatedQuestions[index] = { ...updatedQuestions[index], score: validScore }
                      setQuestions(updatedQuestions);
                    }}
                    required={true}
                  />
                </div>
                <div className='flex-wrap items-center'>
                  <label className="md:ml-2 font-semibold">Answer</label>
                  <select
                    className="grow select mt-4 ml-2 bg-white select-bordered focus:outline-none"
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
                <div className='flex-wrap items-center'>
                  <div className='btn mt-4 bg-white text-black border-none' onClick={() => handleDecrement(index)}> Delete </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 mt-2'>
                {
                  qn.options.map((option: any, optionIndex: number) => (
                    <input
                      key={optionIndex}
                      value={option}
                      className={`input input-bordered ${qn.answer === optionIndex+1? "bg-green-400": "bg-red-300"}`}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
        
        <div className='btn bg-primary text-black border-none flex min-w-48 max-w-48 mx-auto mt-6 mb-4' onClick={handleIncrement}>Add Question</div>
        
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
