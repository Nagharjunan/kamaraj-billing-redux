import { Card } from "primereact/card";
import "./Product.css";
import ProductTableComponent from "../../components/product-table/product-table-component";
import { ProductDetails } from "../../assets/interface";
import { useEffect } from "react";
import { userData } from "../../features/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../features/product/productSlice";
import { closeLoading, setLoading } from "../../features/Loader/loaderSlice";
import {
  createProductAPI,
  deleteProductAPI,
  getAllProductAPI,
  updateProductAPI,
} from "../../features/product/productAPI";
import { isSuccess } from "../../assets/config";
import { toast } from "react-toastify";

function ProductComponent(props: { method: string }) {
  const _authState = useAppSelector(userData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (_authState.value.isLoggedIn) {
      fetchData();
    } else {
      navigate("/");
    }
  }, []);

  async function fetchData() {
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

  function submitProduct(selectedProduct: ProductDetails, isOrder: Boolean) {
    if (!isOrder) {
      if (props.method === "create") {
        _createProduct(selectedProduct);
      } else if (props.method === "update") {
        _updateProduct(selectedProduct);
      } else if (props.method === "delete") {
        _deleteProduct(selectedProduct);
      }
      console.log(selectedProduct);
    }
  }

  async function _createProduct(selectedProduct: ProductDetails) {
    dispatch(setLoading());
    const product = await createProductAPI(
      selectedProduct,
      _authState.value.accessToken
    );
    if (isSuccess(product)) {
      toast.success(product.message);
      fetchData();
    } else {
      toast.error(product.message);
      dispatch(closeLoading());
    }
  }

  async function _updateProduct(selectedCustomer: ProductDetails) {
    dispatch(setLoading());
    const product = await updateProductAPI(
      selectedCustomer,
      _authState.value.accessToken
    );
    if (isSuccess(product)) {
      toast.success(product.message);
      fetchData();
    } else {
      toast.error(product.message);
      dispatch(closeLoading());
    }
  }
  async function _deleteProduct(selectedProduct: ProductDetails) {
    dispatch(setLoading());
    const product = await deleteProductAPI(
      selectedProduct._id ?? "",
      _authState.value.accessToken
    );
    if (isSuccess(product)) {
      toast.success(product.message);
      fetchData();
    } else {
      toast.error(product.message);
      dispatch(closeLoading());
    }
  }

  return (
    <>
      <Card>
        <h2 className="text-capitalize">{props.method} Product</h2>
        <ProductTableComponent
          method={props.method}
          submitProduct={submitProduct}
          isOrder={false}
        ></ProductTableComponent>
      </Card>
    </>
  );
}

export default ProductComponent;
