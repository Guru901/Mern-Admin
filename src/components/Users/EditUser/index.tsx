import { ChangeEvent, useState, FormEvent } from "react";
import "./style.css";
import { toast } from "react-toastify";

const EditUser = (props: any) => {
  const [edit, setEdit] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch(
      "https://mern-2-rjid.onrender.com/api/user/editUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edit),
      }
    );

    if (data.ok) {
      const response = await data.json();
      toast.success(response.msg, {
        style: {
          background: "black",
          color: "white",
        },
      });
    } else {
      toast.error("Failed to add the product", {
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="absolute-center dets-container">
      <div className="dets absolute-center">
        <form onSubmit={handleSubmit} className="editUserForm">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder={`${props.userEdit?.email}`}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder={`${props.userEdit?.password}`}
            onChange={handleChange}
          />
          <label>Image</label>
          <input
            type="text"
            name="img"
            placeholder={`${props.userEdit?.img}`}
            onChange={handleChange}
          />
          <input type="submit" value={"submit"} className="btn cur-po" />
        </form>
      </div>
    </div>
  );
};

export default EditUser;
