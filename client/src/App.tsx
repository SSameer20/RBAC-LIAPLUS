import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col justify-center items-center">
      <Sidebar />
      <div className="w-[80vh] h-[80vh]">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
