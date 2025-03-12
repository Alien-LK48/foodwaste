import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function NGOs() {
    const [ngos, setNgos] = useState([])
    const getngos = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/admin/allngos', { withCredentials: true })
            if (data.success) {
                setNgos(data.ngos)
            }
        } catch (error) {
            console.error("Error fetching ngos", error.message);
        }
    }
    useEffect(() => {
        getngos()
    }, [])

    const otp = async (id, email) => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post('http://localhost:3000/api/auth/NGOverifier', { id })
            if (data.success) {
                alert(`otp sent to email`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ngos.length > 0 ? (
                        ngos.map((ngo) => (
                            <tr key={ngo._id} className="hover:bg-gray-50">
                                <td className="border p-2">{ngo._id}</td>
                                <td className="border p-2">{ngo.email}</td>
                                <td className="border p-2">
                                    <label htmlFor={`ngomodal-${ngo._id}`} className="btn btn-sm bg-blue-500 text-white">View Details</label>
                                    <input type="checkbox" id={`ngomodal-${ngo._id}`} className="modal-toggle" />
                                    <div className="modal" role="dialog">
                                        <div className="modal-box bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
                                            <h3 className="text-2xl font-semibold text-gray-800">{ngo.name}</h3>
                                            <p className="py-2 text-gray-600"><strong>Type:</strong> {ngo.roletype}</p>
                                            <p className="py-2 text-gray-600"><strong>Address:</strong> {ngo.address}</p>
                                            <p className="py-2 text-gray-600"><strong>Working Area:</strong> {ngo.area}</p>
                                            <div className="modal-action mt-6">
                                                <label htmlFor={`ngomodal-${ngo._id}`} className="btn bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Close</label>
                                            </div>
                                        </div>

                                    </div>
                                    <button className="btn btn-sm bg-green-500 text-white ml-2" onClick={() => otp(ngo._id, ngo.email)}>Verify</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">No NGOs found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
