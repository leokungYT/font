import axios from 'axios';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '', 
    lastname: '', 
    email: '',
    password: '',
    phone: '',
  });

  
  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8000/auth/register', input);
      console.log(rs);
      if (rs.status === 200) {
        alert('Register Successful');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 min-w-[300px] mx-auto border border-gray-200 shadow-2xl rounded-lg m-3.5	">
        <div className="text-3xl mb-8 flex justify-center">ข้อมูลส่วนตัว</div>
        <form className="flex flex-col" onSubmit={hdlSubmit}>
          <div className="py-4 flex items-center">
            <FaUserAlt className="mr-2 text-gray-400" />
            <p className="w-full pl-10">{input.username} ตัวอย่าง ชื่อจริง</p>
          </div>
          <div className="py-4 flex items-center">
            <FaUserAlt className="mr-2 text-gray-400" />
            <p className="w-full pl-10">{input.lastname} ตัวอย่าง นามสกุล</p>
          </div>
          <div className="py-4 flex items-center">
            <FaEnvelope className="mr-2 text-gray-400" />
            <p className="w-full pl-10">{input.email} leokungYT@gmail.com</p>
          </div>
          <div className="py-4 flex items-center">
            <FaUserAlt className="mr-2 text-gray-400" />
            <p className="w-full pl-10">{input.position} ตำแหน่ง : พนักงาน</p>
          </div>
          <div className="py-4 flex items-center">
            <FaCircleCheck  className="mr-2 text-gray-400" />
            <p className="w-full pl-10">{input.phone} สถานะปัจจุบัน : อยู่</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center">
            <button type="submit" className="btn btn-active btn-neutral px-16  mr-0 md:mr-4 mt-12 md:mt-0 mb-2 md:mb-0">
              เข้างาน
            </button>
            <button type="submit" className="btn btn-active btn-neutral px-16  mr-0 md:mr-4 mt-2 md:mt-0">
              ออกงาน
            </button>          
          </div>
        </form>
      </div>
    </div>
  );
}
