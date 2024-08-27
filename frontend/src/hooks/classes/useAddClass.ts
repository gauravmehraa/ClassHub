import { useState } from "react";
import toast from "react-hot-toast";

const useAddClass = () => {
  const [loading, setLoading] = useState(false);

  const addClass = async(newClass: any) => {
    setLoading(true);
    try{
      const response: Response = await fetch("/api/class/add",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClass),
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Class successfully added.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, addClass }
}

export default useAddClass;