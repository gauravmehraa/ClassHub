import { useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import useGetFeedback from "../hooks/feedback/useGetFeedback";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useAuthContext } from "../context/AuthContext";

const Feedback = () => {
  const { authUser} = useAuthContext();
  const { loading, feedbacks } = useGetFeedback();

  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const pages = Math.ceil(feedbacks.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const currentPage = feedbacks.slice(start, end);

  const previousPage = () => {
    if(page !== 1) setPage(page - 1);
  }
  const nextPage = () => {
    if(page !== pages) setPage(page + 1);
  }

  return (
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">
      <div className="hidden md:block text-3xl text-center font-semibold py-4">Feedbacks</div>
      <div className="text-xl text-center py-2 w-11/12 sm:w-1/2 mx-auto">{ authUser.role === "Teacher"? "Take a look at the feedbacks you've given for your students.": "Take a look at the feedbacks given by your teachers." }</div>
    {
      loading ?
      <span className='loading loading-spinner mx-auto text-white'></span>:
      <div className="flex flex-col my-2 sm:my-8 items-center">
        { feedbacks.length === 0?
          <div className="mx-auto"> No feedback to show </div>:
          <>
            <div className="join mb-4">
              <button onClick={previousPage} className="join-item btn bg-white border-none text-black hover:bg-classhub-purple hover:text-white"><GrFormPrevious className="w-4 h-4"/></button>
              <button className="join-item btn border-none text-lg disabled:text-classhub-purple disabled:bg-white" disabled>{page}</button>
              <button onClick={nextPage} className="join-item btn bg-white border-none text-black hover:bg-classhub-purple hover:text-white"><GrFormNext className="w-4 h-4"/></button>
            </div>

            {currentPage.map((feedback: { _id: React.Key | null | undefined; }, index: number) => (
              <FeedbackCard key={feedback._id} data={feedback} showInfo={true} index={index}/>
            ))}
          </>
        }
      </div>
    }
  </div>
  )
}

export default Feedback