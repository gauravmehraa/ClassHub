import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetGrades = (studentID: any) => {
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([] as any);

  useEffect(() => {
    const getFeedback = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch(`/api/grades/${studentID}`);
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setGrades(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getFeedback();
  }, []);
  return { loading, grades };
}

export default useGetGrades;