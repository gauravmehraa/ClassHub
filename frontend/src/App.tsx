import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feedback from './pages/Feedback';
import Notes from './pages/Notes';
import AddNote from './pages/AddNote';
import Students from './pages/Students';
import Profile from './pages/Profile';
import Quizzes from './pages/Quizzes';
import Quiz from './pages/Quiz';
import AddStudent from './pages/AddStudent';
import AddQuiz from './pages/AddQuiz';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Classes from './pages/Classes';
import Lobby from './pages/Lobby';
import Lecture from './pages/Lecture';

const App: React.FC = () => {

  const { authUser } = useAuthContext();
  return (
    <div className='min-h-screen max-h-screen max-w-screen flex md:flex-row flex-col font-inter text-black backdrop-blur-xs'>
      { authUser? <Navbar/>: null}
      <Routes>
        <Route path='/'>
          <Route path ='' element={authUser? <Dashboard/>: <Navigate to='/login'/>}/>
          <Route path ='dashboard' element={authUser? <Dashboard/>: <Navigate to='/login'/>}/>
          <Route path='login' element={authUser? <Navigate to='/dashboard'/>: <Login/>}/>
          <Route path='signup' element={authUser? <Navigate to='/dashboard'/>: <Signup/>}/>
          <Route path='feedback' element={authUser? <Feedback/>:<Navigate to='/login'/>}/>          
          <Route path='lecture'>
            <Route index element={authUser? <Lobby/>: <Navigate to='/login'/>}/>
            <Route path=':id' element={authUser? <Lecture/>:<Navigate to='/login'/>}/>
          </Route>
          <Route path='notes'>
            <Route index element={authUser? <Notes/>: <Navigate to='/login'/>}/>
            <Route path='add' element={authUser && authUser.role === "Teacher"? <AddNote/>:<Navigate to='/login'/>}/>
          </Route>
          <Route path='classes' element={authUser && authUser.role === "Teacher"? <Classes/>:<Navigate to='/login'/>}/>
          <Route path='students'>
            <Route index element={authUser && authUser.role === "Teacher"? <Students/>: <Navigate to='/login'/>}/>
            <Route path='profile' element={authUser && authUser.role === "Teacher"? <Profile/>:<Navigate to='/login'/>}/>
            <Route path='add' element={authUser && authUser.role === "Teacher"? <AddStudent/>:<Navigate to='/login'/>}/>
          </Route>
          <Route path='quiz'>
            <Route index element={authUser? <Quizzes/>: <Navigate to='/login'/>}/>
            <Route path='view' element={authUser? <Quiz/>:<Navigate to='/login'/>}/>
            <Route path='add' element={authUser && authUser.role === "Teacher"? <AddQuiz/>:<Navigate to='/login'/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Dashboard/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
