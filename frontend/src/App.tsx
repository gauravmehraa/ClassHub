import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feedback from './pages/Feedback';
import Notes from './pages/Notes';

const App: React.FC = () => {

  const { authUser } = useAuthContext();
  return (
    <div className='h-screen my-12 flex flex-col items-center justify-center'>
      <Routes>
        <Route path='/'>
          <Route index element={authUser? <Home/>: <Navigate to='/login'/>}/>
          <Route path='login' element={authUser? <Navigate to='/'/>: <Login/>}/>
          <Route path='signup' element={authUser? <Navigate to='/'/>: <Signup/>}/>
          <Route path='feedback' element={authUser? <Feedback/>:<Navigate to='/login'/>}/>
          <Route path='notes' element={authUser? <Notes/>:<Navigate to='/login'/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
