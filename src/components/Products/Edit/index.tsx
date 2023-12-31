import { ChangeEvent, useState, FormEvent } from "react";
import "./style.css";
import { toast } from "react-toastify";

const Edit = (props: any) => {
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
      "https://mern-2-rjid.onrender.com/api/product/editproduct",
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
    <div className="absolute-center product-container">
      <div className="product absolute-center">
        <img src={props.product?.img} alt="" />

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
          <input
            type="text"
            name="companyName"
            placeholder={`${props.product?.companyName}`}
            onChange={handleChange}
          />
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            placeholder={`${props.product?.productName}`}
            onChange={handleChange}
          />
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder={`${props.product?.price}`}
            onChange={handleChange}
          />
          <label>Discount</label>
          <input
            type="text"
            name="discount"
            placeholder={`${props.product?.discount}`}
            onChange={handleChange}
          />
          <label>Discounted Price</label>
          <input
            type="text"
            name="discountedPrice"
            placeholder={`${props.product?.discountedPrice}`}
            onChange={handleChange}
          />
          <label>Image Buffer</label>
          <input type="text" name="img" onChange={handleChange} />
          <label>Category</label>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            placeholder={`${props.product?.category}`}
          />
          <input type="submit" value={"submit"} className="btn cur-po" />
        </form>
      </div>
    </div>
  );
};

export default Edit;
