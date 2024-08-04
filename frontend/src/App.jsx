import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import DashboardPage  from './pages/DashboardPage';
import { ToastContainer } from "react-toastify";
import CreateSubFolder from './components/CreateSubFolder';

const App = () => {
  return (
    <div className='App'>
        <ToastContainer />
       <Routes>
        <Route path='/' element = {<HomePage/>}  />
        <Route path='/login' element = {<Login/>}  />
        <Route path='/register' element = {<SignUp/>}  />
        <Route path = '/dashboard' element = {<DashboardPage/>} />
        <Route path="/create-subfolder/:id" element={<CreateSubFolder />} />
       </Routes>
    </div>
  )
}

export default App
