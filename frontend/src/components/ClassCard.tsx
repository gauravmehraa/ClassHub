import { useAuthContext } from "../context/AuthContext"
import EditClassModal from "./EditClassModal";

const ClassCard = (props: { data: any, index: number }) => {
  const { authUser } = useAuthContext();
  
  return (
    <div className={`flex flex-col text-left gap-2 ${ props.index % 2 === 0? "bg-gray-200": "bg-gray-100"} w-full p-5 border-b border-gray-400`}>
      
      <div className="flex flex-row gap-2">
        <div className="font-semibold">{props.data.year} - {props.data.program}</div>
        {authUser.role === "Teacher" && <EditClassModal currentClass={props.data}/> }
      </div>
      
    </div>
  )
}

export default ClassCard
