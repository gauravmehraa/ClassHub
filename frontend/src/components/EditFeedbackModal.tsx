import { MdModeEdit } from "react-icons/md";
import { MouseEvent, useState } from "react";
import useEditFeedback from "../hooks/feedback/useEditFeedback";
import { sleep } from "../utils/sleep";

const EditFeedbackModal = (props: { feedback: any }) => {

  const [content, setContent] = useState(props.feedback.content);
  const [rating, setRating] = useState(props.feedback.rating);
  const { loading, editFeedback } = useEditFeedback();

  const inputClass = 'w-full mt-2 input input-bordered bg-white flex items-center focus:outline-none '

  const handleCancel: any = async(e: MouseEvent) => {
    setContent(props.feedback.content);
    setRating(props.feedback.rating);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    await editFeedback({content, rating}, props.feedback._id);
    (document.getElementById(`feedback_edit_${props.feedback._id}`) as HTMLDialogElement).close();
    await sleep(800);
    window.location.reload();
  }
  return (
    <div className="flex items-center ml-auto">
    <MdModeEdit
      onClick={()=>(document.getElementById(`feedback_edit_${props.feedback._id}`) as HTMLDialogElement).showModal()}
      className='text-black h-6 w-6 cursor-pointer hover:text-red-400'
    />
    <dialog id={`feedback_edit_${props.feedback._id}`} className="modal">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-slate-200">
        <h3 className="text-2xl">Edit Feedback</h3>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Student Name</label>
          <input
            type='text'
            value={props.feedback.studentID.name}
            disabled
            className={`${inputClass} disabled:bg-gray-300 disabled:text-black disabled:border-none`}
            autoComplete='false'
          />
        </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Rating:</label>
          <label className="ml-2 font-regular">{rating} out of 5</label>
            <input
              type="range"
              min={0} max={5} step={0.5}
              className="range w-full mt-2"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              required
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>|</span>
              <span></span>
              <span>|</span>
              <span></span>
              <span>|</span>
              <span></span>
              <span>|</span>
              <span></span>
              <span>|</span>
              <span></span>
              <span>|</span>
            </div>
          </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Feedback</label>
          <textarea
            rows={3}
            className='textarea textarea-bordered resize-none w-full bg-white mt-2 flex items-center focus:outline-none'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            autoComplete="false"
          >
          </textarea>
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

export default EditFeedbackModal;
