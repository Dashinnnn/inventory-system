import React from "react";
import WarehouseSection from "../components/WarehouseSection";
import ProductSection from "../components/ProductSection";

export default function InventoryPage() {
  return (
    <div className="container">
      <h1 className="title">Inventory Module</h1>

      <div className="row">
        <WarehouseSection />
        <ProductSection />
      </div>
    </div>
  );
}