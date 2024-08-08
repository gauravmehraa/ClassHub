import { MdModeEdit } from "react-icons/md";
import { MouseEvent, useState } from "react";
import useEditNote from "../hooks/notes/useEditNote";
import { sleep } from "../utils/sleep";

const EditNoteModal = (props: { subjectname: string, link: any }) => {
  const [title, setTitle] = useState(props.link.title);
  const [description, setDescription] = useState(props.link.description || "");
  const [file, setFile] = useState<File | null>(null);

  const { editNote, loading } = useEditNote();

  const handleCancel: any = async(e: MouseEvent) => {
    setTitle(props.link.title);
    setDescription(props.link.description || "");
    setFile(null);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    let formData = new FormData();
    formData.append("title", title);
    if(description.trim() !== "") formData.append("description", description);
    if(file) formData.append("file", file);
    await editNote(formData, props.link._id);
    (document.getElementById(`note_edit_${props.link._id}`) as HTMLDialogElement).close();
    await sleep(800);
    window.location.reload();
  }
  return (
    <div className="flex items-center">
    <MdModeEdit
      onClick={()=>(document.getElementById(`note_edit_${props.link._id}`) as HTMLDialogElement).showModal()}
      className='text-black h-5 w-5 cursor-pointer hover:text-red-400'
    />
    <dialog id={`note_edit_${props.link._id}`} className="modal text-white">
      <div className="modal-box w-11/12 max-w-xl font-normal">
        <h3 className="text-2xl">Edit Note</h3>

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
          <input
            type='text'
            value={props.subjectname}
            disabled
            className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
            autoComplete='false'
          />
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

export default EditNoteModal;
