import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import About from './pages/about/About'
import Donation from './pages/Donation'
import Contact from './pages/contact/Contact'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/donation' element={<Donation />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
