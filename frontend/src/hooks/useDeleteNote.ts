import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteNote = () => {
  const [loading, setLoading] = useState(false);

  const deleteNote = async(noteID: string) => {
    setLoading(true);
    try{
      const response: Response = await fetch(`/api/notes/delete/${noteID}`,{
        method: "DELETE",
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Note successfully deleted.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }

  return { loading, deleteNote }
}

export default useDeleteNote;