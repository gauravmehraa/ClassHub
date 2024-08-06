import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetStudentsByTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([] as any);

  useEffect(() => {
    const getStudentsByTeacher = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch("/api/student/");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setStudents(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getStudentsByTeacher();
  }, []);
  return { loading, students };
}

export default useGetStudentsByTeacher;