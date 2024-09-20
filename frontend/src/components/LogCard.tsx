import { getTime } from "../utils/date"

const LogCard = (props: { data: any, index: number }) => {
  return (
    <div className={`${ props.index % 2 === 0? "bg-gray-200": "bg-gray-100"} w-full p-5 `}>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <img src={`https://avatar.iran.liara.run/public/${props.data.userID.gender === 'Male'? 'boy': 'girl'}?username=${props.data.userID.email}`} alt="User" className="rounded-full w-16 h-16 border-primary border-2" />
        <div className="font-semibold text-left">
          [{props.data.userType}]
          {` ${props.data.userID.name}`} 
          {` ${props.data.action}`}
          {` ${props.data.targetID?.name || ""}`}
          {` ${props.data.targetID?.topic || ""}`}
          {` ${props.data.targetID?.year || ""} ${props.data.targetID?.program || ""}`}
          {` ${props.data.targetID?.title || ""}`}
        </div>
        
        <div className="font-semibold min-w-max mt-auto sm:ml-auto">{getTime(props.data.time)}</div>
      </div>
    </div>
  )
}

export default LogCard
