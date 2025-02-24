import React from 'react';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'
export default function Message() {
    return (
        <div className='flex flex-col justify-center items-center p-6'>
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className='bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full'
            >
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'
                >
                    Please wait until the admin verifies your data.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='text-gray-600 text-sm md:text-base mb-6'
                >
                    Estimated time: <span className='font-semibold text-gray-900'>1 day</span>
                </motion.p>
                <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300'
                >
                    <Link to='/otp'>Verify Now</Link>
                </motion.button>
            </motion.div>
        </div>
    )
}