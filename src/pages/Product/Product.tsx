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
import { resetStore } from "../../app/resetAction";
import { GlobalService } from "../../features/global.service";

function ProductComponent(props: { method: string }) {
  const _authState = useAppSelector(userData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchProductData = GlobalService().fetchProductData;

  useEffect(() => {
    if (_authState.value.isLoggedIn) {
      fetchProductData();
    } else {
      dispatch(resetStore());
      navigate("/");
    }
  }, []);

  function submitProduct(selectedProduct: ProductDetails, isOrder: Boolean) {
    if (!isOrder) {
      if (props.method === "create") {
        _createProduct(selectedProduct);
      } else if (props.method === "edit") {
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
      fetchProductData();
    } else {
      toast.error(product.message);
      dispatch(closeLoading());
    }
  }

  async function _updateProduct(selectedProduct: ProductDetails) {
    console.log(selectedProduct);
    dispatch(setLoading());
    const product = await updateProductAPI(
      selectedProduct,
      _authState.value.accessToken
    );
    if (isSuccess(product)) {
      toast.success(product.message);
      fetchProductData();
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
      fetchProductData();
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
