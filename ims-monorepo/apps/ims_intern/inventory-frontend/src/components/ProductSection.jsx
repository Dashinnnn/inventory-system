import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductSection() {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    warehouseId: "",
  });

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  //const fetchProducts = async () => {
    //const res = await api.get("/products");
    //setProducts(res.data);
  //};

  //
  const fetchProducts = async () => {
  const mockData = [
    { _id: "1", name: "Laptop", sku: "SKU001", warehouseId: "1" },
    { _id: "2", name: "Mouse", sku: "SKU002", warehouseId: "2" },
  ];

  setProducts(mockData);
};

  const createProduct = async () => {
    try {
      setError("");

      //await api.post("/products", product);
        console.log("Mock create:", product);

      setProduct({ name: "", sku: "", warehouseId: "" });
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 return (
  <div className="card">
    <div className="title">Products</div>

    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input
        className="input"
        placeholder="Product name"
        value={product.name}
        onChange={(e) =>
          setProduct({ ...product, name: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="SKU"
        value={product.sku}
        onChange={(e) =>
          setProduct({ ...product, sku: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Warehouse ID"
        value={product.warehouseId}
        onChange={(e) =>
          setProduct({ ...product, warehouseId: e.target.value })
        }
      />

      <button className="button" onClick={createProduct}>
        Add Product
      </button>
    </div>

    {error && <p className="error">{error}</p>}

    <ul className="list">
      {products.map((p) => (
        <li className="list-item" key={p._id}>
          {p.name} | {p.sku} | WH: {p.warehouseId}
        </li>
      ))}
    </ul>
  </div>
);
}