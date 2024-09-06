import { MouseEvent, useState } from "react";
import useAddClass from "../hooks/classes/useAddClass";
import { sleep } from "../utils/sleep";

const AddClassModal = () => {
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("");
  const [seats, setSeats] = useState(1);
  const { loading, addClass } = useAddClass();

  const inputClass = 'w-full mt-2 input input-bordered bg-white flex items-center focus:outline-none'

  const handleCancel: any = async(e: MouseEvent) => {
    setYear("");
    setProgram("");
    setSeats(1);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    await addClass({ year, program, seats });
    (document.getElementById("class_add") as HTMLDialogElement).close();
    await sleep(800);
    window.location.reload();
  }
  return (
    <div className="flex items-center">
      <button
        onClick={()=>(document.getElementById("class_add") as HTMLDialogElement).showModal()}
        className="mx-auto mt-4 btn btn-md bg-primary text-white border-none"
      >Add Class</button>
      <dialog id="class_add" className="modal">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-slate-200">
          <h3 className="text-2xl">Add Class</h3>

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
              className={inputClass}
              value={seats}
              onChange={(e) => setSeats(e.target.value.trim() === ""? 1: parseInt(e.target.value))}
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

export default AddClassModal;
