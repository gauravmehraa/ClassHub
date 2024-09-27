import { useAuthContext } from '../context/AuthContext'
import DeleteNoteModal from './DeleteNoteModal';
import EditNoteModal from './EditNoteModal';

const SubjectNoteCard = (props: { name: string, links: [] }) => {
  const { authUser } = useAuthContext();
  return (
    <div className="mx-4 sm:mx-8 p-4 rounded-lg min-w-screen sm:min-w-1/3 sm:max-w-1/3">
      <div className='text-2xl font-semibold text-black mt-4 mb-6'>{props.name}</div>
      {props.links.map((link: any, index: number) => (
        <div className='bg-white p-8 rounded-xl shadow mt-2 mb-4 flex flex-row flex-wrap gap-2 items-center  py-4 border' key={link._id}>
          <a
            href={link.url}
            target='blank'
            className='cursor-pointer font-semibold text-lg hover:text-primary transition-all'
          >{link.title}</a>
          { link.description && `(${link.description})` }

          { authUser.role === "Teacher"?
          <div className='flex flex-row gap-2 ml-auto'>
            <EditNoteModal subjectname={props.name} link={link}/>
            <DeleteNoteModal subjectname={props.name} link={link}/>
          </div>:
          null
        }
        </div>
      ))}
    </div>
  )
}

export default SubjectNoteCard
