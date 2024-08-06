import { MdModeEdit } from "react-icons/md";
import { MouseEvent, useState } from "react";
import useEditNote from "../hooks/notes/useEditNote";

const EditFeedbackModal = (props: { feedback: any }) => {

  const [content, setContent] = useState(props.feedback.content);
  const { loading } = useEditNote();

  const handleCancel: any = async(e: MouseEvent) => {
    setContent(props.feedback.content);
  }

  const handleSubmit: any = async(e: MouseEvent) => {
    // await editNote(content, props.link._id);
    (document.getElementById(`feedback_edit_${props.feedback._id}`) as HTMLDialogElement).close();
    window.location.reload();
  }
  return (
    <div className="flex items-center">
    <MdModeEdit
      onClick={()=>(document.getElementById(`feedback_edit_${props.feedback._id}`) as HTMLDialogElement).showModal()}
      className='text-black h-5 w-5 cursor-pointer hover:text-red-400'
    />
    <dialog id={`feedback_edit_${props.feedback._id}`} className="modal text-white">
      <div className="modal-box w-11/12 max-w-xl font-normal">
        <h3 className="text-2xl">Edit Feedback</h3>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Student Name</label>
          <input
            type='text'
            value={props.feedback.studentID.name}
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
