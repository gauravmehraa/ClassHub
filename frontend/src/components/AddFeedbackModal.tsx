import { MouseEvent, useState } from "react";
import useAddFeedback from "../hooks/feedback/useAddFeedback";
import { sleep } from "../utils/sleep";

const AddFeedbackModal = (props: { student: any }) => {
  const [content, setContent] = useState("");
  const { loading, addFeedback } = useAddFeedback();

  const handleCancel: any = async(e: MouseEvent) => {
    setContent("");
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    await addFeedback({content, studentID: props.student._id});
    (document.getElementById("feedback_add") as HTMLDialogElement).close();
    await sleep(800);
    window.location.reload();
  }
  return (
    <div className="flex items-center">
      <button
        onClick={()=>(document.getElementById("feedback_add") as HTMLDialogElement).showModal()}
        className="mx-auto mt-4 btn btn-md bg-white text-black"
      >Give Feedback</button>
      <dialog id="feedback_add" className="modal text-white">
        <div className="modal-box w-11/12 max-w-xl font-normal">
          <h3 className="text-2xl">Give Feedback</h3>

          <div className="mt-6">
            <label className="ml-2 font-semibold">Student Name</label>
            <input
              type='text'
              value={props.student.name}
              disabled
              className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
              autoComplete='false'
            />
          </div>

          <div className="mt-6">
            <label className="ml-2 font-semibold">Feedback</label>
            <textarea
              rows={3}
              className='textarea textarea-bordered w-full mt-2 flex items-center focus:outline-none'
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
