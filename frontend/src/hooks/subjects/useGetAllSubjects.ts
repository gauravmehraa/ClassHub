import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetAllSubjects = () => {
  const [loading, setLoading] = useState(false);
  const [allSubjects, setAllSubjects] = useState([] as any);

  useEffect(() => {
    const getAllSubjects = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch("/api/subject/all");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        const sorted = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setAllSubjects(sorted);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getAllSubjects();
  }, []);
  return { loading, allSubjects };
}

export default useGetAllSubjects;