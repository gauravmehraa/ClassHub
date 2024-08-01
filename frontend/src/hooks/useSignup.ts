import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async(signupData: any) => {
    const success: boolean = handleInputErrors(signupData);
    if(!success) return;

    const qualification: string[] = [];
    signupData.qualification.split(",").forEach((qual: any) => {
      qualification.push(qual.trim());
    });

    setLoading(true);
    try{
      const response: Response = await fetch("/api/auth/signup",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Teacher",
          name: signupData.name,
          email: signupData.email, 
          password: signupData.password,
          confirmPassword: signupData.confirmPassword,
          secret: signupData.secret,  
          qualification 
        })
      });

      const data = await response.json();
      if(data.error){
        throw new Error(data.error);
      }

      //cache
      localStorage.setItem("lms-user", JSON.stringify(data));

      //context
      setAuthUser(data);
      
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setLoading(false);
    }
  }
  return { signup, loading };
}

function handleInputErrors(data: any){
  if(!data.name || !data.email || !data.password || !data.confirmPassword || !data.qualification || !data.secret){
    let emptyField: string = '';
    if(!data.name) emptyField = 'Name';
    else if(!data.email) emptyField = 'Email';
    else if(!data.password) emptyField = 'Password';
    else if(!data.confirmPassword) emptyField = 'Confirming password';
    else if(!data.qualification) emptyField = 'Entering qualification'
    else emptyField = 'Secret Phrase';
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

export default useSignup;