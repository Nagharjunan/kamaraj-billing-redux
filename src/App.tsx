import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductComponent from "./pages/Product/Product";
import LoginComponent from "./pages/Login/Login";
import { useAppSelector } from "./app/hooks";
import LoadingComponent from "./components/Loading/loading";
import OrderComponent from "./pages/Order/Order";
import HomeComponent from "./pages/Home/home.component";
import CustomerComponent from "./pages/Customer/customer.component";
import { loaderState } from "./features/Loader/loaderSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InvoiceComponent } from "./pages/Invoice/Invoice";

function App() {
  const _loaderState = useAppSelector(loaderState);

  return (
    <>
      {_loaderState.status === "loading" && (
        <LoadingComponent></LoadingComponent>
      )}
      <div className="App">
        <Navbar></Navbar>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <ToastContainer />
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
              path="/view-invoice"
              element={<InvoiceComponent></InvoiceComponent>}
            ></Route>
            <Route
              path="/edit-order"
              element={<OrderComponent method="edit"></OrderComponent>}
            ></Route>
            <Route
              path="/delete-order"
              element={<OrderComponent method="delete"></OrderComponent>}
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
              path="/delete-customer"
              element={<CustomerComponent method="delete"></CustomerComponent>}
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
              path="/delete-product"
              element={<ProductComponent method="delete"></ProductComponent>}
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
