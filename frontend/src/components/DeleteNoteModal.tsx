import { BsFillTrash3Fill } from "react-icons/bs";
import { MouseEvent } from "react";
import useDeleteNote from "../hooks/notes/useDeleteNote";

const DeleteNoteModal = (props: { subjectname: string, link: any }) => {
  const { deleteNote, loading } = useDeleteNote();
  const handleSubmit = async(e: MouseEvent) => {
    await deleteNote(props.link._id);
  }
  return (
    <div className="flex items-center">
    <BsFillTrash3Fill
      onClick={()=>(document.getElementById(`note_delete_${props.link._id}`) as HTMLDialogElement).showModal()}
      className='text-black h-4 w-4 cursor-pointer hover:text-red-400'
    />
    <dialog id={`note_delete_${props.link._id}`} className="modal">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-slate-200">
        <h3 className="text-xl">Delete
          <span className="text-xl"><b> {props.link.title}</b></span>?
        </h3>
        <p className="py-4 text-lg">Notes cannot be recovered after deletion.</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn m-2 btn-info">Close</button>
            <button className="btn m-2 btn-success" type='submit' onClick={handleSubmit}>
              { loading ? <span className='loading loading-spinner'></span> : "Delete" }
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  )
}

export default DeleteNoteModal;
