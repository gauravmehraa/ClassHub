import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteQuiz = () => {
  const [loading, setLoading] = useState(false);

  const deleteQuiz = async(quizID: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/quiz/delete/${quizID}`,{
        method: "DELETE",
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Quiz successfully deleted.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, deleteQuiz }
}

export default useDeleteQuiz;