import { Link } from "react-router-dom";

const StudentCard = (props: { course: string, students: any }) => {
  
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className='text-2xl font-semibold text-center'>{props.course}</div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {props.students.map((student: any) => (
          <div className='my-2 items-center' key={student._id}>
            <Link
              to='profile'
              state={{ student, course: props.course }}
              className="underline text-blue-600 active:text-red-600 text-lg"
            >
              {student.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentCard
