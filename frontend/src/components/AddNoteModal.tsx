import { MdModeEdit } from "react-icons/md";
import { MouseEvent, useState } from "react";
import useEditNote from "../hooks/useEditNote";
//import useAddNote from "../hooks/useAddNote";

const AddNoteModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);

  //const { addNote, loading } = useAddNote();
  const { editNote, loading } = useEditNote();

  const handleCancel: any = async(e: MouseEvent) => {
    setTitle("");
    setDescription("");
    setFile(null);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    let formData = new FormData();
    formData.append("title", title);
    if(description.trim() !== "") formData.append("description", description);
    if(file) formData.append("file", file);
    //await editNote(formData, props.link._id);
    (document.getElementById("note_add") as HTMLDialogElement).close();
    window.location.reload();
  }
  return (
    <div className="flex items-center">
    <button
      onClick={()=>(document.getElementById("note_add") as HTMLDialogElement).showModal()}
      className='btn btn-lg mx-auto bg-gray-400 text-black'
    >Add Note</button>
    <dialog id="note_add" className="modal text-white">
      <div className="modal-box w-11/12 max-w-xl font-normal">
        <h3 className="text-2xl">Add Notes</h3>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
            autoComplete='false'
            autoCapitalize='true'
          />
        </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
            autoComplete='false'
          />
        </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Subject</label>
          <select
            className="grow select select-bordered focus:outline-none"
            value={subject}
            autoComplete="off"
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Document</label>
          <input
            type='file'
            onChange={(e) => setFile(e.target.files![0])}
            className='w-full mt-2 file-input file-input-bordered flex items-center focus:outline-none'
            accept="application/msword, application/vnd.ms-powerpoint, application/pdf"
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

export default AddNoteModal;
