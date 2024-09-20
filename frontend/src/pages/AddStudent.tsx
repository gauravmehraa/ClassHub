import React, { FormEvent, useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import useGetClasses from '../hooks/classes/useGetClasses';
import useAddStudent from '../hooks/students/useAddStudent';

const AddStudent = () => {
  const { addStudent, loading } = useAddStudent();
  const { classes } = useGetClasses();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputClass = 'w-full mt-2 input input-bordered flex items-center bg-white focus:outline-none';

  const [data, setData] = useState({
    role: "Student",
    name: '', email: '', password: '', confirmPassword: '', dateOfBirth: '', address: '',
    phoneNumber: '', gender: 'Male', classID: ''
  });

  const handleReset: any = async(e: FormEvent) => {
    setData({
      role: "Student",
      name: '', email: '', password: '', confirmPassword: '', dateOfBirth: '', address: '',
      phoneNumber: '', gender: 'Male', classID: ''
    });
  }

  const handleSubmit: any = async(e: FormEvent) => {
    e.preventDefault();
    await addStudent(data);
    setData({
      role: "Student",
      name: '', email: '', password: '', confirmPassword: '', dateOfBirth: '', address: '',
      phoneNumber: '', gender: 'Male', classID: ''
    });
  }

  return (
    <div className="flex flex-col text-black p-8 overflow-auto w-full">

      <h3 className="hidden md:block text-2xl text-center">Register Student</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        
        {/* Name */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Name</label>
          <input
            type='text'
            value={data.name}
            onChange={(e) => setData({...data, name: e.target.value})}
            className={inputClass}
            autoComplete='false'
            autoCapitalize='true'
            required={true}
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Email</label>
          <input
            type='email'
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            className={inputClass}
            autoComplete='false'
            required={true}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Password</label>
          <div className={inputClass}>
            <input
              type={showPassword? "text": "password"}
              className="grow"
              required={true}
              autoComplete="off"
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
            />
            <div onClick={() => setShowPassword(!showPassword)}>{ showPassword ? <IoEye/>: <IoEyeOff/>}</div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Confirm Password</label>
          <div className={inputClass}>
            <input
              type={showConfirmPassword? "text": "password"}
              className="grow"
              required={true}
              autoComplete="off"
              value={data.confirmPassword}
              onChange={(e) => setData({...data, confirmPassword: e.target.value})}
            />
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{ showConfirmPassword ? <IoEye/>: <IoEyeOff/>}</div>
          </div>
        </div>

        {/* DOB */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Date of Birth</label>
          <input
            type='date'
            onChange={(e) => setData({...data, dateOfBirth: new Date(e.target.value).toISOString()})}
            className={inputClass}
            autoComplete='false'
            autoCapitalize='true'
            required={true}
          />
        </div>

        {/* Address */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Address</label>
          <textarea
            rows={3}
            className='w-full mt-2 textarea textarea-bordered bg-white flex items-center focus:outline-none'
            value={data.address}
            onChange={(e) => setData({...data, address: e.target.value})}
            autoComplete="false"
            required={true}
          >
          </textarea>
        </div>

        {/* Phone Number */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Phone Number</label>
          <input
            type='tel'
            value={data.phoneNumber}
            onChange={(e) => setData({...data, phoneNumber: e.target.value})}
            className={inputClass}
            autoComplete='false'
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            required={true}
          />
        </div>

        {/* Gender */}
        <div className="mt-4">
          <label className="ml-2 font-semibold">Gender</label>
          <label className="w-full mt-2 grow swap input bg-white input-bordered">
            <input type="checkbox" onClick={()=>setData({...data, gender: data.gender === 'Female'? 'Male': 'Female'})}/>
            <div className="swap-off">Male</div>
            <div className="swap-on">Female</div>
          </label>
        </div>

        {/* Class */}
        <div className="mt-4 flex flex-col">
          <label className="ml-2 font-semibold">Class</label>
          <select
            className="grow select max-w-sm sm:max-w-auto mt-2 ml-2 select-bordered truncate bg-white focus:outline-none placeholder:text-black"
            autoComplete="off"
            onChange={(e) => e.target.value === ""? null: setData({...data, classID: e.target.value})}
            required={true}
          >
            <option value="" disabled={data.classID !== ""}>Select Class</option>
            { typeof(classes) !== "undefined" && classes.map((currentClass: any) => (
              <option key={currentClass._id} className='truncate' value={currentClass._id}>{currentClass.year} {currentClass.program}</option>
            ))}
          </select>
        </div>
        
        <div className='mt-6 flex justify-end'>
          <button type='reset' className="btn m-2 btn-info"> Reset </button>
          <button type='submit' className="btn m-2 btn-success">
            { loading ? <span className='loading loading-spinner'></span>: "Register" }
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddStudent
