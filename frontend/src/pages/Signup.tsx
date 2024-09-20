import { FormEvent, useState } from 'react'
import { IoEye, IoEyeOff, IoPerson, IoKey, IoSchool, IoShieldCheckmark } from "react-icons/io5";
import { Link } from 'react-router-dom';
import useSignup from '../hooks/auth/useSignup';

const Signup = () => {

  const [data, setData] = useState({
    role: "Teacher",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    gender: "Male",
    secret: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputClass = "input input-bordered flex items-center gap-2 my-4 mx-auto focus:outline-none bg-white sm:w-3/4";

  const { loading, signup } = useSignup();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await signup(data);
  }

  return (
    <div className='h-fit my-auto flex flex-col items-center md:items-start md:flex-row flex-wrap mx-auto w-11/12 md:w-8/12 py-8 text-black bg-white rounded-2xl text-center'>
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

        <form onSubmit={handleSubmit} className="w-full px-8">
        <div className='text-black text-xl font-semibold'>Create Faculty Account</div>

          <div className={inputClass}>
            <IoPerson/>
            <input
              type="text"
              placeholder="Name"
              className="grow"
              required={true}
              autoComplete="off"
              value={data.name}
              onChange={(e) => setData({...data, name: e.target.value})}
            />
          </div>

          <div className={inputClass}>
            <IoPerson/>
            <input
              type="email"
              placeholder="Email"
              className="grow"
              required={true}
              autoComplete="off"
              value={data.email}
              onChange={(e) => setData({...data, email: e.target.value})}
            />
          </div>

          <div className={inputClass}>
            <IoKey/>
            <input
              type={showPassword? "text": "password"}
              placeholder="Password"
              className="grow"
              required={true}
              autoComplete="off"
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
            />
            <div onClick={() => setShowPassword(!showPassword)}>{ showPassword ? <IoEye/>: <IoEyeOff/>}</div>
          </div>

          <div className={inputClass}>
            <IoKey/>
            <input
              type={showConfirmPassword? "text": "password"}
              placeholder="Confirm Password"
              className="grow"
              required={true}
              autoComplete="off"
              value={data.confirmPassword}
              onChange={(e) => setData({...data, confirmPassword: e.target.value})}
            />
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{ showConfirmPassword ? <IoEye/>: <IoEyeOff/>}</div>
          </div>

          <div className={inputClass}>
            <IoShieldCheckmark/>
            <input
              type="text"
              placeholder="Secret Phrase"
              className="grow"
              required={true}
              autoComplete="off"
              value={data.secret}
              onChange={(e) => setData({...data, secret: e.target.value})}
            />
          </div>

          <div className="my-4 mx-auto focus:outline-none bg-white sm:w-3/4">
            <label className="w-full mt-2 grow swap input bg-white input-bordered">
              <input type="checkbox" onClick={()=>setData({...data, gender: data.gender === 'Female'? 'Male': 'Female'})}/>
              <div className="swap-off">Male</div>
              <div className="swap-on">Female</div>
            </label>
          </div>

          <div className={inputClass}>
            <IoSchool/>
            <input
              type="text"
              placeholder="Qualifications (comma separated)"
              className="grow"
              required={true}
              autoComplete="off"
              value={data.qualification}
              onChange={(e) => setData({...data, qualification: e.target.value})}
            />
          </div>

          <button type="submit" className="btn bg-primary border-none text-white block mx-auto my-4" disabled={loading}>
            { loading ? <span className='loading loading-spinner bg-primary'></span>: "Register" }
          </button>

        </form>

        <div className="mt-2 mb-4 text-sm text-black">
          Already have an Account?
          <Link to="/login" className='hover:underline text-primary'> Login</Link>
        </div>

      </div>
    </div>
  )
}

export default Signup;
