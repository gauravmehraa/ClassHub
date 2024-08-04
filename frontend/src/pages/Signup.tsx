import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { IoEye, IoEyeOff, IoPerson, IoKey, IoShieldCheckmark, IoSchool } from "react-icons/io5";

const Signup = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    secret: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, signup } = useSignup();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await signup(data);
  }

  return (
    <div className="flex flex-col text-white gap-4 items-center w-96 mx-auto">
      <h1 className="text-3xl">Signup</h1>
      <form onSubmit={handleSubmit} className="w-full px-8">

        <div className="input input-bordered flex items-center gap-2 my-4 focus:outline-none">
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
        
        <div className="input input-bordered flex items-center gap-2 my-4 focus:outline-none">
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

        <div className="input input-bordered flex items-center gap-2 my-4 focus:outline-none">
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

        <div className="input input-bordered flex items-center gap-2 my-4 focus:outline-none">
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

        <div className="input input-bordered flex items-center gap-2 my-4 focus:outline-none">
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

        <div className="input input-bordered flex items-center gap-2 my-4 focus:outline-none">
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

        <div className="mt-2 mb-4 text-sm hover:underline">
          <Link to="/login">already have an account?</Link>
        </div>

        <div>
          <button type="submit" className="btn btn-success w-full" disabled={loading}>
            { loading ? <span className='loading loading-spinner'></span>: "Register" }
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup;