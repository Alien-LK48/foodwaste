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

    const getdata = (id, email) => {
        console.log(id, email)
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
                                        <div className="modal-box">
                                            <h3 className="text-lg font-bold">{ngo.name}</h3>
                                            <p className="py-4">{ngo.roletype}</p>
                                            <div className="modal-action">
                                                <label htmlFor={`ngomodal-${ngo._id}`} className="btn">Close</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-sm bg-green-500 text-white ml-2" onClick={() => getdata(ngo._id, ngo.email)}>Verify</button>
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
