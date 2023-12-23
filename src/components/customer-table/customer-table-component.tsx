import {
  AutoCompleteCompleteEvent,
  AutoCompleteChangeEvent,
  AutoComplete,
} from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { CustomerDetails } from "../../assets/interface";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { customerState } from "../../features/Customer/customerSlice";
import { useNavigate } from "react-router-dom";
import { closeLoading, setLoading } from "../../features/Loader/loaderSlice";

function CustomerTableComponent(props: {
  method: string;
  submitCustomer: any;
}) {
  const _customerState = useAppSelector(customerState);

  const dispatch = useAppDispatch();

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails>({
    customerName: "",
    customerBillAddline1: "",
    customerBillAddline2: "",
    customerBillAddline3: "",
    customerShipAddline1: "",
    customerShipAddline2: "",
    customerShipAddline3: "",
    phoneNumber: "",
    altPhoneNumber: "",
    gstNumber: "",
    state: "",
    stateCode: "",
  });
  const [filteredCustomers, setFilteredCustomers] =
    useState<CustomerDetails[]>();

  const search = (event: AutoCompleteCompleteEvent) => {
    setTimeout(() => {
      let _filteredCustomers;

      if (!event.query.trim().length) {
        _filteredCustomers = [..._customerState.value];
      } else {
        _filteredCustomers = _customerState.value.filter((customer: any) => {
          return customer.customerName
            .toLowerCase()
            .includes(event.query.toLowerCase());
        });
      }
      setFilteredCustomers(_filteredCustomers);
    }, 250);
  };

  function onCustomerSelect(event: AutoCompleteChangeEvent) {
    if (typeof event.value === "string") {
      setSelectedCustomer((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else {
      Object.keys(event.value).forEach((key: any) => {
        setSelectedCustomer((prevState) => ({
          ...prevState,
          [key]: event.value[key],
        }));
      });
    }
  }

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value, event.target.name);

    let name = event.target.name;
    let value = event.target.value;

    setSelectedCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <>
      <div className="form-group">
        {props.method === "create" && (
          <InputText
            placeholder="Customer Name"
            name="customerName"
            value={selectedCustomer.customerName}
            onChange={onTextChange}
          ></InputText>
        )}

        {props.method === "edit" && (
          <AutoComplete
            field="customerName"
            placeholder="Customer Name"
            className="form-input"
            name="customerName"
            value={selectedCustomer}
            suggestions={filteredCustomers}
            completeMethod={search}
            onChange={(e) => onCustomerSelect(e)}
          />
        )}

        <InputText
          placeholder="Customer Bill Address Line 1"
          onChange={onTextChange}
          name="customerBillAddline1"
          value={selectedCustomer.customerBillAddline1}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="Customer Bill Address Line 2"
          onChange={onTextChange}
          name="customerBillAddline2"
          value={selectedCustomer.customerBillAddline2}
        ></InputText>
        <InputText
          placeholder="Customer Bill Address Line 3"
          onChange={onTextChange}
          name="customerBillAddline3"
          value={selectedCustomer.customerBillAddline3}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="Phone Number"
          onChange={onTextChange}
          name="phoneNumber"
          value={selectedCustomer.phoneNumber}
        ></InputText>
        <InputText
          placeholder="GSTIN/UIN"
          onChange={onTextChange}
          name="gstNumber"
          value={selectedCustomer.gstNumber}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="State"
          onChange={onTextChange}
          name="state"
          value={selectedCustomer.state}
        ></InputText>
        <InputText
          placeholder="State Code"
          onChange={onTextChange}
          name="stateCode"
          value={selectedCustomer.stateCode}
        ></InputText>
      </div>

      <div className="form-group">
        <InputText
          placeholder="Customer Ship Address Line 1"
          onChange={onTextChange}
          name="customerShipAddline1"
          value={selectedCustomer.customerShipAddline1}
        ></InputText>
        <InputText
          placeholder="Customer Ship Address Line 2"
          onChange={onTextChange}
          name="customerShipAddline2"
          value={selectedCustomer.customerShipAddline2}
        ></InputText>
        <InputText
          placeholder="Customer Ship Address Line 3"
          onChange={onTextChange}
          name="customerShipAddline3"
          value={selectedCustomer.customerShipAddline3}
        ></InputText>
      </div>
      <button onClick={() => props.submitCustomer(selectedCustomer)}>
        CLick me
      </button>
    </>
  );
}

export default CustomerTableComponent;
