import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { TfiMenu } from "react-icons/tfi";
import { GrClose } from "react-icons/gr";
export default function Icon({
  name,
  func,
}: {
  name: string;
  func?: () => void;
}) {
  switch (name) {
    case "light":
      return <CiLight onClick={func} />;
    case "dark":
      return <MdDarkMode onClick={func} />;
    case "openMenu":
      return <TfiMenu onClick={func} />;
    case "closeMenu":
      return <GrClose onClick={func} />;
  }
}
