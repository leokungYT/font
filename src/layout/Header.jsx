import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaPhoneAlt } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";
import { FaHome } from "react-icons/fa";

const guestNav = [
  { to: "/register", text: "สมัครสมาชิก" },
  
];

const userNav = [
  // { to: "/", text: "Home" },
  // { to: "/new", text: "New Todo" },
];

export default function Nav() {
  const { user, logout } = useAuth();
  const finalNav = user?.id ? userNav : guestNav;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
        <nav className="bg-[#1E2022] text-neutral-content ">
          <div className="flex items-center justify-between flex-1 mx-5 sm:mx-10 md:mx-20 lg:mx-40">
            <Link to="/">
              <div className='text-lg scroll-pl-1.5 w-full p-4'>ระบบบันทึกคนเข้า-คนออก</div>
            </Link>
            <div className="md:hidden">
              <button id='menu-toggle' className='text-white' onClick={toggleMenu}>
                <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            <div className='menu menu-horizontal text-lg flex space-x-4 space-x-2 flex-nowrap md:flex hidden'>
              <ul className="flex-col md:flex-row">
                {finalNav.map(el => (
                  <li key={el.to} className="inline-block">
                    <Link to={el.to} className="flex items-center">
                      <SlLogin /> {el.text}
                    </Link>
                  </li>
                ))}
                  {user?.id && (
                    <>
                      <li className="inline-block">
                        <a href="https://www.facebook.com/profile.php?id=100078116817045" className="menu menu-horizontal text-lg flex gap-2 items-center">
                          <FaPhoneAlt />
                          ติดต่อ
                        </a>                  
                      </li>
                      <li className="inline-block">
                        <Link to="#" onClick={handleLogout}><SlLogin />Logout</Link>
                      </li>
                    </>
                  )}
                  {!user?.id && (
                    <>
                      <li className="inline-block">
                        <a href="https://www.facebook.com/profile.php?id=100078116817045" className="menu menu-horizontal text-lg flex gap-2 items-center">
                          <FaPhoneAlt />
                          ติดต่อ
                        </a>                  
                      </li>
                    </>
                  )}
              </ul>
            </div>
          </div>

          {/*responsive */}
          {isMenuOpen && (
  <ul className='flex-col md:flex-row md:hidden p-4 mr-2'>
    {!user?.id ? (
      <>
        <li className="">
          <a href="https://www.facebook.com/profile.php?id=100078116817045" className="menu menu-horizontal text-lg flex gap-2 items-center">
            <FaPhoneAlt />
            ติดต่อ
          </a>
        </li>
        {finalNav.map((el) => (
          <li key={el.to} className="">
            <Link to={el.to} className='menu menu-horizontal text-lg flex gap-2 items-center'>
              <SlLogin />{el.text}
            </Link>
          </li>
        ))}
      </>
    ) : (
      <>
        <li className="">
          <a href="https://www.facebook.com/profile.php?id=100078116817045" className="menu menu-horizontal text-lg flex gap-2 items-center">
            <FaPhoneAlt />
            ติดต่อ
          </a>
        </li>
        <li className="">
          <Link to="#" onClick={handleLogout} className="menu menu-horizontal text-lg flex gap-2 items-center">
            <SlLogin />Logout
          </Link>
        </li>
      </>
    )}
  </ul>
)}


        </nav>

  );
}
