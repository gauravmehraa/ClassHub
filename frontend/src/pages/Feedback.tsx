import { useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import useGetFeedback from "../hooks/feedback/useGetFeedback";

const Feedback = () => {
  const { loading, feedbacks } = useGetFeedback();

  const [page, setPage] = useState(1);

  const itemsPerPage = 2;
  const pages = Math.ceil(feedbacks.length / itemsPerPage);
  const values = Array.from({ length: pages }, (_, i) => i + 1);

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const currentPage = feedbacks.slice(start, end);

  return (
    <div className="flex flex-col text-black p-4 sm:p-8 overflow-auto max-h-screen w-full">
      <div className="text-3xl text-center font-semibold py-4">Feedbacks</div>
      <div className="text-xl text-center py-2 w-11/12 sm:w-1/2 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis qui tenetur culpa, mollitia ut?</div>
    {
      loading ?
      <span className='loading loading-spinner mx-auto text-white'></span>:
      <div className="flex flex-col gap-4 m-2 sm:m-8 items-center">
        { feedbacks.length === 0?
          <div className="mx-auto"> No feedback to show </div>:
          <>
            <div className="join shadow-md">
              {values.map((value) => (
                //
                <label key={value} htmlFor={`radio-${value}`} className={`join-item btn btn-square border-none cursor-pointer ${page === value ? 'bg-classhub-purple text-black' : 'bg-white text-black'}`}>
                  <input
                    id={`radio-${value}`}
                    className="hidden" 
                    value={value}
                    onChange={() => setPage(value)}
                    type="radio"
                    name="options"
                    aria-label={value.toString()}
                    checked={page === value}
                  />
                  {value}
              </label>
              ))}
            </div>

           {currentPage.map((feedback: { _id: React.Key | null | undefined; }, index: number) => (
            <FeedbackCard
              key={feedback._id}
              data={feedback}
              showInfo={true}
            />
          ))  }
          </>
        }
      </div>
    }
  </div>
  )
}

export default Feedback