import { Link } from 'react-router-dom';
import StudentsCard from '../components/StudentsCard';
import useGetStudentsByTeacher from '../hooks/students/useGetStudents';
import { useEffect, useState } from 'react';
import { MdOutlineSearchOff} from 'react-icons/md';

const Students = () => {
  const { loading, students } = useGetStudentsByTeacher();
  const [classes, setClasses] = useState(Object.keys(students));
  const [currentClass, setCurrentClass] = useState("");
  useEffect(() => {
    setClasses(Object.keys(students));
    setCurrentClass(classes[0]);
  }, [students]);
  return (
    <div className="flex flex-col text-black sm:p-8 overflow-auto w-full">
      <div>
        <h1 className='hidden md:block text-3xl text-center font-semibold mt-8 sm:mt-0'>Students</h1>
      </div>
      <Link to ="add" className='btn btn-md mx-auto mt-6 bg-primary text-white border-none cursor-pointer hover:bg-white hover:text-black'>Add Student</Link>
      <div className="mt-6 flex flex-col mx-auto w-11/12 sm:w-auto">
        <select
          className="grow text-lg text-wrap h-fit select select-bordered bg-white focus:outline-none ml-2"
          value={currentClass}
          autoComplete="off"
          onChange={(e) => setCurrentClass(e.target.value)}
        >
          <option value="" disabled={currentClass !== ""}>Select Class</option>
          { typeof(classes) !== "undefined" && classes.map((element: any, index: number) => (
            <option key={index} value={element} className='text-lg text-wrap'>{element}</option>
          ))}
        </select>
      </div>
      {
        loading ?
        <span className='loading loading-spinner mx-auto my-auto text-primary'></span>:
        <div className="flex flex-col gap-4 m-4 sm:m-8">
          { Object.keys(students).length === 0?
            <div className='font-semibold text-2xl flex gap-2 items-center my-auto mx-auto'> <MdOutlineSearchOff className='text-primary w-8 h-8'/> No students </div>:
            currentClass ? <StudentsCard key={currentClass} course={currentClass} students={students[currentClass]}/>: null
          }
        </div>
        }
    </div>
  )
}

export default Students
