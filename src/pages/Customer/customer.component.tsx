import { Card } from "primereact/card";
import CustomerTableComponent from "../../components/customer-table/customer-table-component";
import { CustomerDetails } from "../../assets/interface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userData } from "../../features/Auth/AuthSlice";
import {
  createCustomerAPI,
  deleteCustomerAPI,
  getAllCustomerAPI,
  updateCustomerAPI,
} from "../../features/Customer/customerAPI";
import { closeLoading, setLoading } from "../../features/Loader/loaderSlice";
import { getAllCustomer } from "../../features/Customer/customerSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isSuccess } from "../../assets/config";
import { resetStore } from "../../app/resetAction";
import { GlobalService } from "../../features/global.service";

function CustomerComponent(props: { method: string }) {
  const _userState = useAppSelector(userData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchCustomerData = GlobalService().fetchCustomerData;

  useEffect(() => {
    if (_userState.value.isLoggedIn) {
      fetchCustomerData();
    } else {
      dispatch(resetStore());
      navigate("/");
    }
  }, []);

  function submitCustomer(selectedCustomer: CustomerDetails) {
    if (props.method === "create") {
      _createCustomer(selectedCustomer);
    } else if (props.method === "update") {
      _updateCustomer(selectedCustomer);
    } else if (props.method === "delete") {
      _deleteCustomer(selectedCustomer);
    }
    console.log(selectedCustomer);
  }

  async function _createCustomer(selectedCustomer: CustomerDetails) {
    dispatch(setLoading());

    const customer = await createCustomerAPI(
      selectedCustomer,
      _userState.value.accessToken
    );
    if (isSuccess(customer)) {
      toast.success(customer.message);
      fetchCustomerData();
    } else {
      toast.error(customer.message);
      dispatch(closeLoading());
    }
  }

  async function _updateCustomer(selectedCustomer: CustomerDetails) {
    dispatch(setLoading());
    const customer = await updateCustomerAPI(
      selectedCustomer,
      _userState.value.accessToken
    );
    if (isSuccess(customer)) {
      toast.success(customer.message);
      fetchCustomerData();
    } else {
      toast.error(customer.message);
      dispatch(closeLoading());
    }
  }
  async function _deleteCustomer(selectedCustomer: CustomerDetails) {
    dispatch(setLoading());
    const customer = await deleteCustomerAPI(
      selectedCustomer._id ?? "",
      _userState.value.accessToken
    );
    if (isSuccess(customer)) {
      toast.success(customer.message);
      fetchCustomerData();
    } else {
      toast.error(customer.message);
      dispatch(closeLoading());
    }
  }

  return (
    <>
      <Card>
        <h2 className="text-capitalize">{props.method} Customer</h2>
        <CustomerTableComponent
          method={props.method}
          submitCustomer={submitCustomer}
        ></CustomerTableComponent>
      </Card>
    </>
  );
}

export default CustomerComponent;
