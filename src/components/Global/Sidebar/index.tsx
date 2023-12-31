import SidebarElem from "../SidebarElement";
import "./style.css";
import profile from "../../../profile.png";

const Sidebar = () => {
  return (
    <div className="sidebar absolute-center">
      <div className="sidebar-top">
        <div className="admin-details absolute-center">
          <img className="img" src={profile} />
          <div className="name absolute-center">
            <p>Name - Gurvinder</p>
            <p> Roll - Admin</p>
          </div>
        </div>
      </div>
      <div className="sidebar-mid">
        <div className="pages absolute-center">
          <h1>Pages</h1>
          <div className="elem-container absolute-center">
            <SidebarElem title="Dashboard" />
            <SidebarElem title="Users" />
            <SidebarElem title="Analytics" />
            <SidebarElem title="AllProducts" />
            <SidebarElem title="Transactions" />
          </div>
        </div>
        <div className="products absolute-center">
          <h1>User</h1>
          <div className="elem-container absolute-center">
            <SidebarElem title="Settings" />
            <SidebarElem title="Help" />
            <SidebarElem title="Logout" to="/login" />
          </div>
        </div>
      </div>
      <div className="sidebar-bottom"></div>
    </div>
  );
};

export default Sidebar;
