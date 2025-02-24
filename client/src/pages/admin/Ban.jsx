import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Ban() {
    const [acc, setAcc] = useState([])
    const allaccounts = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/admin/allaccounts', { withCredentials: true })
            setAcc(data.users)
        } catch (error) {
            console.error("Error fetching accounts:", error.message);
        }
    }
    useEffect(() => {
        allaccounts()
    }, [])
    const handleBan = async (id) => {
        console.log("Sending User ID to Backend:", id);
        try {
            const { data } = await axios.post(
                'http://localhost:3000/api/admin/banAccount',
                { id },
                { withCredentials: true }
            );
            if (data.success) {
                allaccounts()
            } else {
                alert("Failed to ban user: " + data.message);
            }
        } catch (error) {
            console.error("Error banning user:", error.message);
            alert("Error banning user");
        }
    }
    const handleunBan = async (id) => {
        console.log("Sending User ID to Backend:", id);
        try {
            const { data } = await axios.post(
                'http://localhost:3000/api/admin/UnbanAccount',
                { id },
                { withCredentials: true }
            );
            if (data.success) {
                allaccounts()
            } else {
                alert("Failed to ban user: " + data.message);
            }
        } catch (error) {
            console.error("Error banning user:", error.message);
            alert("Error banning user");
        }
    }
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Suspend an Account</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Work field</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acc.map((account) => (
                            <tr key={account._id} className="hover:bg-gray-50">
                                <td className="border p-2">{account._id}</td>
                                <td className="border p-2">{account.email}</td>
                                <td className="border p-2">{account.roletype}</td>
                                <td className="border p-2">{account.isBanned ? `suspended` : `active`}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleBan(account._id)}
                                    >
                                        Ban
                                    </button>
                                    <button
                                        className="bg-green-500 ml-[10px] text-white px-4 py-1 rounded hover:bg-green-700"
                                        onClick={() => handleunBan(account._id)}
                                    >
                                        UnBan
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
