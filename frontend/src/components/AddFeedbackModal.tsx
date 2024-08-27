import { MouseEvent, useState } from "react";
import useAddFeedback from "../hooks/feedback/useAddFeedback";
import { sleep } from "../utils/sleep";

const AddFeedbackModal = (props: { student: any }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0.0);
  const { loading, addFeedback } = useAddFeedback();

  const inputClass = 'w-full mt-2 input input-bordered bg-white flex items-center focus:outline-none'

  const handleCancel: any = async(e: MouseEvent) => {
    setContent("");
    setRating(0.0);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    await addFeedback({content, rating, studentID: props.student._id});
    (document.getElementById("feedback_add") as HTMLDialogElement).close();
    await sleep(800);
    window.location.reload();
  }
  return (
    <div className="flex items-center">
      <button
        onClick={()=>(document.getElementById("feedback_add") as HTMLDialogElement).showModal()}
        className='btn btn-md bg-classhub-purple text-white border-none cursor-pointer hover:bg-white hover:text-black mx-auto'
      >Give Feedback</button>
      <dialog id="feedback_add" className="modal text-black">
        <div className="modal-box w-11/12 max-w-xl font-normal bg-white">
          <h3 className="text-2xl">Give Feedback</h3>

          <div className="mt-6">
            <label className="ml-2 font-semibold">Student Name</label>
            <input
              type='text'
              value={props.student.name}
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

export default AddFeedbackModal;
