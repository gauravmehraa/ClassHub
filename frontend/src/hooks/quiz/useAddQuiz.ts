import { useState } from "react";
import toast from "react-hot-toast";

const useAddQuiz = () => {
  const [loading, setLoading] = useState(false);

  const addQuiz = async(quiz: any) => {
    console.log(quiz)
    setLoading(true);
    try{
      const response: Response = await fetch("/api/quiz/add",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Quiz successfully added.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, addQuiz }
}

export default useAddQuiz;