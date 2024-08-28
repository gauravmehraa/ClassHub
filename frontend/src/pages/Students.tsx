import { Link } from 'react-router-dom';
import StudentsCard from '../components/StudentsCard';
import useGetStudentsByTeacher from '../hooks/students/useGetStudents';

const Students = () => {
  const { loading, students } = useGetStudentsByTeacher();
  return (
    <div className="flex flex-col text-black sm:p-8 overflow-auto w-full">
      <h1 className='text-3xl text-center font-semibold'>Students</h1>
      <Link to ="add" className='btn btn-md mx-auto mt-6 bg-classhub-purple text-white border-none cursor-pointer hover:bg-white hover:text-black'>Add Student</Link>
      {
        loading ?
        <span className='loading loading-spinner mx-auto text-white'></span>:
        <div className="flex flex-col gap-4 m-4 sm:m-8">
          { Object.keys(students).length === 0?
            <div> No notes to show </div>:
            Object.keys(students).map(function(key) {
              return <StudentsCard key={key} course={key} students={students[key]}/>;
          })}
        </div>
        }
    </div>
  )
}

export default Students
