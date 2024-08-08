import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetClasses = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([] as any);

  useEffect(() => {
    const getNotes = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch("/api/class");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setClasses(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getNotes();
  }, []);
  return { loading, classes };
}

export default useGetClasses;