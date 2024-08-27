import { useState } from "react";
import toast from "react-hot-toast";

const useEditClass = () => {
  const [loading, setLoading] = useState(false);

  const editClass = async(updatedClass: any, classID: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/class/edit/${classID}`,{
        method: "PATCH",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updatedClass),
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

  return { loading, editClass }
}

export default useEditClass;