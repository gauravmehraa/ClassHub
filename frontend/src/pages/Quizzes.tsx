import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import useGetQuizzes from "../hooks/quiz/useGetQuizzes";
import { useAuthContext } from "../context/AuthContext";


const Quizzes = () => {
  const { loading, quizzes } = useGetQuizzes();
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col text-black p-4 sm:p-8 overflow-auto w-full">
      <h1 className='hidden md:block text-3xl text-center font-semibold'>Quizzes</h1>
      { authUser.role === "Teacher" && <Link to ="add" className="mx-auto mt-4 btn btn-md border-none bg-primary text-white hover:bg-white hover:text-black">Add Quiz</Link> }
    {
      loading ?
      <span className='loading loading-spinner mx-auto my-auto text-primary'></span>:
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
