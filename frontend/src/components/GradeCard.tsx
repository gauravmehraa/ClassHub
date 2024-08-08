import { getDate } from "../utils/date"

const GradeCard = (props: { data: any }) => {
  return (
    <div className="flex flex-col text-left gap-2 bg-white text-black w-9/10 sm:max-w-96 sm:min-w-96 p-5 rounded-lg">
      <div className="text-xl font-semibold"> Marks Obtained: {props.data.score}</div>
      <div className="text-xl font-semibold"> Grade: {props.data.grade}</div>
      <div>Topic: {props.data.quizID.topic}</div>
      <div>{getDate(props.data.createdAt)}</div>
    </div>
  )
}

export default GradeCard