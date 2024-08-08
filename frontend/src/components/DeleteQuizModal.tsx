import { MouseEvent } from "react";
import useDeleteQuiz from "../hooks/quiz/useDeleteQuiz";
import { sleep } from "../utils/sleep";

const DeleteQuizModal = (props: { quiz: any }) => {
  const { deleteQuiz, loading } = useDeleteQuiz();

  const handleSubmit = async(e: MouseEvent) => {
    await deleteQuiz(props.quiz._id);
    await sleep(800);
    window.location.reload();
  }

  return (
    <div className="flex items-center">
    <button
      onClick={()=>(document.getElementById(`quiz_delete_${props.quiz._id}`) as HTMLDialogElement).showModal()}
      className='btn mt-2 cursor-pointer'
    > Delete </button>
    <dialog id={`quiz_delete_${props.quiz._id}`} className="modal text-white">
      <div className="modal-box w-11/12 max-w-xl font-normal">
        <h3 className="text-xl">Delete
          <span className="text-xl"> <b>{props.quiz.topic}</b></span>?
        </h3>
        <p className="py-4 text-lg">Quizzes cannot be recovered after deletion.</p>
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

export default DeleteQuizModal;
