import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteFeedback = () => {
  const [loading, setLoading] = useState(false);

  const deleteFeedback = async(feedbackID: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/feedback/delete/${feedbackID}`,{
        method: "DELETE",
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Feedback successfully deleted.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, deleteFeedback }
}

export default useDeleteFeedback;