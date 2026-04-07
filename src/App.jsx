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
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return (
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
  )
}

export default App