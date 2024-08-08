import { Link } from "react-router-dom";
import { getDate } from "../utils/date";


const QuizCard = (props: { data: any }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div>{props.data.topic}</div>
      <div>Subject: {props.data.subjectID.name}</div>
      <div>Uploaded On: {getDate(props.data.createdAt)}</div>
      <Link
        to='view'
        state={{ quiz: props.data }}
        className="btn mt-2"
      >
        Attempt Quiz
      </Link>
    </div>
  )
}

export default QuizCard
