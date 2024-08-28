import { Link } from "react-router-dom";

const StudentsCard = (props: { course: string, students: any }) => {
  
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className='text-2xl font-semibold text-center my-4'>{props.course}</div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {props.students.map((student: any) => (
          <div className='my-2 items-center min-w-80 max-w-80' key={student._id}>
            <Link to='profile' state={{ student, course: props.course }} className="flex flex-row gap-4 items-center glass text-lg bg-classhub-purple text-white hover:bg-white hover:border-4 hover:border-classhub-purple hover:text-black transition-all px-4 py-2 rounded-3xl">
              <img src={`https://avatar.iran.liara.run/public/${student.gender === 'Male'? 'boy': 'girl'}?username=${student.email}`} alt="User" className="rounded-full w-16 h-16" />
              <div>{student.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsCard
