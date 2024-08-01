
const FeedbackCard = (props: { data: any }) => {
  return (
    <div className="bg-white">
      <div>{props.data._id}</div>
    </div>
  )
}

export default FeedbackCard
