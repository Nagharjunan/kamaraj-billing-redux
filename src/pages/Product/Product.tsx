import { Card } from "primereact/card";
import "./Product.css";
import ProductTableComponent from "../../components/product-table/product-table-component";
import { ProductDetails } from "../../assets/interface";

function ProductComponent(props: { method: string }) {
  function submitProduct(selectedProduct: ProductDetails) {
    // need to add create and edit functionality to update or create in database
    console.log("Selected ", selectedProduct);
  }
  return (
    <>
      <Card>
        <h2 className="text-capitalize">{props.method} Product</h2>
        <ProductTableComponent
          method={props.method}
          submitProduct={submitProduct}
        ></ProductTableComponent>
      </Card>
    </>
  );
}

export default ProductComponent;
