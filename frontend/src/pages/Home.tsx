import { Link } from 'react-router-dom';
import useLogout from '../hooks/auth/useLogout';

const Home = () => {

  const { loading, logout } = useLogout();

  return (
    <div className='flex gap-4'>
      <Link to="students">Students</Link>
      <Link to="feedback">Feedback</Link>
      <Link to="notes">Notes</Link>
      <div onClick={logout}>
        { loading ? <span className='loading loading-spinner'></span>: "Logout" }
      </div>
    </div>
  )
}

export default Home
