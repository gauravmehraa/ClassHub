import { useState } from "react";
import toast from "react-hot-toast";

const useAddQuiz = () => {
  const [loading, setLoading] = useState(false);

  const addQuiz = async(quiz: any) => {
    const success = handleInputErrors(quiz);
    if(!success) return false;
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
      return true;
    }
  }

  return { loading, addQuiz }
}

function handleInputErrors(quiz: any){
  if(!quiz.topic){
    toast.error("Topic cannot be blank");
    return false;
  }
  if(!quiz.subjectID){
    toast.error("Subject cannot be blank");
    return false;
  }
  if(quiz.questions.length === 0){
    toast.error("Questions cannot be blank");
    return false;
  }
  for(const question of quiz.questions){
    if(!question.question){
      toast.error("Question cannot be blank");
      return false;
    }
    if(!question.options){
      toast.error("Options cannot be blank");
      return false;
    }
    if(!question.answer){
      toast.error("Answer cannot be blank");
      return false;
    }
    if(!question.score){
      toast.error("Score cannot be blank");
      return false;
    }
  }
  if(quiz.questions.length === 0){
    toast.error("Questions cannot be blank");
    return false;
  }
  return true;
}

export default useAddQuiz;