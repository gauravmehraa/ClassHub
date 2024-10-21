import { useState } from "react";
import toast from "react-hot-toast";

const useEditNote = () => {
  const [loading, setLoading] = useState(false);

  const editNote = async(updatedNote: any, noteID: string) => {
    const success = handleInputErrors(updatedNote);
    if(!success) return false;
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

function handleInputErrors(note: any){
  for(const value of note.entries()){
    if(!value[1]){
      toast.error(`${value[0] === 'subjectID'? 'Subject': value[0]} cannot be blank`);
      return false;
    }
  }
  return true;
}

export default useEditNote;