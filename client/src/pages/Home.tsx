import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { theme } from "../store/theme";
import lock from "../media/lock.png";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a href={href} className="text-gray-600 hover:text-gray-900">
    {children}
  </a>
);

export default function Home() {
  const Theme = useRecoilValue(theme);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) location.href = "/app";
  }, []);
  return (
    <div className="max-h-screen overflow-x-hidden overflow-y-auto scrollbar-hide">
      <nav className="max-w-7xl min-w-full mx-auto px-4 py-6 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`font-semibold text-xl text-blue-500`}>
              Liaplus
            </span>
          </div>

          <div className="flex items-start space-x-8">
            <NavLink href="/app">App</NavLink>
            <NavLink href="/auth">Login</NavLink>
            <button
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              onClick={() => (location.href = "/auth")}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      <div className="min-h-[80v] flex flex-col justify-center items-center">
        {/* Navigation */}

        {/* Hero Section */}
        <main className="flex justify-center">
          <div className="text-left h-[80vh]  flex flex-col justify-center items-start">
            <h1
              className={`text-4xl font-bold mb-6 ${
                Theme === "light" ? `text-gray-600` : `text-gray-50`
              }`}
            >
              Role-Based Access Control (RBAC)
            </h1>
            <p
              className={`text-xl  max-w-xl ${
                Theme === "light" ? `text-gray-600` : `text-gray-50`
              }`}
            >
              We Provide you Safe and Reliable Role Based Access Controll System
              for you and your team.
            </p>
          </div>
          <div className=" h-[80vh]">
            <img src={lock} alt="lock" className=" z-1" />
          </div>
        </main>
      </div>
    </div>
  );
}
