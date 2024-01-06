import { MouseEventHandler, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { OrderState, getAllOrder } from "../../features/order/orderSlice";
import { getOrdersAPI, sendOrderEmailAPI } from "../../features/order/orderAPI";
import { userData } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isSuccess } from "../../assets/config";
import { closeLoading, setLoading } from "../../features/Loader/loaderSlice";
import { ReviewOrderComponent } from "../../components/review-order/review-order-component";
import { Button } from "primereact/button";
import { OrderDetails } from "../../assets/interface";

export function InvoiceComponent() {
  const dispatch = useAppDispatch();
  const _orderState = useAppSelector(OrderState);
  const _authState = useAppSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (_authState.value.isLoggedIn) {
      if (_orderState.value.length === 0) {
        fetchOrders();
      }
    } else {
      navigate("/");
    }
  }, []);

  const fetchOrders = async () => {
    dispatch(setLoading());
    const orderList = await getOrdersAPI(_authState.value.accessToken);
    if (isSuccess(orderList)) {
      toast.success("Order List Fetch Successfully");
      dispatch(getAllOrder(orderList.value));
      dispatch(closeLoading());
    } else {
      toast.error("Order List Fetch Failed");
      dispatch(closeLoading());
    }
  };

  const sendOrderPDF = async (order: OrderDetails) => {
    dispatch(setLoading());
    const orderPDF = await sendOrderEmailAPI(
      order._id ?? "",
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

  return (
    <div>
      <h3>Invoice</h3>
      {/* take _orderState.values and map it, display the orderDate, orderedFor.customerName and a view link */}
      {_orderState.value.map((order) => {
        return (
          <div key={order._id}>
            <p>{new Date(order.orderDate).toLocaleDateString()}</p>
            <p>{order.orderedFor.customerName}</p>
            <Button severity="info" onClick={() => sendOrderPDF(order)}>
              View Order
            </Button>
          </div>
        );
      })}
    </div>
  );
}
