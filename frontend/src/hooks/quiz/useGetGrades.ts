import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const useGetGrades = (studentID: any) => {
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([] as any);
  const { authUser } = useAuthContext();
  
  useEffect(() => {
    const getGrades = async() => {
      if(studentID === "none" && authUser.role === "Teacher") return;
      setLoading(true);
      try{
        const response: Response = await fetch(`/api/grades/${studentID}`);
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setGrades(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getGrades();
  }, [authUser.role, studentID]);
  return { loading, grades };
}

export default useGetGrades;