import { useState } from 'react'
import toast from 'react-hot-toast';

const useAddStudent = () => {
  const [loading, setLoading] = useState(false);

  const addStudent = async(signupData: any) => {
    const success: boolean = handleInput(signupData);
    if(!success) return;

    const requestData = {
      name: signupData.name,
      email: signupData.email, 
      password: signupData.password,
      confirmPassword: signupData.confirmPassword,
      dateOfBirth: signupData.dateOfBirth,  
      address: signupData.address,
      phoneNumber: signupData.phoneNumber,
      gender: signupData.gender,
      classID: signupData.classID
    }

    setLoading(true);
    try{
      const response: Response = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return { addStudent, loading };
}

function handleInput(data: any){
  if(!data.name || !data.email || !data.password || !data.confirmPassword || !data.dateOfBirth || !data.address || !data.phoneNumber || !data.gender || !data.classID){
    let emptyField: string = '';
    if(!data.name) emptyField = 'Name';
    else if(!data.email) emptyField = 'Email';
    else if(!data.password) emptyField = 'Password';
    else if(!data.confirmPassword) emptyField = 'Confirming password';
    else if(!data.dateOfBirth) emptyField = 'Date of birth'
    else if(!data.address) emptyField = 'Address'
    else if(!data.phoneNumber) emptyField = 'Phone Number'
    else if(!data.gender) emptyField = 'Gender'
    else emptyField = 'Selecting class';
    toast.error(`${emptyField} is required`);
    return false;
  }
  if(data.password !== data.confirmPassword){
    toast.error("Passwords should match");
    return false;
  }
  if(data.password.length < 6){
    toast.error("Weak password");
    return false;
  }
  return true;
}

export default useAddStudent;