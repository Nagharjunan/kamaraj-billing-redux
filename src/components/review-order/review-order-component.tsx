import { CustomerDetails, ProductDetails } from "../../assets/interface";

export function ReviewOrderComponent(props: {
  productCart: ProductDetails[];
  customer: CustomerDetails;
  isOrder: boolean;
}) {
  return (
    <>
      {props.isOrder ? <h3>Review Order</h3> : <h3>Invoice</h3>}
      <>
        <h5>Customer</h5>
        <>
          <div>{props.customer.customerName}</div>
          <div>{props.customer.gstNumber}</div>
          <div>{props.customer.customerBillAddline1}</div>
          <div>{props.customer.customerBillAddline2}</div>
          <div>{props.customer.customerBillAddline3}</div>
          <div>{props.customer.phoneNumber}</div>
        </>
      </>
      <hr />
      <div className="flex flex-column">
        <h5>Product List</h5>
        {props.productCart.map((product) => (
          <div key={product.productCode}>
            <>
              <div>
                <span className="font-semibold">{product.productName}</span>
              </div>
              <span>
                {product.qty} x
                {(
                  parseFloat(product.salesRate) *
                  (1 + parseFloat(product.GST) / 100)
                ).toFixed(2)}
                ={" "}
                {Math.round(
                  Number(
                    parseFloat(product.salesRate) *
                      (1 + parseFloat(product.GST) / 100)
                  ) * Number(product.qty)
                )}
              </span>
            </>
            <hr />
          </div>
        ))}
      </div>

      <div className="flex justify-content-between">
        <span>Total</span>
        <span>
          {props.productCart.reduce(
            (acc: any, product: any) =>
              Math.round(
                acc +
                  Math.round(
                    Number(
                      parseFloat(product.salesRate) *
                        (1 + parseFloat(product.GST) / 100)
                    ) * Number(product.qty)
                  )
              ),
            0
          )}
        </span>
      </div>
      <hr />
    </>
  );
}
