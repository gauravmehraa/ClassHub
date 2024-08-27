import { useLocation } from 'react-router-dom'
import { getDate } from '../utils/date';
import useGetFeedback from '../hooks/feedback/useGetFeedback';
import FeedbackCard from '../components/FeedbackCard';
import useGetGrades from '../hooks/quiz/useGetGrades';
import GradeCard from '../components/GradeCard';
import AddFeedbackModal from '../components/AddFeedbackModal';
import EditStudentModal from '../components/EditStudentModal';
import useGetSubjects from '../hooks/subjects/useGetSubjects';
import { MdOutlineMail, MdOutlinePhone, MdOutlineHome, MdOutlineMale, MdOutlineFemale } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

const Profile = () => {
  const location = useLocation();
  const { student, course } = location.state;
  const { loading: feedbackLoading, feedbacks } = useGetFeedback();
  const { loading: subjectsLoading, subjects } = useGetSubjects();
  const { loading: gradesLoading, grades } = useGetGrades(student._id);
  const filteredFeedbacks = feedbacks.filter((feedback: any)=> feedback.studentID._id.toString() === student._id.toString());

  return (
    <div className="flex flex-col text-black py-4 sm:py-8 overflow-auto max-h-screen w-full">

      <div className='flex flex-col justify-center items-center gap-4 flex-wrap px-2 sm:px-8 mt-6'>
        <img src={`https://avatar.iran.liara.run/public/${student.gender === 'Male'? 'boy': 'girl'}?username=${student.email}`} alt="User" className="rounded-full w-24 h-24 border-classhub-purple border-2" />
        <div className='text-2xl font-semibold '>{student.name}</div>
        <div className='text-md'>Student since <span className='font-semibold text-classhub-purple'>{getDate(student.createdAt)}</span></div>
        <div className='flex flex-col md:flex-row flex-wrap px-4 gap-10 justify-evenly min-h-20 pb-8'>
          <a className='flex gap-2 items-center hover:text-classhub-purple' href={`mailto:${student.email}`}>
            <MdOutlineMail className='w-6 h-6 text-classhub-purple'/>
            <div className='outline-none'>{student.email}</div>
          </a>
          <a className='flex gap-2 items-center hover:text-classhub-purple' href={`tel:${student.phoneNumber}`}>
            <MdOutlinePhone className='w-6 h-6 text-classhub-purple'/>
            <div className='outline-none'>{student.phoneNumber}</div>
          </a>
          <div className='flex gap-2 items-center'>
            <MdOutlineHome className='w-6 h-6 text-classhub-purple'/>
            <div>{student.address}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <LiaBirthdayCakeSolid className='w-6 h-6 text-classhub-purple'/>
            <div>{getDate(student.dateOfBirth)}</div>
          </div>
          <div className='flex gap-2 items-center'>
            { student.gender === "Male"? <MdOutlineMale className='w-6 h-6 text-classhub-purple'/>: <MdOutlineFemale className='w-6 h-6 text-classhub-purple'/> }
            <div >{student.gender}</div>
          </div>
        </div>
      </div>

      <EditStudentModal student={{...student, course}}/>

      <div className='w-full flex flex-row flex-wrap mt-8'>
        <div className='w-full flex flex-col'>
          <div className='text-2xl font-semibold text-center my-4'>Feedbacks</div>
          <AddFeedbackModal student={student}/>
          {
            feedbackLoading ?
            <span className='loading loading-spinner mx-auto my-12 text-white'></span>:
            <div className="flex flex-row flex-wrap my-2 sm:my-8 justify-center text-center max-h-96 overflow-auto">
              { filteredFeedbacks.length === 0?
                <div> No feedback to show </div>:
                filteredFeedbacks.map((feedback: any, index: number) => (
                  <FeedbackCard key={feedback._id} data={feedback} showInfo={false} index={index}/>
                ))
              }
            </div>
          }
        </div>
        <div className='w-full flex flex-col'>
          <div className='text-2xl font-semibold justify-center text-center'>Grades</div>
          {
            gradesLoading ?
            <span className='loading loading-spinner mx-auto my-12 text-white'></span>:
            <div className="flex flex-row flex-wrap my-2 sm:my-8 justify-center text-center h-96 overflow-auto">
              { grades.length === 0?
                <div> No grades to show </div>:
                grades.map((grade: any, index: number) => (
                  <GradeCard key={grade._id} data={grade}/>
                ))
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
