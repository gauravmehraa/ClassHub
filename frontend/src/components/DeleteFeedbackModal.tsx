import { BsFillTrash3Fill } from "react-icons/bs";
import { MouseEvent } from "react";
import useDeleteNote from "../hooks/notes/useDeleteNote";
import { getDate } from "../utils/date";

const DeleteFeedbackModal = (props: { feedback: any }) => {
  const { deleteNote, loading } = useDeleteNote();
  const handleSubmit = async(e: MouseEvent) => {
    await deleteNote(props.feedback._id);
  }
  return (
    <div className="flex items-center">
    <BsFillTrash3Fill
      onClick={()=>(document.getElementById(`feedback_delete_${props.feedback._id}`) as HTMLDialogElement).showModal()}
      className='text-black h-4 w-4 cursor-pointer hover:text-red-400'
    />
    <dialog id={`feedback_delete_${props.feedback._id}`} className="modal text-white">
      <div className="modal-box w-11/12 max-w-xl font-normal">
        <h3 className="text-2xl font-semibold">Delete Feedback?</h3>
        <p className="pt-4 text-lg">{props.feedback.studentID.name}</p>
        <p className="text-lg">{props.feedback.content}</p>
        <p className="text-lg">Date of Feedback: {getDate(props.feedback.createdAt)}</p>
        <p className="py-4 text-md text-gray-300">Feedbacks cannot be recovered after deletion.</p>
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

export default DeleteFeedbackModal;
