import axios from 'axios';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { MdOutlineMail } from 'react-icons/md';
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8000/auth/login', input);
      console.log(rs.data.token);
      localStorage.setItem('token', rs.data.token);
      const rs1 = await axios.get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      });
      console.log(rs1.data);
      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        showConfirmButton: false,
        timer: 3000
      });
      setUser(rs1.data);
    } catch (err) {
      console.log("emailผิด หรือ รหัสผ่านไม่ถูก");
      Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 min-w-[300px] mx-auto">
        <div className="text-3xl mb-8 flex justify-center">เข้าสู่ระบบ</div>
        <form className="flex flex-col" onSubmit={hdlSubmit}>
          <div className="py-4">
            <div className="relative">
              <MdOutlineMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
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
          <div className="flex justify-center">
            <button type="submit" className="btn btn-active btn-neutral px-16">
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
