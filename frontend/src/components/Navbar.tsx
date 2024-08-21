import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import useLogout from '../hooks/auth/useLogout';

const Navbar = () => {
  
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  return (
    <nav className='max-h-screen min-h-screen min-w-60 max-w-60 bg-white flex flex-col text-black font-roboto'> 
      <div>logo</div>
      <div className='mt-auto flex flex-col items-center gap-4 py-10'>
        { authUser.role === "Teacher" && <Link to="students">Students</Link> }
        <Link to="feedback">Feedback</Link>
        <Link to="notes">Notes</Link>
        <Link to="quiz">Quizzes</Link>
      </div>
      <div className='mt-auto flex flex-col items-center gap-4 py-10'>
        <div>Settings</div>
        <div onClick={logout} className='cursor-pointer'>
        { loading ? <span className='loading loading-spinner'></span>: "Logout" }
      </div>
      </div>
    </nav>
  )
}

export default Navbar
