import { useLocation } from 'react-router-dom'
import { getDate } from '../utils/date';

const Profile = () => {
  const location = useLocation();
  const { student, course } = location.state;
  return (
    <div>
      <div className='text-3xl font-semibold my-2'>{student.name}</div>
      <div><b>Gender:</b> {student.gender}</div>
      <div><b>Address:</b> {student.address}</div>
      <div><b>Registered On: </b> {getDate(student.createdAt)}</div>
      <div><b>Course: </b> {course}</div>
      <div><b>Email: </b> {student.email}</div>
      <div><b>Contact No: </b> {student.phoneNumber}</div>
    </div>
  )
}

export default Profile
