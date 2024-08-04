import { useAuthContext } from "../context/AuthContext"
import { getDate } from "../utils/date"

const FeedbackCard = (props: { data: any }) => {
  const { authUser } = useAuthContext();
  console.log(props.data);
  return (
    <div className="bg-white max-w-72 min-w-72 p-5 rounded-lg">
      <div>
        {authUser.role === "Teacher"? props.data.studentID.name: `From: ${props.data.teacherID.name}`}
      </div>
      <div>{props.data.content}</div>
      <div>{getDate(props.data.createdAt)}</div>
    </div>
  )
}

export default FeedbackCard
