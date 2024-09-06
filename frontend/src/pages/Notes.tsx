import { Link } from "react-router-dom";
import SubjectNoteCard from "../components/SubjectNoteCard";
import { useAuthContext } from "../context/AuthContext";
import useGetNotes from "../hooks/notes/useGetNotes";
import { MdSearchOff } from "react-icons/md";

const Notes = () => {
  const { loading, notes } = useGetNotes();
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">
      {
        loading ?
        <span className='loading loading-spinner mx-auto text-white'></span>:
        <div className="flex flex-col gap-4 m-4 sm:m-8">
          { authUser.role === "Teacher"?
          <Link to ="add" className="mx-auto btn btn-lg border-none bg-primary text-white hover:bg-white hover:text-black">Add Note</Link>
          : null }
          { Object.keys(notes).length === 0?
            <div className='font-semibold text-2xl flex gap-2 pt-8 items-center my-auto mx-auto'> <MdSearchOff className='text-primary w-8 h-8'/> No notes </div>:
            Object.keys(notes).map(function(key) {
              return <SubjectNoteCard key={key} name={key} links={notes[key]}/>;
          })}
        </div>
      }
    </div>
  )
}

export default Notes
