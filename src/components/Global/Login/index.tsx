import "./style.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../AuthContext"; // Update the path to your AuthContext

const Login = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Get access to the login function from the AuthContext

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch(
      "https://mern-2-rjid.onrender.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const response = await data.json();
    console.log(response);

    if (response.msg === "Successfully Logged in") {
      login(); // Set the isLoggedIn state to true
      navigate("/dashboard");
    } else {
      toast.error("Wrong Credentials", {
        style: {
          background: "black",
        },
      });
    }
  };

  return (
    <form className="absolute-center loginForm" onSubmit={handleSubmit}>
      <label className="signIn-label">Email</label>
      <input
        className="signIn-input"
        type="email"
        name="email"
        required
        onChange={handleChange}
        placeholder="Email Address"
      />
      <label className="signIn-label">Password</label>
      <input
        className="signIn-input"
        type="password"
        required
        onChange={handleChange}
        placeholder="Password"
        name="password"
      />
      <input type="submit" value="Sign In" className="signIn-btn cur-po" />
    </form>
  );
};

export default Login;
