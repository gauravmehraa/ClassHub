import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetSubjectsByClass = (classID: string) => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([] as any);

  useEffect(() => {
    const getSubjectsByClass = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch(`/api/subject/class/${classID}`);
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        console.log(data)
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
    getSubjectsByClass();
  }, [classID]);
  return { loading, subjects };
}

export default useGetSubjectsByClass;