import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const useGetLogs = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([] as any);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getLogs = async() => {
      setLoading(true);
      try{
        if(authUser.role !== "Teacher") return;
        const response: Response = await fetch("/api/logs");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setLogs(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getLogs();
  }, [authUser]);
  return { loading, logs };
}

export default useGetLogs;