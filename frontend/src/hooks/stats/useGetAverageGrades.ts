import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const useGetAverageGrades = () => {
  const [loading, setLoading] = useState(false);
  const [averageGrades, setAverageGrades] = useState({} as any);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getAverageGrades = async() => {
      setLoading(true);
      try{
        if(authUser.role !== "Teacher") return;
        const response: Response = await fetch("/api/stats/grades");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setAverageGrades(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getAverageGrades();
  }, []);
  return { loading, averageGrades };
}

export default useGetAverageGrades;