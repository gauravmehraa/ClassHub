import useLogout from '../hooks/useLogout';

const Home = () => {

  const { loading, logout } = useLogout();

  return (
    <div onClick={logout}>
      { loading ? <span className='loading loading-spinner'></span>: "Logout" }
    </div>
  )
}

export default Home
