import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState([] as any);

  useEffect(() => {
    const getStatistics = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch("/api/stats/");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setStatistics(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getStatistics();
  }, []);
  return { loading, statistics };
}

export default useGetStatistics;