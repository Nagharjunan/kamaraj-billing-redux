import { Card } from "primereact/card";
import CustomerTableComponent from "../../components/customer-table/customer-table-component";
import { CustomerDetails } from "../../assets/interface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userData } from "../../features/Auth/AuthSlice";
import {
  createCustomerAPI,
  getAllCustomerAPI,
} from "../../features/Customer/customerAPI";
import { closeLoading, setLoading } from "../../features/Loader/loaderSlice";
import {
  customerState,
  getAllCustomer,
} from "../../features/Customer/customerSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isSuccess } from "../../assets/config";

function CustomerComponent(props: { method: string }) {
  const _userState = useAppSelector(userData);
  const _customerState = useAppSelector(customerState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (_userState.value.isLoggedIn) {
      fetchData();
    } else {
      navigate("/");
    }
  }, []);

  async function fetchData() {
    dispatch(setLoading());
    const customerList = await getAllCustomerAPI(_userState.value.accessToken);
    if (isSuccess(customerList)) {
      toast.success("Customer List Fetch Successfully");
      dispatch(getAllCustomer(customerList.value));
      dispatch(closeLoading());
    } else {
      toast.error("Customer List Fetch Failed");
      dispatch(closeLoading());
    }
  }

  function submitCustomer(selectedCustomer: CustomerDetails) {
    if (props.method === "create") {
      _createCustomer(selectedCustomer);
    } else {
      _updateCustomer(selectedCustomer);
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
      fetchData();
    } else {
      toast.error(customer.message);
      dispatch(closeLoading());
    }
  }

  async function _updateCustomer(selectedCustomer: CustomerDetails) {}
  async function _deleteCustomer(selectedCustomer: CustomerDetails) {}

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