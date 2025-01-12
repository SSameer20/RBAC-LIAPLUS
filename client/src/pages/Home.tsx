import React, { useEffect } from "react";

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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) location.href = "/app";
  }, []);
  return (
    <div className="min-h-screen  flex flex-col justify-start items-center">
      {/* Navigation */}
      <nav className="max-w-7xl min-w-full  mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-xl text-blue-500">Liaplus</span>
          </div>

          <div className="flex items-center space-x-8">
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

      {/* Hero Section */}
      <main className=" px-4 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-semibold text-gray-800 mb-6">
            Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restricting access to resources based on the roles assigned to users
          </p>
        </div>
      </main>
    </div>
  );
}
