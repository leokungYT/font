import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaPhoneAlt } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";

const guestNav = [
  { to: "/Home", text: "index" },
  { to: "/register", text: "สมัครสมาชิก" },
];

const userNav = [
  { to: "/", text: "Home" },
  { to: "/new", text: "New Todo" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.id ? userNav : guestNav;
  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-[#1E2022] text-neutral-content justify-between shadow-lg ">
      <div className="flex-1 mx-5 sm:mx-10 md:mx-20 lg:mx-40 ">
        <a href="/" className=" text-lg scroll-pl-1.5 w-full	truncate ...">
          ระบบบันทึกคนเข้า-คนออก
        </a>
      </div>

      <div className="flex-none mx-5 sm:mx-10 md:mx-20 lg:mx-40">
        <div className="md:hidden">
          <button id="menu-toggle" className="text-white" onClick={() => {}}>
            <svg
              fill="none"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <ul className="menu menu-horizontal px-1 text-lg flex gap-5 hidden md:flex space-x-4">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100078116817045"
              className="menu menu-horizontal text-lg flex gap 5"
            >
              <FaPhoneAlt />
              ติดต่อ
            </a>
          </li>
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link to={el.to}>
                <SlLogin /> {el.text}
              </Link>
            </li>
          ))}
          {user?.id && (
            <li>
              <Link to="#" onClick={hdlLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
