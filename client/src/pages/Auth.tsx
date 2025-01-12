import { useState, FormEvent, useRef } from "react";
import { Eye } from "lucide-react";
import desert from "../media/desert.jpg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { theme } from "../store/theme";
import axios from "axios";
import swal from "sweetalert";
import { Spinner } from "@nextui-org/react";
// import { Alert } from "@nextui-org/alert";
// import { Response } from "express";

// interface postResponse extends Response {
//   message: string;
//   token?: string;
// }

// interface postBody {
//   email: string;
//   password: string;
// }
const Auth = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const Theme = useRecoilValue(theme);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      // Safely access input values
      const email = emailRef.current?.value.trim();
      const password = passwordRef.current?.value.trim();
      const role = roleRef.current?.value;

      // Validate inputs
      if (!email || !password || !role) {
        swal(
          "All fields are required",
          "Please fill out all fields",
          "warning"
        );
        return;
      }

      // Make login request
      const response = await axios.post(
        `https://api-rbac.onrender.com/api/v0/${role}/login`,
        { email, password }
      );
      let token;
      if (response && response.data) {
        token = response.data.token;
        if (!token) {
          throw new Error("Invalid or No Token");
        } else {
          localStorage.setItem("token", token);
          swal("logged", "Successfully logged", "success");
          navigation("/app");
        }
      }

      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          swal(error.response.data.message, "Error in the request", "warning");
        } else if (error.response.status >= 500) {
          swal(error.response.data.message, "Server error", "error");
        }
      } else {
        swal("No response from the server", "Network error", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const email = emailRef.current?.value.trim();
      const password = passwordRef.current?.value.trim();
      const role = roleRef.current?.value;
      // Validate inputs
      if (!email || !password || !role) {
        swal(
          "All fields are required",
          "Please fill out all fields",
          "warning"
        );
        return;
      }
      // Make login request
      const response = await axios.post(
        `https://api-rbac.onrender.com/api/v0/${role}/register`,
        { email, password }
      );

      if (response && response.data) {
        if (response.status !== 201) {
          throw new Error("Invalid or No Token");
        } else {
          swal("registered", "Please login with credentials", "success");
          navigation("/auth");
        }
      }

      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          swal(error.response.data.message, "Error in the request", "warning");
        } else if (error.response.status >= 500) {
          swal(error.response.data.message, "Server error", "error");
        }
      } else {
        swal("No response from the server", "Network error", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        Theme === "light" ? "bg-[var(--primary-bg-color)]" : "bg-gray-900"
      } `}
    >
      {/* Left Section - Image and Text */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-purple-900">
        <div className="absolute inset-0">
          <img
            src={desert}
            alt="Desert landscape"
            className="object-cover w-full h-full opacity-50"
          />
        </div>
        <div
          className={`relative z-10 flex flex-col justify-end p-12 text-white`}
        >
          <h2 className="text-4xl font-bold mb-6">
            Securing Every Layer,
            <br />
            For more Security and Privacy
          </h2>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div
              className={`text-2xl font-bold ${
                Theme === "light" ? "text-black" : "text-white"
              }`}
            >
              LiaPlus AI
            </div>
            <button
              className={`${
                Theme === "light"
                  ? "bg-gray-400 text-gray-800 hover:text-white"
                  : "text-gray-400 bg-gray-800 hover:text-white"
              } px-4 py-2 rounded-full `}
              onClick={() => navigation("/")}
            >
              Back to website →
            </button>
          </div>

          {/* Form */}
          <div className="mt-16">
            <h1
              className={`text-4xl font-bold ${
                Theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-gray-400 mb-8">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className={`${
                  Theme === "light" ? "text-black" : "text-white"
                } hover:underline`}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>

            <form className="space-y-6">
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                id="auth-email"
                className={`w-full px-4 py-3 rounded-lg ${
                  Theme === "light"
                    ? "border-1 border-[bg-gray-800] text-black placeholder-gray-400"
                    : "bg-gray-800  text-white placeholder-gray-400"
                }  focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />

              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  id="auth-password"
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 rounded-lg ${
                    Theme === "light"
                      ? "border-1 border-[bg-gray-800] text-black placeholder-gray-400"
                      : "bg-gray-800  text-white placeholder-gray-400"
                  }  focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Eye size={20} />
                </button>
              </div>

              <select
                ref={roleRef}
                name="role"
                id="user-role"
                className={`w-full px-4 py-3 rounded-lg ${
                  Theme === "light"
                    ? "border-1 border-[bg-gray-800] text-black placeholder-gray-400"
                    : "bg-gray-800  text-white placeholder-gray-400"
                }  focus:outline-none focus:ring-2 focus:ring-purple-500`}
                aria-placeholder="role"
              >
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
              </select>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                onClick={isLogin ? handleLogin : handleRegister}
              >
                {isLogin ? "Sign in" : "Create account"}{" "}
                {loading && <Spinner />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
