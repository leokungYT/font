import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Importing useEffect
import { Link } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

export default function Home() {
  const [input, setInput] = useState({
    username: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
  });

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        setIsLoading(false); // Update isLoading state once data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false); // Update isLoading state in case of error
      }
    };
    fetchData();
  }, []);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/auth/register', input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.status === 200) {
        alert('Register Successful');
      }
    } catch (err) {
      console.error('Error registering user:', err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 min-w-[300px] mx-auto border border-gray-200 shadow-2xl rounded-lg m-3.5">
        <div className="text-3xl mb-8 flex justify-center">ข้อมูลส่วนตัว</div>
        <form className="flex flex-col" onSubmit={hdlSubmit}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="py-4 flex items-center">
                <FaUserAlt className="mr-2 text-gray-400" />
                <p className="w-full pl-10">ชื่อจริง : {userData.username}</p>
              </div>
              <div className="py-4 flex items-center">
                <FaUserAlt className="mr-2 text-gray-400" />
                <p className="w-full pl-10">นามสกุล : {userData.lastname}</p>
              </div>
              <div className="py-4 flex items-center">
                <FaEnvelope className="mr-2 text-gray-400" />
                <p className="w-full pl-10">email : {userData.email}</p>
              </div>
              <div className="py-4 flex items-center">
                <FaUserAlt className="mr-2 text-gray-400" />
                <p className="w-full pl-10">ตำแหน่ง : {userData.position}</p>
              </div>
              <div className="py-4 flex items-center">
                <FaCircleCheck className="mr-2 text-gray-400" />
                <p className="w-full pl-10">สถานะปัจจุบัน : {userData.status}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-center">
                <button
                  type="submit"
                  className="btn btn-active btn-neutral px-16  mr-0 md:mr-4 mt-12 md:mt-0 mb-2 md:mb-0"
                >
                  เข้างาน
                </button>
                <button
                  type="submit"
                  className="btn btn-active btn-neutral px-16  mr-0 md:mr-4 mt-2 md:mt-0"
                >
                  ออกงาน
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
