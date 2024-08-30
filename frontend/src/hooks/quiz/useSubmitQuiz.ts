import { useState } from "react";
import toast from "react-hot-toast";
import { sleep } from "../../utils/sleep";

const useSubmitQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({} as any);

  const submitQuiz = async(submittedData: any) => {
    setLoading(true);
    try{
      const response: Response = await fetch("/api/quiz/submit",{
        method: "POST",
        headers: { 'Content-Type': 'application/json '},
        body: JSON.stringify(submittedData),
      });
      await sleep(800);
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      setCorrectAnswers(data);
      toast.success("Quiz successfully submitted.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, submitQuiz, correctAnswers }
}

export default useSubmitQuiz;