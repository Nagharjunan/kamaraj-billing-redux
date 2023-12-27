import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProductDetails } from "../../assets/interface";
import "./product-order-list.component.css";

interface ProductOrderListProps {
  products: ProductDetails[];
}

const ProductOrderList: React.FC<ProductOrderListProps> = ({ products }) => {
  return (
    <div>
      <h3>Products In Cart</h3>
      {products.map((product) => (
        <Card key={product.productCode}>
          <>
            <div className="flex justify-content-between">
              <span>{product.productCode}</span>
              <span>{product.productName}</span>
            </div>
            <div className="flex justify-content-between">
              <span>Quantity</span>
              <span>
                {product.qty} {product.unit}
              </span>
            </div>
            <div className="flex justify-content-between">
              <span>Price</span>
              <span>{product.salesRate}</span>
            </div>
          </>
          <div className="flex justify-content-end pt-2">
            <Button label="Edit" className="p-button-secondary mr-2" />
            <Button label="Delete" className="p-button-danger ml-2" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductOrderList;
