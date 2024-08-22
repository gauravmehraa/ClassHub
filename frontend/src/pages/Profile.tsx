import { useLocation } from 'react-router-dom'
import { getDate } from '../utils/date';
import useGetFeedback from '../hooks/feedback/useGetFeedback';
import FeedbackCard from '../components/FeedbackCard';
import useGetGrades from '../hooks/quiz/useGetGrades';
import GradeCard from '../components/GradeCard';
import AddFeedbackModal from '../components/AddFeedbackModal';
import EditStudentModal from '../components/EditStudentModal';

const Profile = () => {
  const location = useLocation();
  const { student, course } = location.state;
  const { loading: feedbackLoading, feedbacks } = useGetFeedback();
  const { loading: gradesLoading, grades } = useGetGrades(student._id);
  const filteredFeedbacks = feedbacks.filter((feedback: any)=> feedback.studentID._id.toString() === student._id.toString());

  return (
    <div>
      <div className='my-6'>
        <div className='text-3xl font-semibold my-2'>{student.name}</div>
        <div><b>Gender:</b> {student.gender}</div>
        <div><b>Address:</b> {student.address}</div>
        <div><b>Registered On: </b> {getDate(student.createdAt)}</div>
        <div><b>Course: </b> {course}</div>
        <div><b>Email: </b> {student.email}</div>
        <div><b>Contact No: </b> {student.phoneNumber}</div>
      </div>

      <div><EditStudentModal student={{...student, course}}/></div>

      <div className='flex flex-col'>
        <div className='text-2xl font-semibold text-center'>Feedbacks</div>
        <AddFeedbackModal student={student}/>
        {
          feedbackLoading ?
          <span className='loading loading-spinner mx-auto my-12 text-white'></span>:
          <div className="flex flex-row flex-wrap gap-2 m-2 sm:m-8 justify-center text-center">
            { filteredFeedbacks.length === 0?
              <div> No feedback to show </div>:
              filteredFeedbacks.map((feedback: any, index: number) => (
                <FeedbackCard key={feedback._id} data={feedback} showInfo={false}/>
              ))
            }
          </div>
        }
      </div>
      <div className='flex flex-col'>
        <div className='text-2xl font-semibold justify-center text-center'>Grades</div>
        {
          gradesLoading ?
          <span className='loading loading-spinner mx-auto my-12 text-white'></span>:
          <div className="flex flex-row gap-2 m-2 sm:m-8 justify-center text-center">
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
  )
}

export default Profile
