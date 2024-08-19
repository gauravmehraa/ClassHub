import { Link } from "react-router-dom";
import { getDate } from "../utils/date";
import DeleteQuizModal from "./DeleteQuizModal";
import { useAuthContext } from "../context/AuthContext";


const QuizCard = (props: { data: any }) => {
  const { authUser } = useAuthContext();
  return (
    <div className="bg-white rounded-lg p-6 min-w-84 max-w-84">
      <div>{props.data.topic}</div>
      <div>Subject: {props.data.subjectID.name}</div>
      <div>Uploaded On: {getDate(props.data.createdAt)}</div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        <Link
          to='view'
          state={{ quiz: props.data }}
          className="btn mt-2"
        >
          { authUser.role === "Teacher"? "View": "Attempt" }
        </Link>
        { authUser.role === "Teacher" && <DeleteQuizModal quiz={props.data}/>}
      </div>
    </div>
  )
}

export default QuizCard
