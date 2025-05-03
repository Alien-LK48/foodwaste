import React, { useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Appcontent } from '../contextapi/Appcontext';
import ProfileButton from './ProfileButton';
import {
    Home,
    Info,
    Phone,
    ShoppingCart,
    MessageSquare,
    MapPin,
    HandCoins,
    LayoutDashboard,
    Users,
    FileText,
    Store,
    LogIn
} from 'lucide-react';

export default function NavBar() {
    const { isloggedin, userdata } = useContext(Appcontent);
    const navigate = useNavigate();

    const navLinkClass = 'flex items-center gap-1 text-white hover:underline hover:text-blue-200 font-medium transition';

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-xl border-b border-blue-900">
            {(isloggedin && !userdata?.user?.isVarified && !userdata?.user?.isNgo) && (
                <p className="text-center text-white font-semibold mb-2">
                    Account is not verified. <Link to="/otp" className="underline">Verify now</Link>
                </p>
            )}
            {(isloggedin && userdata?.user?.isNgo && !userdata?.user?.isVarified) && (
                <p className="text-center text-white font-semibold mb-2">
                    Your account is under verification. <Link to="/msg" className="underline">See more</Link>
                </p>
            )}

            <div className="flex flex-wrap justify-between items-center gap-4">
                {/* Left Section: Logo and Site Name */}
                <div className="flex items-center gap-3">
                    <img src="/logo.jpeg" alt="Logo" className="w-12 h-12 rounded-full shadow-md border border-white" />
                    <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-green-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-md">
                        Food Waste Rescue
                    </h1>
                </div>

                {/* Center Section: Navigation Links */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    {/* Admin */}
                    {isloggedin && userdata?.user?.isAdmin && (
                        <>
                            <NavLink to="/admin" className={navLinkClass}><LayoutDashboard size={18} /> Admin</NavLink>
                            <NavLink to="/allfoodData" className={navLinkClass}><FileText size={18} /> Food Data</NavLink>
                        </>
                    )}

                    {/* Common (Public / Unverified NGO / User) */}
                    {(!isloggedin || userdata?.user?.isUser || userdata?.user?.isDonor || (userdata?.user?.isNgo && !userdata?.user?.isVarified)) && (
                        <>
                            <NavLink to="/" className={navLinkClass}><Home size={18} /> Home</NavLink>
                            <NavLink to="/about" className={navLinkClass}><Info size={18} /> About</NavLink>
                            <NavLink to="/contact" className={navLinkClass}><Phone size={18} /> Contact</NavLink>
                        </>
                    )}

                    {/* Verified User */}
                    {isloggedin && userdata?.user?.isUser && userdata?.user?.isVarified && (
                        <>
                            <NavLink to="/sell" className={navLinkClass}><Store size={18} /> Sell Food</NavLink>
                            <NavLink to="/chat" className={navLinkClass}><MessageSquare size={18} /> Chat</NavLink>
                        </>
                    )}

                    {/* Verified NGO */}
                    {userdata?.user?.isNgo && userdata?.user?.isVarified && (
                        <>
                            <NavLink to="/alldonatedfoods" className={navLinkClass}><Users size={18} /> Collect Requests</NavLink>
                            <NavLink to="/allcollection" className={navLinkClass}><HandCoins size={18} /> Collect Food</NavLink>
                            <NavLink to="/map" className={navLinkClass}><MapPin size={18} /> Map</NavLink>
                            <NavLink to="/allposts" className={navLinkClass}><FileText size={18} /> Posts</NavLink>
                            <NavLink to="/chat" className={navLinkClass}><MessageSquare size={18} /> Chat</NavLink>
                        </>
                    )}

                    {/* Verified Donor */}
                    {isloggedin && userdata?.user?.isDonor && userdata?.user?.isVarified && (
                        <NavLink to="/donation" className={navLinkClass}><HandCoins size={18} /> Donations</NavLink>
                    )}
                </div>

                {/* Right Section: Profile / Login */}
                <div>
                    {isloggedin ? (
                        <ProfileButton />
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span className="font-semibold">Login</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
