import React, { useContext } from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Donation from './pages/donation/Donation';
import Newdonate from './pages/donation/Newdonate';
import Contact from './pages/contact/Contact';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { Appcontent } from './components/contextapi/Appcontext';
import Mydonatedfood from './pages/donation/Mydonatedfood';
import Alldonatedfoods from './pages/foodlist/Alldonatedfoods';
import Donorsignup from './components/auth/Donorsignup';
import Ngosignup from './components/auth/Ngosignup';
import Admin from './pages/admin/Admin';
import AdminDashboard from './pages/admin/AdminDashboard'
import Allfoods from './pages/admin/Allfoods'
import Allcollection from './pages/foodlist/Allcollection';
import Ban from './pages/admin/Ban';
import NGOs from './pages/admin/NGOs';
import OTP from './components/navbar/OTP';
import Message from './components/message/Message';
function App() {
  const { isloggedin } = useContext(Appcontent)
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        {isloggedin && (<Route path='/donation' element={<Donation />}>
          <Route index element={<Navigate to='newdonate' />} />
          <Route path='alldonations' element={<Mydonatedfood />} />
          <Route path='newdonate' element={<Newdonate />} />
        </Route>)}
        {isloggedin && (<Route path='/admin' element={<Admin />}>
          <Route index element={<Navigate to='admindashboard' />} />
          <Route path='admindashboard' element={<AdminDashboard />} />
        </Route>)}
        <Route path='/allfoodData' element={<Allfoods />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/donorsignup' element={<Donorsignup />} />
        <Route path='/ngosignup' element={<Ngosignup />} />
        <Route path='/alldonatedfoods' element={<Alldonatedfoods />} />
        <Route path='/allcollection' element={<Allcollection />} />
        <Route path='/ban' element={<Ban />} />
        <Route path='/verifyNGOs' element={<NGOs />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='/msg' element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
