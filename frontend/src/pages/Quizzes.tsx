import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import useGetQuizzes from "../hooks/quiz/useGetQuizzes";


const Quizzes = () => {
  const { loading, quizzes } = useGetQuizzes();
  return (
    <div className="flex flex-col text-black w:9/10 sm:w-2/3 p-4 sm:p-8">
      <h1 className='text-3xl text-center font-semibold text-white'>Quizzes</h1>
      <Link to ="add" className="mx-auto mt-4 btn btn-md bg-white text-black">Add Quiz</Link>
    {
      loading ?
      <span className='loading loading-spinner mx-auto text-white'></span>:
      <div className="flex flex-row flex-wrap gap-4 m-2 sm:m-8 items-center justify-center">
        { quizzes.length === 0?
          <div> No quiz to show </div>:
          quizzes.map((quiz: { _id: React.Key | null | undefined; }, index: number) => (
            <QuizCard
              key={quiz._id}
              data={quiz}
            />
          ))}
      </div>
    }
  </div>
  )
}

export default Quizzes
