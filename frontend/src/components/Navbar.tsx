import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'
import useLogout from '../hooks/auth/useLogout';
import { sleep } from '../utils/sleep';

import { GoGraph } from "react-icons/go";
import { TbBooks } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import { PiStudent, PiExam } from "react-icons/pi";
import { MdHelpOutline } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  const buttonClass = "w-11/12 justify-left items-center flex gap-4 px-6 py-3 rounded-md focus:outline-none"

  const handleClose: any = async(e: MouseEvent) => {
    await sleep(200);
    (document.getElementById("my-drawer-3") as HTMLInputElement).checked = false;
  }

  return (
    <>
    <nav className='max-h-screen min-h-screen border-r-0 border-slate-400 min-w-72 max-w-72 bg-white md:flex flex-col text-black font-roboto hidden'> 
      <img 
        src={'https://www.lms.org/files/assets/logo.png'}
        className='w-6/12 mx-auto my-4'
        alt='ClassHub Logo'
      />
      <div className='mt-auto flex flex-col items-center gap-4 pb-6'>
        <NavLink to="dashboard" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
          <GoGraph className='w-6 h-6'/> Dashboard
        </NavLink>
        {authUser.role === "Teacher" &&
        <NavLink to="students" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
          <PiStudent className='w-6 h-6'/> Students
        </NavLink>
        }
        <NavLink to="feedback" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
          <VscFeedback className='w-6 h-6'/> Feedback
        </NavLink>
        <NavLink to="notes" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
          <TbBooks className='w-6 h-6'/> Notes
        </NavLink>
        <NavLink to="quiz" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
          <PiExam className='w-6 h-6'/> Quizzes
        </NavLink>
        <NavLink to="help" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
          <MdHelpOutline className='w-6 h-6'/> Help
        </NavLink>
      </div>
      <div className='mt-auto flex flex-col items-center gap-6 my-auto font-semibold'>
        <NavLink to="help" className='flex flex-row items-center gap-3'>
          <TbSettings className='w-6 h-6'/> Settings
        </NavLink>
        <div onClick={logout} className='cursor-pointer flex flex-row items-center gap-3'>
          <BiLogOut className='h-6 w-6'/>
        { loading ? <span className='loading loading-spinner'></span>: <div>Logout</div> }
        </div>
      </div>
    </nav>


    {/* Mobile */}
    <nav className='max-w-screen min-w-screen min-h-20 max-h-20 bg-white md:hidden flex-row font-roboto flex z-20'> 
      <div className="flex-none lg:hidden flex items-center">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-white min-h-full w-80 p-4 gap-2">
            <img 
              src={'https://www.lms.org/files/assets/logo.png'}
              className='w-6/12 mx-auto my-6'
              alt='ClassHub Logo'
            />
            <li onClick={handleClose}>
              <NavLink to="dashboard" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
                <GoGraph className='w-6 h-6'/> Dashboard
              </NavLink>
            </li>
            {authUser.role === "Teacher" &&
            <li onClick={handleClose}>
              <NavLink to="students" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
              <PiStudent className='w-6 h-6'/> Students
              </NavLink>
            </li>
            }
            <li onClick={handleClose}>
              <NavLink to="feedback" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
              <VscFeedback className='w-6 h-6'/> Feedback
              </NavLink>
            </li>
            <li onClick={handleClose}>
              <NavLink to="notes" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
              <TbBooks className='w-6 h-6'/> Notes
              </NavLink>
            </li>
            <li onClick={handleClose}>
              <NavLink to="quiz" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
              <PiExam className='w-6 h-6'/> Quizzes
              </NavLink>
            </li>
            <li onClick={handleClose}>
              <NavLink to="help" className={({ isActive }) => isActive ? `${buttonClass} bg-classhub-purple text-white glass` : buttonClass}>
              <MdHelpOutline className='w-6 h-6'/> Help
              </NavLink>
            </li>
            <div className='mt-auto flex flex-col items-center gap-6 pb-8 font-semibold'>
              <NavLink to="help" className='flex flex-row items-center gap-3' onClick={handleClose}>
                <TbSettings className='w-6 h-6'/> Settings
              </NavLink>
              <div onClick={logout} className='cursor-pointer flex flex-row items-center gap-3'>
                <BiLogOut className='h-6 w-6'/>
              { loading ? <span className='loading loading-spinner'></span>: <div>Logout</div> }
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
