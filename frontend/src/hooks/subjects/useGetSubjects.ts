import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetSubjects = () => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([] as any);

  useEffect(() => {
    const getSubjects = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch("/api/subject/");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        const sorted = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setSubjects(sorted);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getSubjects();
  }, []);
  return { loading, subjects };
}

export default useGetSubjects;