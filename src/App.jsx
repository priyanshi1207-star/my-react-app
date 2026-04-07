import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Layout from './Pages/Layout.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import ResumeBuilder from './Pages/ResumeBuilder.jsx'
import Preview from './Pages/Preview.jsx'
import Login from './Pages/Login.jsx'
import { useDispatch } from 'react-redux'
import API from './configs/Api.js'
import { login, setLoading } from './App/features/auth/authSlice.js'
import { Toaster } from 'react-hot-toast'
const App = () => {

  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await API.get('/api/users/data', { headers: { Authorization: token } })
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
        dispatch(setLoading(false))
      }
      else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.error('Error fetching user data:', error)
    }
  }

  React.useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='/view/:resumeId' element={<Preview />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

    </>
  )
}

export default App