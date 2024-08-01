import FeedbackCard from "../components/FeedbackCard";
import useGetFeedback from "../hooks/useGetFeedback"

const Feedback = () => {
  const { loading, feedbacks } = useGetFeedback();
  return (
    <div>
      {
        loading ?
        <span className='loading loading-spinner'></span>:
        feedbacks.length === 0?
          <div> none </div>:
          feedbacks.map((feedback: { _id: React.Key | null | undefined; }, index: number) => (
            <FeedbackCard
              key={feedback._id}
              data={feedback}
            />
          )) 
      }
    </div>
  )
}

export default Feedback
