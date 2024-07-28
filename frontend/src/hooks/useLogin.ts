import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async(email: string, password: string, role: string) => {
    const success: boolean = handleInputErrors(email, password);
    if(!success) return;

    setLoading(true);
    try{
      const response: Response = await fetch("/api/auth/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email, password })
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
  return {login, loading};
}

function handleInputErrors(email: string, password: string){
  if(!email){
    toast.error("Email cannot be blank");
    return false;
  }
  if(!password){
    toast.error("Enter password");
    return false;
  }
  return true;
}

export default useLogin;