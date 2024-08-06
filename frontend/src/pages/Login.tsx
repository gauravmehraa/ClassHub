import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/auth/useLogin";
import { IoEye, IoEyeOff, IoPerson, IoKey } from "react-icons/io5";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, login } = useLogin();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await login(email, password, role);
  }

  return (
    <div className="flex flex-col text-white gap-4 items-center w-96 mx-auto">
      <h1 className="text-3xl">Login</h1>
      <form onSubmit={handleSubmit} className="w-full px-8">

        <div className="input input-bordered flex items-center gap-2 my-4 focus:outline-none">
          <IoPerson/>
          <input
            type="email"
            placeholder="Email"
            className="grow"
            required={true}
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setShowPassword(!showPassword)}>
            { showPassword ? <IoEye/>: <IoEyeOff/>}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <select
            className="grow select select-bordered focus:outline-none"
            value={role}
            autoComplete="off"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <div className="mt-2 mb-4 text-sm hover:underline">
          <Link to="/signup">don't have an account? create one.</Link>
        </div>

        <div>
          <button type="submit" className="btn btn-success w-full" disabled={loading}>
            { loading ? <span className='loading loading-spinner'></span>: "Login" }
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;