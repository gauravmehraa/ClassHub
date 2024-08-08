import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([] as any);
  
  
  useEffect(() => {
    const getFeedback = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch("/api/feedback/");
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setFeedbacks(data);
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

  return { loading, feedbacks };
}

export default useGetFeedback;