import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Global/Navbar";
import AllProducts from "./components/Products/AllProducts";
import Sidebar from "./components/Global/Sidebar";
import EditProducts from "./components/Products/EditProducts";
import { useAuth } from "./AuthContext";
import Edit from "./components/Products/Edit";
import Login from "./components/Global/Login";
import AllUsers from "./components/Users/AllUsers";
import AddUser from "./components/Users/AddUser";
import EditUser from "./components/Users/EditUser";
import AddProduct from "./components/Products/AddProduct";

const AppContent: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const [user, setUser] = useState();

  const isLoginPage = window.location.pathname === "/login";

  React.useEffect(() => {
    if (!isLoggedIn && !isLoginPage) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoginPage, navigate]);

  const getEdit = (response: any) => {
    setResponse(response);
  };

  const getEditUser = (user: any) => {
    setUser(user);
  };

  getEdit;
  getEditUser;
  return (
    <>
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {isLoggedIn ? (
          <>
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route
              path="/users"
              element={<AllUsers getEditUser={getEditUser} />}
            />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/users/edit" element={<EditUser userEdit={user} />} />
            <Route path="/product/edit" element={<Edit product={response} />} />
            <Route
              path="/editproduct"
              element={<EditProducts getEdit={getEdit} />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
};

export default AppContent;
