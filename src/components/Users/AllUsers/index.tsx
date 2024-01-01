import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "./style.css";

interface User {
  email: string;
  role: string;
  password: string;
  img: string;
}

interface AllUsersProps {
  getEditUser: (user: any) => void;
}

const AllUsers: React.FC<AllUsersProps> = (props: any) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const data = await fetch(
        "https://mern-2-rjid.onrender.com/api/user/getAllUsers",
        {
          method: "GET",
        }
      );

      const usersData: User[] = await data.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleDelete = async (email: string, password: string) => {
    try {
      await fetch(`https://mern-2-rjid.onrender.com/api/user/deleteUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      await getAllUsers();
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const handleEdit = async (email: string, password: string) => {
    try {
      const product = await fetch(
        `https://mern-2-rjid.onrender.com/api/user/editUserSend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const response = await product.json();
      props.getEditUser(response);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="users">
      <div className="user-btn absolute-center">
        <Link to="/user/add">
          <button className="cur-po">Add User</button>
        </Link>
      </div>
      {users.map((elem, index) => (
        <div className="user absolute-center" key={index}>
          <img src={elem.img} alt="" />
          <div className="user-des absolute-center">
            <div className="names">
              <p className="user-name">Email - {elem.email}</p>
              <p className="user-name">Password - {elem.password}</p>
              <p className="user-name">Role - {elem.role}</p>
            </div>
            {elem.role === "user" && (
              <button
                className="delbtn absolute-center cur-po"
                onClick={() => handleDelete(elem.email, elem.password)}
              >
                <MdDelete size={21} />
              </button>
            )}
            {elem.role === "user" && (
              <Link to="/users/edit">
                <button
                  className="editbtn absolute-center cur-po"
                  onClick={() => handleEdit(elem.email, elem.password)}
                >
                  <FaEdit size={18} />
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
