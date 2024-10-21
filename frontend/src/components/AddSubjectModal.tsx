import { MouseEvent, useState } from "react";
import useAddSubject from "../hooks/subjects/useAddSubject";
import { sleep } from "../utils/sleep";

const AddSubjectModal = () => {
  const [name, setName] = useState("");
  const { loading, addSubject } = useAddSubject();

  const inputClass = 'w-full mt-2 input input-bordered bg-white flex items-center focus:outline-none'

  const handleCancel: any = async(e: MouseEvent) => {
    setName("");
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    const success = await addSubject({ name });
    (document.getElementById("subject_add") as HTMLDialogElement).close();
    handleCancel(e);
    await sleep(800);
    if(success)window.location.reload();
  }
  return (
    <div className="flex items-center">
      <button
        onClick={()=>(document.getElementById("subject_add") as HTMLDialogElement).showModal()}
        className="mx-auto mt-4 btn btn-md bg-primary text-white border-none"
      >Add Subject</button>
      <dialog id="subject_add" className="modal">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-slate-200">
          <h3 className="text-2xl">Add Subject</h3>

          <div className="mt-6">
            <label className="ml-2 font-semibold">Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              autoComplete='false'
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

export default AddSubjectModal;
