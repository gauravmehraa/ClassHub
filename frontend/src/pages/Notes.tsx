import { Link } from "react-router-dom";
import SubjectNoteCard from "../components/SubjectNoteCard";
import { useAuthContext } from "../context/AuthContext";
import useGetNotes from "../hooks/notes/useGetNotes";

const Notes = () => {
  const { loading, notes } = useGetNotes();
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col text-black p-8 overflow-auto w-full">
      {
        loading ?
        <span className='loading loading-spinner mx-auto text-white'></span>:
        <div className="flex flex-col gap-4 m-4 sm:m-8">
          { authUser.role === "Teacher"?
          <Link to ="add" className="mx-auto btn btn-lg bg-white text-black">Add Note</Link>
          : null }
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

export default Notes
