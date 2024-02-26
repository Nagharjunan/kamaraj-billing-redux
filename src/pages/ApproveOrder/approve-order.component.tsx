import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userData } from "../../features/Auth/AuthSlice";
import { OrderState, getAllOrder } from "../../features/order/orderSlice";
import { toast } from "react-toastify";
import { isSuccess } from "../../assets/config";
import { setLoading, closeLoading } from "../../features/Loader/loaderSlice";
import {
  approveOrderAPI,
  getPendingOrdersAPI,
} from "../../features/order/orderAPI";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

function ApproveOrderComponent() {
  const dispatch = useAppDispatch();
  const _orderState = useAppSelector(OrderState);
  const _authState = useAppSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (_authState.value.isLoggedIn) {
      fetchOrders();
    } else {
      navigate("/");
    }
  }, []);

  const fetchOrders = async () => {
    dispatch(setLoading());
    const orderList = await getPendingOrdersAPI(_authState.value.accessToken);
    if (isSuccess(orderList)) {
      toast.success("Approval List Fetch Successfully");
      dispatch(getAllOrder(orderList.value));
      dispatch(closeLoading());
    } else {
      toast.error("Approval List Fetch Failed");
      dispatch(closeLoading());
      navigate("/home");
    }
  };

  const approveOrder = async (orderId: string) => {
    dispatch(setLoading());
    const approveOrder = await approveOrderAPI(
      orderId,
      _authState.value.accessToken,
      _authState.value.email
    );
    if (isSuccess(approveOrder)) {
      toast.success("Order Approved");
      dispatch(closeLoading());
      fetchOrders();
    } else {
      toast.error("Approval Failed, try again later");
      dispatch(closeLoading());
      navigate("/home");
    }
  };

  return (
    <div>
      <h3>Pending Orders</h3>
      {_orderState.value.map((order) => (
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
            <Button
              label="Approve"
              className="p-button-success"
              onClick={() => {
                approveOrder(order._id ?? "");
              }}
            />
            {/* <Button
              label="Delete"
              onClick={() => {
                deleteOrder(product.productCode);
              }}
              className="p-button-danger ml-2"
            /> */}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ApproveOrderComponent;
