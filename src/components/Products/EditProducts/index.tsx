import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

interface EditProducts {
  getEdit: (user: any) => void;
}

const EditProducts: React.FC<EditProducts> = (props: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

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

  const handleDelete = async (productName: string, companyName: string) => {
    try {
      await fetch(
        `https://mern-2-rjid.onrender.com/api/product/deleteProduct`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName, companyName }),
        }
      );
      await getAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = async (productName: string, companyName: string) => {
    try {
      const product = await fetch(
        `https://mern-2-rjid.onrender.com/api/product/editProductSend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName, companyName }),
        }
      );
      const response = await product.json();
      props.getEdit(response);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="productss ">
      <div className="pright absolute-center">
        <div className="d-products">
          {products.map((elem, index) => (
            <div className="delete-product absolute-center" key={index}>
              <img src={elem.img} alt="" />
              <div className="product-des absolute-center">
                <div className="names">
                  <p className="product-name">{elem.productName}</p>
                  <p className="product-category">{elem.companyName}</p>
                </div>
                <div className="prices absolute-center">
                  <p className="product-price">${elem.discountedPrice}</p>
                  <s>${elem.price}</s>
                  <p className="product-discount">-{elem.discount}%</p>
                  <button
                    className="delbtn absolute-center cur-po"
                    onClick={() =>
                      handleDelete(elem.productName, elem.companyName)
                    }
                  >
                    <MdDelete size={21} />
                  </button>
                  <Link to="/product/edit">
                    <button
                      className="editbtn absolute-center cur-po"
                      onClick={() =>
                        handleEdit(elem.productName, elem.companyName)
                      }
                    >
                      <FaEdit size={18} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
