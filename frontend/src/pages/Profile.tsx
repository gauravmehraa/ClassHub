import { useLocation } from 'react-router-dom'
import { getDate } from '../utils/date';
import useGetFeedback from '../hooks/useGetFeedback';
import FeedbackCard from '../components/FeedbackCard';

const Profile = () => {
  const location = useLocation();
  const { student, course } = location.state;
  const { loading: feedbackLoading, feedbacks } = useGetFeedback();
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

      <div className='flex flex-col'>
        <div className='text-2xl font-semibold text-center'>Feedbacks</div>
        {
          feedbackLoading ?
          <span className='loading loading-spinner mx-auto my-12 text-white'></span>:
          <div className="flex flex-row gap-2 m-2 sm:m-8 justify-center text-center">
            { filteredFeedbacks.length === 0?
              <div> No feedback to show </div>:
              filteredFeedbacks.map((feedback: any, index: number) => (
                <FeedbackCard key={feedback._id} data={feedback}/>
              ))
            }
          </div>
        }
      </div>
      <div className='flex flex-col'>
        <div className='text-2xl font-semibold justify-center text-center'>Grades</div>
        {
          feedbackLoading ?
          <span className='loading loading-spinner mx-auto my-12 text-white'></span>:
          <div className="flex flex-row gap-2 m-2 sm:m-8 justify-center text-center">
            { filteredFeedbacks.length === 0?
              <div> No feedback to show </div>:
              filteredFeedbacks.map((feedback: any, index: number) => (
                <FeedbackCard key={feedback._id} data={feedback}/>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Profile
