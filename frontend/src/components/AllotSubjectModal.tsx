import { BsFillTrash3Fill } from "react-icons/bs";
import { MouseEvent, useEffect, useState } from "react";
import useDeleteFeedback from "../hooks/feedback/useDeletFeedback";
import { getDate } from "../utils/date";
import { sleep } from "../utils/sleep";
import useGetSubjects from "../hooks/subjects/useGetSubjects";
import useAllotSubject from "../hooks/subjects/useAllotSubject";
import { MdOutlineSearchOff } from "react-icons/md";

const AllotSubjectModal = (props: { currentClass: any }) => {
  const { loading: allotLoading, allotSubject } = useAllotSubject();
  const { loading: subjectsLoading, subjects } = useGetSubjects();
  const [remainingSubjects, setRemainingSubjects] = useState<any[]>([]);
  const [allotedSubject, setAllotedSubject] = useState("");

  useEffect(() => {
    const temp = subjects.filter((subject: any) => !props.currentClass.subjects.includes(subject._id.toString()));
    setRemainingSubjects(temp);
  }, [subjects, props.currentClass])

  const handleCancel = async(e: MouseEvent) => {
    setAllotedSubject("");
  }

  const handleSubmit = async(e: MouseEvent) => {
    if(allotedSubject === "") return;
    await allotSubject({ classID: props.currentClass._id, subjectID: allotedSubject});
    await sleep(400);
    window.location.reload();
  }
  return (
    <div className="flex items-center text-black">
    <div
      onClick={()=>(document.getElementById(`allot_subject_${props.currentClass._id}`) as HTMLDialogElement).showModal()}
      className='btn btn-sm bg-primary text-white border-none'
    >Allocate</div>
    <dialog id={`allot_subject_${props.currentClass._id}`} className="modal">
      <div className="modal-box w-11/12 max-w-xl font-normal bg-slate-200">
        <h3 className="text-2xl font-semibold">Allot Subject</h3>
        <div className="my-6">{props.currentClass.year} - {props.currentClass.program}</div>
        <div className="mt-6 flex flex-col mx-auto w-11/12 sm:w-auto">
        { subjectsLoading ? <span className='loading loading-spinner'></span>:
          remainingSubjects.length !== 0?
          <select
            className="grow text-lg text-wrap h-fit select select-bordered bg-white focus:outline-none ml-2"
            value={allotedSubject}
            autoComplete="off"
            onChange={(e) => setAllotedSubject(e.target.value)}
          >
            <option value="" disabled={allotedSubject !== ""}>Select Subject</option>
            { remainingSubjects.map((element: any) => (
              <option key={element._id} value={element._id} className='text-lg text-wrap'>{element.name}</option>
            ))}
          </select>:
          <div className="flex flex-row justify-center gap-2 items-center font-semibold">
            <MdOutlineSearchOff className='text-primary w-8 h-8'/>
            <div>No subject available</div>
          </div>
        }
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn m-2 focus:outline-none border-none bg-red-600  text-white" onClick={handleCancel}>Close</button>
            <button className="btn m-2 focus:outline-none border-none  bg-primary text-white" type='submit' onClick={handleSubmit}>
              { allotLoading ? <span className='loading loading-spinner'></span> : "Allot" }
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  )
}

export default AllotSubjectModal;
