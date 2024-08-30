import { useState } from "react";
import toast from "react-hot-toast";

const useAllotSubject = () => {
  const [loading, setLoading] = useState(false);

  const allotSubject = async(allocation: any) => {
    setLoading(true);
    try{
      const response: Response = await fetch("/api/subject/allocate",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allocation),
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Subject successfully alloted.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, allotSubject }
}

export default useAllotSubject;