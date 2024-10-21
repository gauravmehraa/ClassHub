import { useState } from "react";
import toast from "react-hot-toast";

const useAddClass = () => {
  const [loading, setLoading] = useState(false);

  const addClass = async(newClass: any) => {
    const success: boolean = handleInputErrors(newClass);
    if(!success) return false;
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
      return true;
    }
  }

  return { loading, addClass }
}

function handleInputErrors(newClass: any){
  if(!newClass.year){
    toast.error("Year cannot be blank");
    return false;
  }
  if(!newClass.program){
    toast.error("Program cannot be blank");
    return false;
  }
  if(!newClass.seats){
    toast.error("Seats cannot be blank");
    return false;
  }
  return true;
}

export default useAddClass;