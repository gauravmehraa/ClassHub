import { MouseEvent, useState } from "react";
import { sleep } from "../utils/sleep";
import { MdModeEdit } from "react-icons/md";
import useEditClass from "../hooks/classes/useEditClass";

const EditClassModal = (props: { currentClass: any }) => {
  const [year, setYear] = useState(props.currentClass.year);
  const [program, setProgram] = useState(props.currentClass.program);
  const [seats, setSeats] = useState(props.currentClass.seats);
  const [subjects, setSubjects] = useState(props.currentClass.subjects);
  const { loading, editClass } = useEditClass();

  const inputClass = 'w-full mt-2 input input-bordered bg-white flex items-center focus:outline-none'

  const handleCancel: any = async(e: MouseEvent) => {
    setYear(props.currentClass.year);
    setProgram(props.currentClass.program);
    setSeats(props.currentClass.seats);
    setSubjects(props.currentClass.subjects);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    const success = await editClass({year, program, seats, subjects}, props.currentClass._id);
    (document.getElementById(`class_edit_${props.currentClass._id}`) as HTMLDialogElement).close();
    handleCancel(e);
    await sleep(800);
    if(success)window.location.reload();
  }
  return (
    <div className="flex items-center ml-4">
      <MdModeEdit
        onClick={()=>(document.getElementById(`class_edit_${props.currentClass._id}`) as HTMLDialogElement).showModal()}
        className='text-black h-6 w-6 cursor-pointer hover:text-red-400'
      />
      <dialog id={`class_edit_${props.currentClass._id}`} className="modal">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-slate-200">
          <h3 className="text-2xl">Edit Class</h3>

          <div className="mt-6">
            <label className="ml-2 font-semibold">Year</label>
            <input
              type='text'
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={inputClass}
              autoComplete='false'
              required={true}
            />
          </div>

          <div className="mt-6">
            <label className="ml-2 font-semibold">Program</label>
            <input
              type='text'
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className={inputClass}
              autoComplete='false'
              required={true}
            />
          </div>

          <div className="mt-6">
            <label className="ml-2 font-semibold">Seats</label>
            <input
              type="number"
              step={1}
              min={1}
              max={120}
              className={`${inputClass} disabled:bg-gray-300 disabled:text-black disabled:border-none`}
              value={seats}
              disabled
              required={true}
            />
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

export default EditClassModal;
