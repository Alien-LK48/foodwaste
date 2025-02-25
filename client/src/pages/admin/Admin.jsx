import React from 'react'
import AdminNav from './AdminNav'
import { Outlet } from 'react-router-dom'
export default function Admin() {
  return (
    <div className='flex flex-row min-h-screen'>

      <div className='w-[250px] bg-white shadow-lg rounded-lg p-6'>
        <AdminNav />
      </div>
      <div className='flex-1 bg-gray-50 p-6 rounded-lg'>
        <Outlet /> 
      </div>
    </div>
  )
}
