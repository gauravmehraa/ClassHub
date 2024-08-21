import { useState } from "react";
import toast from "react-hot-toast";

const useEditStudent = () => {
  const [loading, setLoading] = useState(false);

  const editStudent = async(updatedStudent: any, studentID: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/student/edit/${studentID}`,{
        method: "PATCH",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updatedStudent),
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Student successfully edited.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, editStudent }
}

export default useEditStudent;