import { useAuthContext } from "../context/AuthContext"
import { getDate } from "../utils/date"
import DeleteFeedbackModal from "./DeleteFeedbackModal";
import EditFeedbackModal from "./EditFeedbackModal";

const FeedbackCard = (props: { data: any }) => {
  const { authUser } = useAuthContext();
  
  return (
    <div className="flex flex-col text-left gap-2 bg-white w-9/10 sm:max-w-96 sm:min-w-96 p-5 rounded-lg">
      <div className="text-xl font-semibold">
        {authUser.role === "Teacher"? props.data.studentID.name: `From: ${props.data.teacherID.name}`}
      </div>
      <div className="flex flex-row gap-2">
        <div>{props.data.content}</div>
        {authUser.role === "Teacher" && <EditFeedbackModal feedback={props.data}/> }
        {authUser.role === "Teacher" && <DeleteFeedbackModal feedback={props.data}/> }
      </div>
      <div>{getDate(props.data.createdAt)}</div>
    </div>
  )
}

export default FeedbackCard
