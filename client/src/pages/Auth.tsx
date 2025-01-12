import { useState, FormEvent } from "react";
import { Eye } from "lucide-react";
import desert from "../media/desert.jpg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { theme } from "../store/theme";
import { usePost } from "../helper/hooks";
import swal from "sweetalert";
import { Spinner } from "@nextui-org/react";

interface postResponse {
  message: string;
  token?: string;
}

interface postBody {
  email: string;
  password: string;
}
const Auth = () => {
  const { postData, response, loading, error } = usePost<
    postResponse,
    postBody
  >();
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const Theme = useRecoilValue(theme);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const email = document.getElementById("auth-email") as HTMLInputElement;
    const password = document.getElementById(
      "auth-password"
    ) as HTMLInputElement;

    // Sending POST Request via custom usePost
    postData("https://api-rbac.onrender.com/api/v0/user/login", {
      email: `${email.value}`,
      password: `${password.value}`,
    });

    const token = response?.token;

    if (error) {
      swal("Error", `${error}`, "warning");
    }
    if (!token) {
      swal("Error", "Invalid Credentials", "warning");
    } else {
      localStorage.setItem("token", token);
      navigation("/app");
    }
    email.value = "";
    password.value = "";
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    const email = document.getElementById("auth-email") as HTMLInputElement;

    const password = document.getElementById(
      "auth-password"
    ) as HTMLInputElement;

    postData("https://api-rbac.onrender.com/api/v0/user/register", {
      email: `${email.value}`,
      password: `${password.value}`,
    });

    if (error) {
      swal("Error", `${error}`, "warning");
    } else {
      swal("Registered", "Login with your credentials", "success");
    }

    email.value = "";
    password.value = "";
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

              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                onClick={isLogin ? handleLogin : handleRegister}
              >
                {isLogin ? "Sign in" : "Create account"}{" "}
                {loading && <Spinner />}
              </button>
            </form>

            {/* Social Login */}
            {/* <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-400 bg-gray-900">
                    Or register with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg text-gray-400 hover:border-gray-500 hover:text-white transition-colors">
                  <img
                    src="/api/placeholder/20/20"
                    alt="Google logo"
                    className="w-5 h-5 mr-2"
                  />
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg text-gray-400 hover:border-gray-500 hover:text-white transition-colors">
                  <img
                    src="/api/placeholder/20/20"
                    alt="Apple logo"
                    className="w-5 h-5 mr-2"
                  />
                  Apple
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
