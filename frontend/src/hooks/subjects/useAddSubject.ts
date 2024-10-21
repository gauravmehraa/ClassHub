import { useState } from "react";
import toast from "react-hot-toast";

const useAddSubject = () => {
  const [loading, setLoading] = useState(false);

  const addSubject = async(newSubject: any) => {
    const success = handleInputErrors(newSubject);
    if(!success) return false;
    setLoading(true);
    try{
      const response: Response = await fetch("/api/subject/add",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubject),
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Subject successfully added.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
      return true;
    }
  }

  return { loading, addSubject }
}

function handleInputErrors(subject: any){
  if(!subject.name){
    toast.error("Subject name cannot be blank");
    return false;
  }
  return true;
}

export default useAddSubject;