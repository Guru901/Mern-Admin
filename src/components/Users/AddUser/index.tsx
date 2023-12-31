import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import "./style.css";

const AddUser = () => {
  const [form, setForm] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await fetch(
        "https://mern-2-rjid.onrender.com/api/user/addUser",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
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
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product", {
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="absolute-center">
      <div className="dets">
        <form onSubmit={handleSubmit} className="absolute-center">
          <label>Email</label>
          <input type="text" onChange={handleChange} name="email" />
          <label>Password</label>
          <input type="password" onChange={handleChange} name="password" />
          <label>Role</label>
          <input type="text" onChange={handleChange} name="role" />
          <label>Image</label>
          <input type="text" onChange={handleChange} name="img" />
          <input type="submit" value={"submit"} className="btn cur-po" />
        </form>
      </div>
    </div>
  );
};

export default AddUser;
