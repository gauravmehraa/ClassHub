import { MouseEvent, useState } from "react";
import { sleep } from "../utils/sleep";
import useGetClasses from "../hooks/classes/useGetClasses";
import useEditStudent from "../hooks/students/useEditStudent";

const EditStudentModal = (props: { student: any }) => {

  const { classes } = useGetClasses();
  const { loading, editStudent } = useEditStudent();

  const inputClass = 'w-full mt-2 bg-white input input-bordered flex items-center focus:outline-none border-2 border-gray-200';

  const [data, setData] = useState({
    name: props.student.name,
    address: props.student.address,
    dateOfBirth: props.student.dateOfBirth,
    email: props.student.email,
    phoneNumber: props.student.phoneNumber,
    gender: props.student.gender,
    classID: props.student.classID._id,
  });

  const handleCancel: any = async(e: MouseEvent) => {
    setData({
      name: props.student.name,
      address: props.student.address,
      dateOfBirth: props.student.dateOfBirth,
      email: props.student.email,
      phoneNumber: props.student.phoneNumber,
      gender: props.student.gender,
      classID: props.student.classID._id
    });
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    await editStudent(data, props.student._id);
    (document.getElementById(`student_edit_${props.student._id}`) as HTMLDialogElement).close();
    await sleep(800);
    window.location.reload();
  }
  return (
    <div className="flex items-center">
    <div
      onClick={()=>(document.getElementById(`student_edit_${props.student._id}`) as HTMLDialogElement).showModal()}
      className='btn btn-md bg-classhub-purple text-white border-none cursor-pointer hover:bg-white hover:text-black'
    >Edit Student</div>
    <dialog id={`student_edit_${props.student._id}`} className="modal focus:outline-none">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-white">
        <h3 className="text-2xl">Edit Student</h3>

        <div className="mt-4">
          <label className="ml-2 font-semibold">Name</label>
          <input
            type='text'
            value={data.name}
            onChange={(e) => setData({...data, name: e.target.value})}
            className={inputClass}
            autoComplete='false'
          />
        </div>

        <div className="mt-4">
          <label className="ml-2 font-semibold">Email</label>
          <input
            type='email'
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            className={inputClass}
            autoComplete='false'
          />
        </div>

        <div className="mt-4">
          <label className="ml-2 font-semibold">Date of Birth</label>
          <input
            type='date'
            defaultValue={new Date(data.dateOfBirth).toISOString().split('T')[0]}
            onChange={(e) => setData({...data, dateOfBirth: new Date(e.target.value).toISOString()})}
            className={inputClass}
            autoComplete='false'
          />
        </div>

        <div className="mt-4">
          <label className="ml-2 font-semibold">Address</label>
          <textarea
            rows={3}
            className='textarea textarea-bordered border-2 border-gray-200 bg-white w-full mt-2 flex items-center focus:outline-none'
            value={data.address}
            onChange={(e) => setData({...data, address: e.target.value})}
            autoComplete="false"
          >
          </textarea>
        </div>

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

        <div className="mt-4">
          <label className="ml-2 font-semibold">Gender</label>
          <label className="w-full mt-2 grow swap input bg-white input-bordered border-2 border-gray-200">
            <input type="checkbox" onClick={()=>setData({...data, gender: data.gender === 'Female'? 'Male': 'Female'})}/>
            <div className="swap-off">{data.gender === "Male"? "Male": "Female"}</div>
            <div className="swap-on">{data.gender === "Female"? "Female": "Male"}</div>
          </label>
        </div>

        <div className="mt-4">
          <label className="ml-2 font-semibold">Class</label>
          <select
            className="grow select max-w-xs sm:max-w-auto mt-2 ml-2 select-bordered truncate bg-white focus:outline-none placeholder:text-black border-2 border-gray-200"
            autoComplete="off"
            onChange={(e) => e.target.value === ""? props.student.classID: setData({...data, classID: e.target.value})}
            required={true}
          >
            <option value="" disabled={data.classID !== ""}>Select Class</option>
            { typeof(classes) !== "undefined" && classes.map((currentClass: any) => (
              <option key={currentClass._id} value={currentClass._id} selected={currentClass._id === props.student.classID._id}>{currentClass.year} {currentClass.program}</option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn m-2 btn-error" onClick={handleCancel}>Cancel</button>
            <div className="btn m-2 btn-success" onClick={handleSubmit}>
              { loading ? <span className='loading loading-spinner'></span>: "Save" }
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  )
}

export default EditStudentModal;