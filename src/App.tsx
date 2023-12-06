import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductComponent from "./pages/Product/Product";
import LoginComponent from "./pages/Login/Login";
import { useAppSelector } from "./app/hooks";
import { userData } from "./features/Auth/AuthSlice";
import { productState } from "./features/product/productSlice";
import LoadingComponent from "./components/Loading/loading";
import OrderComponent from "./pages/Order/Order";
import HomeComponent from "./pages/Home/home.component";
import CustomerComponent from "./pages/Customer/customer.component";
import { customerState } from "./features/Customer/customerSlice";

function App() {
  const _userState = useAppSelector(userData);
  const _productState = useAppSelector(productState);
  const _customerState = useAppSelector(customerState);
  useEffect(() => {});

  return (
    <>
      {(_productState.status === "loading" ||
        _userState.status === "loading" ||
        _customerState.status === "loading") && (
        <LoadingComponent></LoadingComponent>
      )}
      <div className="App">
        <Navbar></Navbar>
        <div className="routes">
          <Routes>
            <Route path="/" element={<LoginComponent></LoginComponent>}></Route>
            <Route
              path="/home"
              element={<HomeComponent></HomeComponent>}
            ></Route>
            <Route
              path="/create-order"
              element={<OrderComponent method="create"></OrderComponent>}
            ></Route>
            <Route
              path="/edit-order"
              element={<OrderComponent method="edit"></OrderComponent>}
            ></Route>
            <Route
              path="/create-customer"
              element={<CustomerComponent method="create"></CustomerComponent>}
            ></Route>
            <Route
              path="/edit-customer"
              element={<CustomerComponent method="edit"></CustomerComponent>}
            ></Route>
            <Route
              path="/create-product"
              element={<ProductComponent method="create"></ProductComponent>}
            ></Route>
            <Route
              path="/edit-product"
              element={<ProductComponent method="edit"></ProductComponent>}
            ></Route>
            <Route
              path="/login"
              element={<LoginComponent></LoginComponent>}
            ></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
