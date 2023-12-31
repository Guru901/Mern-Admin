import "./style.css";
import { Link } from "react-router-dom";

const SidebarElem = (props: any) => {
  const lowercaseTitle = props.title.toLowerCase();

  return (
    <div className="elem absolute-center">
      <Link to={props.to ? props.to : lowercaseTitle}>{props.title}</Link>
    </div>
  );
};

export default SidebarElem;
