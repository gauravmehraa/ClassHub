import StudentCard from '../components/StudentCard';
import useGetStudentsByTeacher from '../hooks/students/useGetStudents';

const Students = () => {
  const { loading, students } = useGetStudentsByTeacher();
  return (
    <div className="flex flex-col text-black w:9/10 sm:w-2/3 p-8">
      <h1 className='text-3xl text-center font-semibold'>Students Dashboard</h1>
      {
        loading ?
        <span className='loading loading-spinner mx-auto text-white'></span>:
        <div className="flex flex-col gap-4 m-4 sm:m-8">
          { Object.keys(students).length === 0?
            <div> No notes to show </div>:
            Object.keys(students).map(function(key) {
              return <StudentCard key={key} course={key} students={students[key]}/>;
          })}
        </div>
        }
    </div>
  )
}

export default Students
