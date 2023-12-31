import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import "./style.css";

const AddProduct = () => {
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
        "https://mern-2-rjid.onrender.com/api/product/addProduct",
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
    <div className="absolute-center product-container">
      <div className="product absolute-center">
        <img
          src="/imgs/product page imgs/products/category-2-list/product-7.png"
          alt=""
        />

        <div className="product-des">
          <p className="product-name">Company Name</p>
          <p className="product-category">Product Name</p>
          <p className="product-reviews">
            <img src="/imgs/home page imgs/extras/star 2.png" alt="" />
            <img src="/imgs/home page imgs/extras/star 2.png" alt="" />
            <img src="/imgs/home page imgs/extras/star 2.png" alt="" />
            <img src="/imgs/home page imgs/extras/star 2.png" alt="" />
            <img src="/imgs/home page imgs/extras/star 2.png" alt="" />
            (289)
          </p>
          <div className="prices absolute-center">
            <p className="product-price">$discountedPrice</p>
            <s>$Price</s>
            <p className="product-discount">Discount</p>
          </div>
        </div>
      </div>
      <div className="dets">
        <form onSubmit={handleSubmit}>
          <label>Company Name</label>
          <input type="text" onChange={handleChange} name="companyName" />
          <label>Product Name</label>
          <input type="text" onChange={handleChange} name="productName" />
          <label>Price</label>
          <input type="text" onChange={handleChange} name="price" />
          <label>Discount</label>
          <input type="text" onChange={handleChange} name="discount" />
          <label>Discounted Price</label>
          <input type="text" onChange={handleChange} name="discountedPrice" />
          <label>Image Buffer</label>
          <input type="text" onChange={handleChange} name="img" />
          <label>Category</label>
          <input type="text" onChange={handleChange} name="category" />
          <input type="submit" value={"submit"} className="btn cur-po" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
