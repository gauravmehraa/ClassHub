import { useState } from "react";
import toast from "react-hot-toast";

const useEditFeedback = () => {
  const [loading, setLoading] = useState(false);

  const editFeedback = async(updatedFeedback: any, feedbackID: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/feedback/edit/${feedbackID}`,{
        method: "PATCH",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updatedFeedback),
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Feedback successfully edited.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, editFeedback }
}

export default useEditFeedback;