import { FormEvent, useState } from 'react'
import useLogin from "../hooks/auth/useLogin";
import { IoEye, IoEyeOff, IoPerson, IoKey } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, login } = useLogin();

  const inputClass = "input input-bordered flex items-center gap-2 my-4 mx-auto focus:outline-none bg-white sm:w-3/4";

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await login(email, password, role);
  }

  return (
    <div className=' flex flex-col items-center sm:items-start sm:flex-row flex-wrap mx-auto w-10/12 sm:w-8/12 py-8 my-4 text-black bg-white rounded-2xl text-center'>
      <div className='w-full h-full md:w-6/12 flex justify-center items-center my-auto'>
        <img
          src={'https://i.pinimg.com/564x/cf/66/33/cf66334166ddd4c120148dc07c492449.jpg'}
          className='rounded-2xl h-5/6 w-5/6 p-6'
          alt='hero'
        />
      </div>

      <div className="md:w/1-12 divider divider-horizontal"></div>

      <div className='w-full md:w-5/12 h-full'>
        <img 
          src={'https://www.lms.org/files/assets/logo.png'}
          className='w-6/12 mx-auto my-6'
          alt='ClassHub Logo'
        />

        <form onSubmit={handleSubmit} className="w-full px-8 block my-auto">
          <div className='text-black text-xl font-semibold'>Welcome to ClassHub!</div>

          <div className={inputClass}>
            <IoPerson/>
            <input
              type="email"
              placeholder="Email"
              className="grow"
              required={true}
              autoComplete={"off"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={inputClass}>
            <IoKey/>
            <input
              type={showPassword? "text": "password"}
              placeholder="Password"
              className="grow"
              required={true}
              autoComplete={"off"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              { showPassword ? <IoEye/>: <IoEyeOff/>}
            </div>
          </div>

          <div className="flex gap-2 mt-4 sm:w-3/4 mx-auto">
            <select
              className="grow select select-bordered focus:outline-none bg-white"
              value={role}
              autoComplete="off"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <button type="submit" className="btn bg-classhub-purple border-none text-white block mx-auto my-4" disabled={loading}>
            { loading ? <span className='loading loading-spinner bg-classhub-purple'></span>: "Login" }
          </button>

        </form>

        <div className="mt-2 mb-4 text-sm text-black">
          New to ClassHub?
          <Link to="/signup" className='hover:underline text-classhub-purple'> Register Now</Link>
        </div>

      </div>
    </div>
  )
}

export default Login;
