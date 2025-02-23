import React from 'react';
import DonateNav from './DonateNav';
import { Outlet } from 'react-router-dom';

export default function Donation() {
  return (
    <div className='flex flex-row min-h-screen'>
      {/* Sidebar Navigation */}
      <div className='w-[250px] bg-white shadow-lg rounded-lg p-6'>
        <DonateNav />
      </div>

      {/* Right-side Content (Dynamic Routes) */}
      <div className='flex-1 bg-gray-50 p-6 rounded-lg'>
        <Outlet /> {/* This will render Alldonations or Newdonate */}
      </div>
    </div>
  );
}
