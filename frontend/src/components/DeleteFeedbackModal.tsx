import { BsFillTrash3Fill } from "react-icons/bs";
import { MouseEvent } from "react";
import useDeleteFeedback from "../hooks/feedback/useDeletFeedback";
import { getDate } from "../utils/date";
import { sleep } from "../utils/sleep";

const DeleteFeedbackModal = (props: { feedback: any }) => {
  const { deleteFeedback, loading } = useDeleteFeedback();

  const handleSubmit = async(e: MouseEvent) => {
    await deleteFeedback(props.feedback._id);
    await sleep(800);
    window.location.reload();
  }
  return (
    <div className="flex items-center text-black">
    <BsFillTrash3Fill
      onClick={()=>(document.getElementById(`feedback_delete_${props.feedback._id}`) as HTMLDialogElement).showModal()}
      className='text-black h-5 w-5 cursor-pointer hover:text-red-400'
    />
    <dialog id={`feedback_delete_${props.feedback._id}`} className="modal">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-slate-200">
        <h3 className="text-2xl font-semibold">Delete Feedback?</h3>
        <p className="pt-4 text-lg">Student Name: {props.feedback.studentID.name}</p>
        <p className="text-lg">Date of Feedback: {getDate(props.feedback.createdAt)}</p>
        <br/>
        <p className="text-lg">Content: {props.feedback.content}</p>
        <p className="text-lg">Rating: {props.feedback.rating} / 5</p>
        <p className="pt-4 text-md font-semibold">Feedbacks cannot be recovered after deletion.</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn m-2 focus:outline-none border-none bg-classhub-purple text-black">Close</button>
            <button className="btn m-2 focus:outline-none border-none bg-red-600 text-black" type='submit' onClick={handleSubmit}>
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
