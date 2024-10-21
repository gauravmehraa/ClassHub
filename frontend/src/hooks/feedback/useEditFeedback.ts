import { useState } from "react";
import toast from "react-hot-toast";

const useEditFeedback = () => {
  const [loading, setLoading] = useState(false);

  const editFeedback = async(updatedFeedback: any, feedbackID: string) => {
    const success = handleInputErrors(updatedFeedback);
    if(!success) return false;
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
      return true;
    }
  }

  return { loading, editFeedback }
}

function handleInputErrors(feedback: any){
  if(!feedback.rating){
    toast.error("Rating cannot be blank");
    return false;
  }
  return true;
}

export default useEditFeedback;