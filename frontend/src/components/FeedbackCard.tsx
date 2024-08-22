import { useAuthContext } from "../context/AuthContext"
import { getDate } from "../utils/date"
import DeleteFeedbackModal from "./DeleteFeedbackModal";
import EditFeedbackModal from "./EditFeedbackModal";

const FeedbackCard = (props: { data: any, showInfo: boolean }) => {
  const { authUser } = useAuthContext();

  const values = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);
  
  return (
    <div className="flex flex-col text-left gap-2 bg-classhub-lavender w-full p-5 rounded-lg shadow-lg">

      <div className="text-xl font-semibold flex flex-wrap gap-4 items-center">
        { props.showInfo && <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="User" className="rounded-full w-12 h-12" /> }
        { props.showInfo? authUser.role === "Teacher"? props.data.studentID.name: `From: ${props.data.teacherID.name}`: null}
        <div className="md:ml-auto font-normal text-base">{getDate(props.data.createdAt)}</div>
      </div>

      <div className="rating rating-sm rating-half">
        {values.map((value: number, index: number) => (
          <input type="radio" name={props.data._id} key={`${props.data._id}-${index}`} readOnly className={`mask mask-star-2 ${value % 1 === 0.5? 'mask-half-1': 'mask-half-2'} bg-orange-500`} disabled checked={props.data.rating === value}/>
        ))}
      </div>
      
      <div className="flex flex-row gap-2">
        <div className="font-semibold">{props.data.content}</div>
        {authUser.role === "Teacher" && <EditFeedbackModal feedback={props.data}/> }
        {authUser.role === "Teacher" && <DeleteFeedbackModal feedback={props.data}/> }
      </div>
      
    </div>
  )
}

export default FeedbackCard
