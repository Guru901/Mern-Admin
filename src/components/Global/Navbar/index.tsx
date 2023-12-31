import { useLocation } from "react-router-dom";
import "./style.css";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Navbar = () => {
  const location = useLocation();
  let title = capitalize(location.pathname.substring(1));

  if (location.pathname === "/") {
    title = "Sing In";
  }

  return (
    <nav className="max-width absolute-center">
      <h1>{title}</h1>
    </nav>
  );
};

export default Navbar;
