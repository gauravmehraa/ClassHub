import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const useGetQuizzes = () => {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([] as any);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getQuizzes = async() => {
      setLoading(true);
      try{
        const response: Response = await fetch(`/api/quiz/${authUser.role === "Teacher"? "teacher": ""}`);
        const data = await response.json();
        if(data.error){
          throw new Error(data.error);
        }
        setQuizzes(data);
      }
      catch (error){
        toast.error((error as Error).message);
      }
      finally{
        setLoading(false);
      }
    }
    getQuizzes();
  }, []);
  return { loading, quizzes };
}

export default useGetQuizzes;