import { useAuthContext } from '../context/AuthContext'
import DeleteNoteModal from './DeleteNoteModal';
import EditNoteModal from './EditNoteModal';

const SubjectNoteCard = (props: { name: string, links: [] }) => {
  const { authUser } = useAuthContext();
  return (
    <div className="bg-white mx-8 p-5 rounded-lg">
      <div className='text-2xl font-semibold'>{props.name}</div>
      {props.links.map((link: any) => (
        <div className='mt-2 mb-4 flex flex-row gap-2 items-center' key={link._id}>
          <a
            href={link.url}
            target='blank'
            className='text-blue-600 font-semibold text-lg underline'
          >{link.title}</a>
          { link.description && 
          <div>({link.description})</div>
          }
          { authUser.role === "Teacher"?
          <>
            <EditNoteModal subjectname={props.name} link={link}/>
            <DeleteNoteModal subjectname={props.name} link={link}/>
          </>:
          null
        }
        </div>
      ))}
    </div>
  )
}

export default SubjectNoteCard
