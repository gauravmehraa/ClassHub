import { getDate } from "../utils/date"
import images from "../assets/images/index"

const GradeCard = (props: { data: any, index: number }) => {
  return (
    <div className={`flex flex-col text-left gap-2 ${props.index % 2 === 0? "bg-gray-200": "bg-gray-100"} w-full p-5`}>
      <div className="flex gap-4 items-center text-xl font-semibold">
        { props.data.grade === "A" && <img src={images.gradeA} className="h-12 w-12" alt="Grade A"/> }
        { props.data.grade === "B" && <img src={images.gradeB} className="h-12 w-12" alt="Grade B"/> }
        { props.data.grade === "C" && <img src={images.gradeC} className="h-12 w-12" alt="Grade C"/> }
        <div>{props.data.score} out of {props.data.quizID.score}</div>
      </div>
      <div className="text-lg font-semibold">Topic: {props.data.quizID.topic}</div>
      <div>{getDate(props.data.createdAt)}</div>
    </div>
  )
}

export default GradeCard