import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
export default function OTP() {
    const [inp, setInp] = useState({
        inp1: "", inp2: "", inp3: "", inp4: "", inp5: "", inp6: ""
    });
    const navigate = useNavigate()
    const [err, setErr] = useState(null);
    const [otp, setOtp] = useState("");
    const digit = (e) => {
        const { name, value } = e.target;
        if (!/^[0-9]*$/.test(value)) return;
        setInp({ ...inp, [name]: value });
        if (value && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    };
    const submit = async (e) => {
        e.preventDefault();
        try {
            const otpis = inp.inp1 + inp.inp2 + inp.inp3 + inp.inp4 + inp.inp5 + inp.inp6;
            console.log("OTP is:", otpis)
            setOtp(otpis);
            axios.defaults.withCredentials = true;
            const { data } = await axios.post("http://localhost:3000/api/auth/verify-account", { otp: otpis });
            if (data.success) {
                console.log("Account verified");
                setErr(null)
                alert(`account verified`)
                navigate('/')
            }
        } catch (error) {
            setErr(error.response?.data?.message || error.message);
        }
    }
    return (
        <div className="mt-[50px] flex items-center justify-center">
            <div className="flex flex-col justify-center items-center bg-blue-500 w-[400px] h-[400px] rounded-2xl">
                <h1 className="text-center capitalize font-bold text-3xl">Enter your OTP</h1>
                <br />
                <form onSubmit={submit}>
                    <input type="text" maxLength={1} className="border-2 border-black w-[50px] h-[50px] text-center font-bold text-3xl mr-[10px]" name="inp1" value={inp.inp1} onChange={digit} />
                    <input type="text" maxLength={1} className="border-2 border-black w-[50px] h-[50px] text-center font-bold text-3xl mr-[10px]" name="inp2" value={inp.inp2} onChange={digit} />
                    <input type="text" maxLength={1} className="border-2 border-black w-[50px] h-[50px] text-center font-bold text-3xl mr-[10px]" name="inp3" value={inp.inp3} onChange={digit} />
                    <input type="text" maxLength={1} className="border-2 border-black w-[50px] h-[50px] text-center font-bold text-3xl mr-[10px]" name="inp4" value={inp.inp4} onChange={digit} />
                    <input type="text" maxLength={1} className="border-2 border-black w-[50px] h-[50px] text-center font-bold text-3xl mr-[10px]" name="inp5" value={inp.inp5} onChange={digit} />
                    <input type="text" maxLength={1} className="border-2 border-black w-[50px] h-[50px] text-center font-bold text-3xl" name="inp6" value={inp.inp6} onChange={digit} />
                    <br /><br />
                    <button className="btn ml-[130px]" type="submit">Send OTP</button>
                </form>
                {otp && <p className="mt-2 text-white font-bold text-lg">Entered OTP: {otp}</p>}
                {err && <p className="mt-2 text-red-500 font-bold text-lg">Error: {err}</p>}
            </div>
        </div>
    )
}
