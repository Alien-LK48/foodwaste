import React, { useContext } from 'react';
import { Appcontent } from '../../components/contextapi/Appcontext';
import { Link } from 'react-router-dom'
export default function AdminDashboard() {
  const { userdata, count } = useContext(Appcontent);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">
        Welcome, {userdata?.user?.name}!
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <p className="text-lg font-semibold text-gray-700">Total Admins</p>
          <p className="text-2xl font-bold text-blue-600">{count.admin}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <p className="text-lg font-semibold text-gray-700">Total NGOs</p>
          <p className="text-2xl font-bold text-green-600">{count.ngo}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <p className="text-lg font-semibold text-gray-700">Total Users</p>
          <p className="text-2xl font-bold text-purple-600">{count.user}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <p className="text-lg font-semibold text-gray-700">Total Donors</p>
          <p className="text-2xl font-bold text-red-600">{count.donor}</p>
        </div>
        <Link to='/verifyNGOs' className="bg-white shadow-md p-6 rounded-xl text-center col-span-2 md:col-span-3 lg:col-span-1">
          <p className="text-lg font-semibold text-gray-700">New NGOs</p>
          <p className="text-2xl font-bold text-yellow-600">{count.verifiedNgo}</p>
        </Link>
        <div className="bg-white shadow-md p-6 rounded-xl text-center col-span-2 md:col-span-3 lg:col-span-1">
          <p className="text-lg font-semibold text-gray-700">Food Collected (persons)</p>
          <p className="text-2xl font-bold text-gray-600">{count.totalfoods}  </p>
        </div>
        <Link to='/ban' className="bg-white shadow-md p-6 rounded-xl text-center col-span-2 md:col-span-3 lg:col-span-1">
          <p className="text-lg font-semibold text-gray-700">Suspended account</p>
          <p className="text-2xl font-bold text-gray-600">{count.ban}  </p>
        </Link>
      </div>
    </div>
  );
}
