import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useGetNotes = () => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState({} as any);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getNotes = async() => {
      setLoading(true);
      try{
        const url = `/api/notes/${authUser.role === "Student"? `class/${authUser.classID}`: ""}`
        const response: Response = await fetch(url);
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setNotes(data);
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
  return { loading, notes };
}

export default useGetNotes;