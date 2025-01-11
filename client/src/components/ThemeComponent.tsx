import { useRecoilValue, useSetRecoilState } from "recoil";
import Icon from "./Icon";
import { theme } from "../store/theme";

export default function ThemeComponent({ className }: { className: string }) {
  const Theme = useRecoilValue(theme);
  const setTheme = useSetRecoilState(theme);
  const handleTheme = () => {
    if (Theme === "light") setTheme("dark");
    else setTheme("light");
  };
  return (
    <div
      className={`
      ${className} px-2 py-2 w-auto border-1 rounded-md ${
        Theme === "light" ? "border-black" : "border-white"
      }
    `}
      onClick={handleTheme}
    >
      <Icon name={`${Theme}`} />
    </div>
  );
}
