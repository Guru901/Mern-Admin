import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface Product {
  discount: number;
  price: number;
  img: string;
  productName: string;
  companyName: string;
  discountedPrice: number;
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await fetch(
          "https://mern-2-rjid.onrender.com/api/product/getAllProducts",
          {
            method: "GET",
          }
        );

        const productsData: Product[] = await data.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="productss ">
      <div className="pright absolute-center">
        <div className="product-btn absolute-center">
          <Link to="/product/add">
            <button className="cur-po">Add Product</button>
          </Link>
          <Link to="/editproduct">
            <button className="cur-po">Edit Product</button>
          </Link>
        </div>
        <div className="p-products">
          {products.map((elem, index) => (
            <div className="product absolute-center" key={index}>
              <img src={elem.img} alt="" />
              <div className="product-des">
                <p className="product-name">{elem.productName}</p>
                <p className="product-category">{elem.companyName}</p>
                <p className="product-reviews">
                  <img src="/imgs/Home Page imgs/extras/Star 2.png" alt="" />
                  <img src="/imgs/Home Page imgs/extras/Star 2.png" alt="" />
                  <img src="/imgs/Home Page imgs/extras/Star 2.png" alt="" />
                  <img src="/imgs/Home Page imgs/extras/Star 2.png" alt="" />
                  <img src="/imgs/Home Page imgs/extras/Star 2.png" alt="" />
                  (289)
                </p>
                <div className="prices absolute-center">
                  <p className="product-price">${elem.discountedPrice}</p>
                  <s>${elem.price}</s>
                  <p className="product-discount">-{elem.discount}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
