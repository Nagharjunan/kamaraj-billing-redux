import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { OrderDetails } from "../../assets/interface";
import { useAppSelector } from "../../app/hooks";
import { userData } from "../../features/Auth/AuthSlice";
import { Divider } from "primereact/divider";

function OrderListComponent(props: {
  type: string;
  orders: OrderDetails[];
  approveOrder?: any;
  editOrder?: any;
  viewOrder: any;
  deleteOrder: any;
}) {
  const authState = useAppSelector(userData);

  return (
    <div>
      <h3>{props.type}</h3>
      {props.orders.map((order) => (
        <Card key={order._id}>
          <>
            <div className="">
              <span>{order.orderedFor.customerName}</span>
            </div>
            <div className="flex justify-content-between">
              <span>Order Number</span>
              <span>{order.orderId}</span>
            </div>
            <div className="flex justify-content-between">
              <span>Order Status</span>
              <span>{order.orderStatus}</span>
            </div>
            <div className="flex justify-content-between">
              <span>Order Date</span>
              <span>
                {new Date(order.orderDate).toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="flex justify-content-between">
              <span>Order Amount</span>
              <span>
                {order.orderList.reduce(
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
          </>
          <div className="flex justify-content-end pt-2">
            {props.type.toLocaleLowerCase().includes("pending") &&
              authState.value.role === "admin" && (
                <Button
                  label="Approve"
                  className="p-button-success mr-2"
                  onClick={() => {
                    props.approveOrder(order._id);
                  }}
                />
              )}

            {!order.approved.isApproved && (
              <Button
                label="Edit"
                className="p-button-secondary mr-2"
                onClick={() => {
                  props.editOrder(order);
                }}
              />
            )}
            <Button
              label="View"
              className="p-button-primary"
              onClick={() => {
                props.viewOrder(order);
              }}
            />
            {authState.value.role === "admin" && (
              <Button
                label="Delete"
                onClick={() => {
                  props.deleteOrder(order);
                }}
                className="p-button-danger ml-2"
              />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default OrderListComponent;
