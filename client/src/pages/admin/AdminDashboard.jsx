import React, { useContext } from 'react';
import { Appcontent } from '../../components/contextapi/Appcontext';
import { Link } from 'react-router-dom';
import {
  FaUserShield,
  FaUsers,
  FaUserFriends,
  FaHandsHelping,
  FaUserCheck,
  FaBan,
  FaUtensils
} from 'react-icons/fa';

export default function AdminDashboard() {
  const { userdata, count } = useContext(Appcontent);

  const stats = [
    {
      label: 'Total Admins',
      value: count.admin,
      icon: <FaUserShield className="text-blue-500 text-3xl mb-2" />,
      color: 'text-blue-600'
    },
    {
      label: 'Total NGOs',
      value: count.ngo,
      icon: <FaUsers className="text-green-500 text-3xl mb-2" />,
      color: 'text-green-600'
    },
    {
      label: 'Total Users',
      value: count.user,
      icon: <FaUserFriends className="text-purple-500 text-3xl mb-2" />,
      color: 'text-purple-600'
    },
    {
      label: 'Total Donors',
      value: count.donor,
      icon: <FaHandsHelping className="text-red-500 text-3xl mb-2" />,
      color: 'text-red-600'
    },
    {
      label: 'New NGOs',
      value: count.verifiedNgo,
      icon: <FaUserCheck className="text-yellow-500 text-3xl mb-2" />,
      color: 'text-yellow-600',
      link: '/verifyNGOs'
    },
    {
      label: 'Food Collected (persons)',
      value: count.totalfoods,
      icon: <FaUtensils className="text-gray-500 text-3xl mb-2" />,
      color: 'text-gray-600'
    },
    {
      label: 'Suspended Accounts',
      value: count.ban,
      icon: <FaBan className="text-gray-500 text-3xl mb-2" />,
      color: 'text-gray-600',
      link: '/ban'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Welcome, {userdata?.user?.name} 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => {
          const CardContent = () => (
            <div className="flex flex-col items-center">
              {stat.icon}
              <p className="text-md font-medium text-gray-700">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );

          return stat.link ? (
            <Link
              to={stat.link}
              key={index}
              className="bg-white hover:shadow-xl transition-shadow duration-200 shadow-md rounded-2xl p-6 text-center"
            >
              <CardContent />
            </Link>
          ) : (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center"
            >
              <CardContent />
            </div>
          );
        })}
      </div>
    </div>
  );
}
