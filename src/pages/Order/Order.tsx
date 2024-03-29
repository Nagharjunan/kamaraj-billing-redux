import { Card } from "primereact/card";
import ProductTableComponent from "../../components/product-table/product-table-component";
import {
  CustomerDetails,
  OrderDetails,
  ProductDetails,
} from "../../assets/interface";
import { useEffect, useState } from "react";
import { Steps, StepsSelectEvent } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import CustomerTableComponent from "../../components/customer-table/customer-table-component";
import {
  getAllProducts,
  productState,
} from "../../features/product/productSlice";
import {
  customerState,
  getAllCustomer,
} from "../../features/Customer/customerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeLoading, setLoading } from "../../features/Loader/loaderSlice";
import { getAllCustomerAPI } from "../../features/Customer/customerAPI";
import { userData } from "../../features/Auth/AuthSlice";
import { getAllProductAPI } from "../../features/product/productAPI";
import { isSuccess } from "../../assets/config";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import ProductOrderList from "../../components/product-order-list/product-order-list.component";
import { ReviewOrderComponent } from "../../components/review-order/review-order-component";
import { Dropdown } from "primereact/dropdown";
import { createOrderAPI } from "../../features/order/orderAPI";
import { resetStore } from "../../app/resetAction";
import { GlobalService } from "../../features/global.service";

function OrderComponent(props: { method: string }) {
  const [productCart, setProductCart] = useState<ProductDetails[]>();
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const globalService = GlobalService();

  const _customerState = useAppSelector(customerState);
  const _productState = useAppSelector(productState);
  const _userState = useAppSelector(userData);

  const paymentOptions = [
    { label: "Cash", value: "cash" },
    { label: "Credit", value: "credit" },
  ];

  const [paymentMode, setPaymentMode] = useState<string>("cash");

  useEffect(() => {
    if (_userState.value.id) {
      if (!_customerState.value.length) {
        globalService.fetchCustomerData();
      }
      if (!_productState.value.length) {
        globalService.fetchProductData();
      }
    } else {
      dispatch(resetStore());
      navigate("/");
    }
  }, []);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const items: MenuItem[] = [
    {
      label: "Customer Details",
    },
    {
      label: "Order Details",
    },
    {
      label: "Confirmation",
    },
  ];

  function submitProductforOrder(selectedProduct: ProductDetails) {
    const isDuplicateProduct = productCart?.filter((value: ProductDetails) => {
      return value.productCode === selectedProduct.productCode;
    });
    console.log(isDuplicateProduct, selectedProduct);
    if (isDuplicateProduct?.length) {
      toast.info("Product Already Exists, try deleting and add the product");
    } else {
      // update productCart state with selectedProduct
      setProductCart([...(productCart ?? []), selectedProduct]);
      console.log(productCart);
    }
  }

  function deleteProductforOrder(selectedProductCode: string) {
    const indexToDelete = productCart?.findIndex(
      (value: ProductDetails, index: number) => {
        return value.productCode === selectedProductCode;
      }
    );
    productCart?.splice(indexToDelete || 0, 1);
    setProductCart([...(productCart ?? [])]);
  }

  function submitCustomer(selectedCustomer: any) {
    console.log(selectedCustomer);
    setSelectedCustomer(selectedCustomer);
    toast.success("Customer Added Successfully");
    goForward();
  }

  function submitProduct() {
    toast.success("Products Added Successfully");
    goForward();
  }

  function showState(e: number) {
    setActiveIndex(e);
  }

  function goForward() {
    showState(activeIndex + 1);
  }

  function goBack() {
    showState(activeIndex - 1);
  }

  async function createNewOrder() {
    const sortedOrderCart = await globalService.sortOrderList(
      productCart || []
    );
    const order: OrderDetails = {
      orderDate: new Date().toString(),
      orderedBy: _userState.value.id,
      modifiedBy: {
        modifiedDate: "",
        modifiedUser: "",
      },
      orderedFor: selectedCustomer ?? ({} as CustomerDetails),
      orderList: sortedOrderCart,
      paymentMode: paymentMode,
      orderStatus: "pending",
      approved: {
        isApproved: false,
        approvedBy: "",
        approvalDate: "",
      },
      paymentDetails: {
        paymentMethod: paymentMode,
        paymentDate: "",
        isPaymentDone: false,
      },
    };
    console.log(order);
    dispatch(setLoading());
    const orderResponse = await createOrderAPI(
      order,
      _userState.value.accessToken
    );
    if (isSuccess(orderResponse)) {
      navigate("/home");
      toast.success(orderResponse.message);
      dispatch(closeLoading());
    } else {
      window.scrollTo(0, 0);
      toast.error(orderResponse.message);
      dispatch(closeLoading());
    }
  }

  return (
    <>
      <Card>
        <h2 className="text-capitalize">{props.method} Order</h2>
        <Steps
          model={items}
          className="mb-4"
          activeIndex={activeIndex}
          readOnly={false}
          onSelect={(e: StepsSelectEvent) => {
            showState(e.index);
          }}
        />
        {activeIndex === 0 && (
          <CustomerTableComponent
            method="edit"
            submitCustomer={submitCustomer}
          />
        )}
        {activeIndex === 1 && (
          <>
            <ProductTableComponent
              method="edit"
              submitProduct={submitProductforOrder}
              isOrder={true}
            ></ProductTableComponent>
            {/* if productCart isn't empty display the product name in a list */}
            {productCart?.length && (
              <ProductOrderList
                products={productCart}
                deleteProductforOrder={deleteProductforOrder}
              />
            )}
            <div className="flex justify-content-between mt-4">
              <Button
                label="Back"
                className="p-button-info"
                onClick={() => {
                  goBack();
                }}
              />
              <Button
                label="Submit"
                className="p-button-success"
                disabled={!productCart?.length}
                onClick={submitProduct}
              />
            </div>
          </>
        )}
        {activeIndex === 2 && (
          <>
            <ReviewOrderComponent
              productCart={productCart ?? []}
              customer={selectedCustomer ?? ({} as CustomerDetails)}
              isOrder={true}
            ></ReviewOrderComponent>
            <div className="flex justify-content-between">
              <span>Mode of Payment</span>
              <Dropdown
                options={paymentOptions}
                placeholder="Payment Mode"
                value={paymentMode}
                onChange={(e) => {
                  setPaymentMode(e.value);
                }}
              />
            </div>
            <div className="flex justify-content-between mt-5">
              <Button
                severity="info"
                onClick={() => {
                  goBack();
                }}
              >
                Back
              </Button>
              <Button severity="success" onClick={createNewOrder}>
                Confirm Order
              </Button>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
export default OrderComponent;
