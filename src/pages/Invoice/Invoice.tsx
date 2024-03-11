import { MouseEventHandler, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { OrderState, getAllOrder } from "../../features/order/orderSlice";
import { orderPaidAPI, sendOrderEmailAPI } from "../../features/order/orderAPI";
import { userData } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isSuccess } from "../../assets/config";
import { closeLoading, setLoading } from "../../features/Loader/loaderSlice";
import { ReviewOrderComponent } from "../../components/review-order/review-order-component";
import { Button } from "primereact/button";
import { OrderDetails } from "../../assets/interface";
import { GlobalService } from "../../features/global.service";

export function InvoiceComponent() {
  const dispatch = useAppDispatch();
  const _orderState = useAppSelector(OrderState);
  const _authState = useAppSelector(userData);
  const navigate = useNavigate();
  const fetchOrders = GlobalService().fetchOrders;

  useEffect(() => {
    if (_authState.value.isLoggedIn) {
      fetchOrders();
    } else {
      navigate("/");
    }
  }, []);

  const sendOrderPDF = async (order: OrderDetails) => {
    dispatch(setLoading());
    const orderPDF = await sendOrderEmailAPI(
      order,
      _authState.value.accessToken
    );
    if (isSuccess(orderPDF)) {
      toast.success("Email Send Successfully");
      dispatch(closeLoading());
    } else {
      toast.error("Email Send Failed");
      dispatch(closeLoading());
    }
  };

  const orderPaid = async (order: OrderDetails) => {
    dispatch(setLoading());
    const orderPaid = await orderPaidAPI(
      order._id || "",
      _authState.value.accessToken,
      order.paymentMode
    );
    if (isSuccess(orderPaid)) {
      toast.success("Order Paid");
      fetchOrders();
      dispatch(closeLoading());
    } else {
      toast.error("Failed, try again later");
      dispatch(closeLoading());
    }
  };

  return (
    <div className="p-2">
      <h3>Invoice</h3>
      {/* take _orderState.values and map it, display the orderDate, orderedFor.customerName and a view link */}
      {_orderState.value.map((order) => {
        return (
          <div key={order._id}>
            <p>
              {new Date(order.orderDate).toLocaleDateString()} {" - "}{" "}
              {order.orderId}
            </p>
            <p>{order.orderedFor.customerName}</p>
            <p>Order Status : {order.orderStatus}</p>
            <p>Payment Mode : {order.paymentMode.toUpperCase()}</p>
            <p>
              Payment Status :{" "}
              {order.paymentDetails.isPaymentDone ? "Paid" : "Not Paid"}
            </p>
            <div className="flex justify-content-end">
              <Button severity="info" onClick={() => sendOrderPDF(order)}>
                View Order
              </Button>
              {_authState.value.role === "admin" &&
                order.approved.isApproved &&
                !order.paymentDetails.isPaymentDone && (
                  <Button
                    label="Paid"
                    onClick={() => {
                      orderPaid(order);
                    }}
                    className="p-button-success ml-2"
                  />
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
