import { menu } from "../store/menu";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Icon from "./Icon";
import { theme } from "../store/theme";
import { user } from "../store/user";

export default function Sidebar() {
  const menuOption = useRecoilValue(menu);
  const Theme = useRecoilValue(theme);
  const setMenuOption = useSetRecoilState(menu);
  const Role = localStorage.getItem("role");
  const setRole = useSetRecoilState(user);
  const spanStyles = "cursor-pointer hover:scale-[1.1]";
  const sidebarStyles =
    Theme === "light"
      ? "bg-[var(--primary-bg-color)] border-black border-1"
      : "bg-[#3D3D3D]";
  const menuIcon = menuOption !== "open" ? "openMenu" : "closeMenu";

  const handleMenu = () => {
    setMenuOption((prev) => (prev === "open" ? "close" : "open"));
  };

  return (
    <div className="absolute top-2 left-2 z-50">
      <div
        style={{ cursor: "pointer" }}
        className={`absolute top-5 left-5 p-2 rounded-[50%] ${sidebarStyles}`}
      >
        <Icon name={menuIcon} func={handleMenu} />
      </div>
      {menuOption === "open" && (
        <div
          className={`m-2 lg:min-w-[10vw] min-w-auto h-[80vh] rounded-lg ${sidebarStyles} flex flex-col justify-center items-center gap-5`}
        >
          <span
            className={`${spanStyles}`}
            onClick={() => (location.href = "/app")}
          >
            Feed
          </span>
          <span
            className={`${spanStyles}`}
            onClick={() => (location.href = "/app/posts")}
          >
            Posts
          </span>
          {Role === "admin" && (
            <span
              className={`${spanStyles}`}
              onClick={() => (location.href = "/app/users")}
            >
              Users
            </span>
          )}

          <span
            className={`${spanStyles}`}
            onClick={() => {
              setRole("user");
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              location.href = "/";
            }}
          >
            Logout
          </span>
        </div>
      )}
    </div>
  );
}
