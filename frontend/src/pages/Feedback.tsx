import FeedbackCard from "../components/FeedbackCard";
import useGetFeedback from "../hooks/feedback/useGetFeedback";

const Feedback = () => {
  const { loading, feedbacks } = useGetFeedback();
  return (
    <div className="flex flex-col text-black w:9/10 sm:w-2/3 p-4 sm:p-8">
    {
      loading ?
      <span className='loading loading-spinner mx-auto text-white'></span>:
      <div className="flex flex-row flex-wrap gap-4 m-2 sm:m-8 items-center justify-evenly">
        { feedbacks.length === 0?
          <div className="mx-auto"> No feedback to show </div>:
          feedbacks.map((feedback: { _id: React.Key | null | undefined; }, index: number) => (
            <FeedbackCard
              key={feedback._id}
              data={feedback}
            />
          ))}
      </div>
    }
  </div>
  )
}

export default Feedback