import AddNoteModal from "../components/AddNoteModal";
import SubjectNoteCard from "../components/SubjectNoteCard";
import { useAuthContext } from "../context/AuthContext";
import useGetNotes from "../hooks/useGetNotes"

const Feedback = () => {
  const { loading, notes } = useGetNotes();
  const { authUser } = useAuthContext()
  return (
    <div className="flex flex-col text-black w:9/10 sm:w-2/3 p-8">
      {
        loading ?
        <span className='loading loading-spinner mx-auto text-white'></span>:
        <div className="flex flex-col gap-4 m-4 sm:m-8">
          { authUser.role === "Teacher"? <AddNoteModal/>: null }
          { Object.keys(notes).length === 0?
            <div> No notes to show </div>:
            Object.keys(notes).map(function(key) {
              return <SubjectNoteCard key={key} name={key} links={notes[key]}/>;
          })}
        </div>
      }
    </div>
  )
}

export default Feedback