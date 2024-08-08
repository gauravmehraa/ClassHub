import { useState } from "react";
import toast from "react-hot-toast";

const useAddFeedback = () => {
  const [loading, setLoading] = useState(false);

  const addFeedback = async(feedback: any) => {
    setLoading(true);
    try{
      const response: Response = await fetch("/api/feedback/add",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Feedback successfully added.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, addFeedback }
}

export default useAddFeedback;