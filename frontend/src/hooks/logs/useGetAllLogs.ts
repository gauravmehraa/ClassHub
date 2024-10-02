import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const useGetAllLogs = () => {
  const [loading, setLoading] = useState(false);
  const [allLogs, setAllLogs] = useState([] as any);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getAllLogs = async() => {
      setLoading(true);
      try{
        if(authUser.role !== "Teacher") return;
        const response: Response = await fetch("/api/logs/all");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setAllLogs(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getAllLogs();
  }, [authUser]);
  return { loading, allLogs };
}

export default useGetAllLogs;