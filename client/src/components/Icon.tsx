import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
export default function Icon({ name }: { name: string }) {
  switch (name) {
    case "light":
      return <CiLight />;
    case "dark":
      return <MdDarkMode />;
  }
}
