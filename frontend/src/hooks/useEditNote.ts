import { useState } from "react";
import toast from "react-hot-toast";

const useEditNote = () => {
  const [loading, setLoading] = useState(false);

  const editNote = async(updatedNote: FormData, noteID: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/notes/edit/${noteID}`,{
        method: "PATCH",
        body: updatedNote,
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Note successfully edited.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, editNote }
}

export default useEditNote;