import { useState } from "react";
import toast from "react-hot-toast";

const useEditStudent = () => {
  const [loading, setLoading] = useState(false);

  const editStudent = async(updatedStudent: any, studentID: string) => {
    const success = handleInput(updatedStudent);
    if(!success) return false;
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
      return true;
    }
  }

  return { loading, editStudent }
}

function handleInput(data: any){
  if(!data.name || !data.email || !data.dateOfBirth || !data.address || !data.phoneNumber || !data.gender || !data.classID){
    let emptyField: string = '';
    if(!data.name) emptyField = 'Name';
    else if(!data.email) emptyField = 'Email';
    else if(!data.dateOfBirth) emptyField = 'Date of birth'
    else if(!data.address) emptyField = 'Address'
    else if(!data.phoneNumber) emptyField = 'Phone Number'
    else if(!data.gender) emptyField = 'Gender'
    else emptyField = 'Selecting class';
    toast.error(`${emptyField} is required`);
    return false;
  }
  return true;
}

export default useEditStudent;