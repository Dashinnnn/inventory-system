import React, { useEffect, useState } from "react";
import api from "../services/api";


export default function WarehouseSection() {
  const [name, setName] = useState("");
  const [warehouses, setWarehouses] = useState([]);


  //const fetchWarehouses = async () => {
    //const res = await api.get("/warehouses");
    //setWarehouses(res.data);
  //};

  //TEMPORARY DATA
  const fetchWarehouses = async () => {
  const mockData = [
    { _id: "1", name: "Main Warehouse" },
    { _id: "2", name: "Backup Warehouse" },
  ];

  setWarehouses(mockData);
};

  const createWarehouse = async () => {
    if (!name) return;

    await api.post("/warehouses", { name });
    setName("");
    fetchWarehouses();
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

 return (
  <div className="card">
    <div className="title">Warehouses</div>

    <div style={{ display: "flex", gap: "8px" }}>
      <input
        className="input"
        placeholder="Warehouse name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="button" onClick={createWarehouse}>
        Add
      </button>
    </div>

    <ul className="list">
      {warehouses.map((w) => (
        <li className="list-item" key={w._id}>
          {w.name}
        </li>
      ))}
    </ul>
  </div>
);
}