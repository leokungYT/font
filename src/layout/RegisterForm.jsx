import axios from 'axios';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineMail } from 'react-icons/md';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '', 
    lastname: '', 
    email: '',
    password: '',
    phone: '',
    Role: 'User',
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8000/auth/register', input);
      console.log(rs);
      if (rs.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        // เคลียร์ฟอร์ม
        setInput({
          username: '', 
          lastname: '', 
          email: '',
          password: '',
          phone: '',
          Role: 'User',
        });
      }
    } catch (err) {
      console.log("emailถูกใช้งานไปแล้ว:", err.message);
      Swal.fire({
        icon: 'error',
        title: 'สมัครไม่สำเร็จ',
        text: 'emailถูกใช้งานไปแล้ว'
      });
       // เคลียร์ฟอร์ม
       setInput({
        username: '', 
        lastname: '', 
        email: '',
        password: '',
        phone: '',
        Role: 'User',
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
    <div className="p-5  min-w-[300px] mx-auto">
      <div className="text-3xl mb-8 flex justify-center" >สมัครสมาชิก</div>
      <form className="flex flex-col " onSubmit={hdlSubmit}>
      <div className=" py-4">
            <div className="relative">
              <FaUserLarge className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="input input-bordered w-full md:w-96 pl-10 "
          name="username"
          placeholder="ชื่อจริง"
          value={input.username}
          onChange={hdlChange}
        />
        </div>
      </div>
      <div className=" py-4">
            <div className="relative">
              <FaUserLarge className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="input input-bordered w-full md:w-96 pl-10 "
          name="lastname"
          placeholder="นามสกุล"
          value={input.lastname}
          onChange={hdlChange}
        />
                </div>
      </div>
      <div className=" py-4">
            <div className="relative">
            <MdOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="input input-bordered w-full md:w-96 pl-10 "
          name="email"
          placeholder="อีเมล"
          value={input.email}
          onChange={hdlChange}
        />
                        </div>
      </div>
      <div className="py-4">
            <div className="relative">
              <RiLockPasswordLine className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="password"
          className="input input-bordered w-full md:w-96 pl-10 "
          name="password"
          placeholder="รหัสผ่าน"
          value={input.password}
          onChange={hdlChange}
        />
                                </div>
      </div>
      <div className="py-4">
            <div className="relative">
              <FaPhoneAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="input input-bordered w-full md:w-96 pl-10 "
          name="phone"
          placeholder="เบอร์โทร"
          value={input.phone}
          onChange={hdlChange}
        />
                                </div>
      </div>
        <div className="flex justify-center mt-7	">
          <button type="submit" className="btn btn-active btn-neutral px-16 mr-4">
            สมัครสมาชิก
            </button> 
            <Link to="/" className="btn btn-active btn">ย้อนกลับ</Link>
          </div>
      </form>
    </div>
  </div>
  );
}
