import { useState } from "react";
import toast from "react-hot-toast";

const useAddNote = () => {
  const [loading, setLoading] = useState(false);

  const addNote = async(note: any) => {
    const success = handleInputErrors(note);
    if(!success) return false;
    setLoading(true);
    try{
      const response: Response = await fetch("/api/notes/add",{
        method: "POST",
        body: note,
      });
      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
      toast.success("Note successfully added.")
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
      return true;
    }
  }

  return { loading, addNote }
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

export default useAddNote;