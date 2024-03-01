import { toast } from "react-toastify";
import { isSuccess } from "../assets/config";
import { setLoading, closeLoading } from "./Loader/loaderSlice";
import {
  approveOrderAPI,
  getMyOrdersAPI,
  getOrdersAPI,
  getPendingOrdersAPI,
} from "./order/orderAPI";
import { OrderState, getAllOrder } from "./order/orderSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userData } from "./Auth/AuthSlice";
import { getAllCustomerAPI } from "./Customer/customerAPI";
import { getAllCustomer } from "./Customer/customerSlice";
import { getAllProductAPI } from "./product/productAPI";
import { getAllProducts } from "./product/productSlice";

export function GlobalService() {
  const dispatch = useAppDispatch();
  const _orderState = useAppSelector(OrderState);
  const _authState = useAppSelector(userData);
  const navigate = useNavigate();

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

  const fetchMyOrders = async () => {
    dispatch(setLoading());
    const orderList = await getMyOrdersAPI(
      _authState.value.accessToken,
      _authState.value.id
    );
    if (isSuccess(orderList)) {
      toast.success("My Orders Fetch Successfully");
      dispatch(getAllOrder(orderList.value));
      dispatch(closeLoading());
    } else {
      toast.error("My Orders Fetch Failed");
      dispatch(closeLoading());
      navigate("/home");
    }
  };

  const fetchPendingOrders = async () => {
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

  async function fetchCustomerData() {
    dispatch(setLoading());
    const customerList = await getAllCustomerAPI(_authState.value.accessToken);
    if (isSuccess(customerList)) {
      toast.success("Customer List Fetch Successfully");
      dispatch(getAllCustomer(customerList.value));
      dispatch(closeLoading());
    } else {
      toast.error("Customer List Fetch Failed");
      dispatch(closeLoading());
    }
  }

  async function fetchProductData() {
    dispatch(setLoading());
    const productList = await getAllProductAPI(_authState.value.accessToken);
    if (isSuccess(productList)) {
      toast.success("Product List Fetch Successfully");
      dispatch(getAllProducts(productList.value));
      dispatch(closeLoading());
    } else {
      toast.error("Product List Fetch Failed");
      dispatch(closeLoading());
    }
  }

  return {
    fetchMyOrders,
    fetchPendingOrders,
    fetchCustomerData,
    fetchOrders,
    fetchProductData,
  };
}
