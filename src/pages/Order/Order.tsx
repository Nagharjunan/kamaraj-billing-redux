import { Card } from "primereact/card";
import ProductTableComponent from "../../components/product-table/product-table-component";
import { ProductDetails } from "../../assets/interface";
import { useState } from "react";
import { Steps, StepsSelectEvent } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import CustomerTableComponent from "../../components/customer-table/customer-table-component";

function OrderComponent(props: { method: string }) {
  const [productCart, setProductCart] = useState<ProductDetails[]>();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const items: MenuItem[] = [
    {
      label: "Customer Details",
      command: (event) => {
        console.log("child 1");
      },
    },
    {
      label: "Order Details",
      command: (event) => {
        console.log("child 2");
      },
    },
    {
      label: "Payment",
      command: (event) => {
        console.log("child 3");
      },
    },
    {
      label: "Confirmation",
      command: (event) => {
        console.log("child 4");
      },
    },
  ];

  function submitProduct(selectedProduct: ProductDetails) {
    // Need to write add product functionality to list to create a new order
    if (!productCart) {
      const _selectedProduct = [selectedProduct];
      console.log(_selectedProduct);
      setProductCart(_selectedProduct);
    }
  }

  function submitCustomer(selectedCustomer: any) {
    console.log(selectedCustomer);
  }
  function showState(e: number) {
    setActiveIndex(e);
  }
  return (
    <>
      <Card>
        <h2 className="text-capitalize">{props.method} Order</h2>
        <Steps
          model={items}
          className="mb-4"
          activeIndex={activeIndex}
          readOnly={true}
        />
        {activeIndex === 0 && (
          <CustomerTableComponent
            method="edit"
            submitCustomer={submitCustomer}
          />
        )}
        {activeIndex === 1 && (
          <>
            <ProductTableComponent
              method="edit"
              submitProduct={submitProduct}
            ></ProductTableComponent>
          </>
        )}
        <button onClick={(e) => showState(activeIndex + 1)}>next</button>
      </Card>
    </>
  );
}
export default OrderComponent;
