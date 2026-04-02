import React, { useEffect,useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify';

const App = () => {

  const [userInfo,setUserInfo]=useState(null)

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged In",user)
        setUserInfo(user)
        navigate('/')
      }else{
        console.log("Logged Out")
        navigate('/login')
      }
    })
  },[])

  return (
    <div>
      <ToastContainer theme='dark' position="top-right" autoClose={2000} />
      <Routes>
        <Route path='/' element={<Home userInfo={JSON.stringify(userInfo).email}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App