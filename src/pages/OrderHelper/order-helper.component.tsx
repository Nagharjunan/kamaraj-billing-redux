import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import OrderListComponent from "../../components/order-list/order-list.component";
import { userData } from "../../features/Auth/AuthSlice";
import { OrderState } from "../../features/order/orderSlice";
import { GlobalService } from "../../features/global.service";
import {
  CustomerDetails,
  OrderDetails,
  ProductDetails,
} from "../../assets/interface";
import { Dialog } from "primereact/dialog";
import { ReviewOrderComponent } from "../../components/review-order/review-order-component";
import ProductTableComponent from "../../components/product-table/product-table-component";
import ProductOrderList from "../../components/product-order-list/product-order-list.component";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { isSuccess } from "../../assets/config";
import { setLoading, closeLoading } from "../../features/Loader/loaderSlice";
import {
  approveOrderAPI,
  deleteOrderAPI,
  updateOrderAPI,
} from "../../features/order/orderAPI";

function OrderHelperComponent(props: { type: string }) {
  const _orderState = useAppSelector(OrderState);
  const _authState = useAppSelector(userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [productDialogVisible, setProductDialogVisible] = useState(false);

  const [currentOrder, setCurrentOrder] = useState({} as OrderDetails);
  const [originalOrder, setOriginalOrder] = useState({} as OrderDetails);
  const [customerName, setCustomerName] = useState("");

  const fetchMyOrders = GlobalService().fetchMyOrders;
  const sortOrderList = GlobalService().sortOrderList;
  const fetchPendingOrders = GlobalService().fetchPendingOrders;

  useEffect(() => {
    if (_authState.value.isLoggedIn) {
      fetchData();
    } else {
      navigate("/");
    }
  }, []);

  function fetchData() {
    if (props.type.toLowerCase().includes("pending")) {
      fetchPendingOrders();
    } else {
      fetchMyOrders();
    }
  }

  async function submitProductforOrder(selectedProduct: ProductDetails) {
    const isDuplicateProduct = currentOrder.orderList?.filter(
      (value: ProductDetails) => {
        return value.productCode === selectedProduct.productCode;
      }
    );
    if (isDuplicateProduct?.length) {
      toast.info("Product Already Exists, try deleting and add the product");
    } else {
      const sortedList = await sortOrderList([
        ...currentOrder.orderList,
        selectedProduct,
      ]);
      const updatedCurrentOrder = {
        ...currentOrder,
        orderList: [...sortedList],
      };
      setCurrentOrder(updatedCurrentOrder);
    }
  }

  function deleteProductforOrder(selectedProductCode: string) {
    const indexToDelete = currentOrder.orderList?.findIndex(
      (value: ProductDetails, index: number) => {
        return value.productCode === selectedProductCode;
      }
    );
    const _orderList = [...currentOrder.orderList];
    _orderList.splice(indexToDelete, 1);
    const updatedCurrentOrder = {
      ...currentOrder,
      orderList: _orderList,
    };
    setCurrentOrder(updatedCurrentOrder);
  }

  const editOrder = async (currOrder: OrderDetails) => {
    setProductDialogVisible(true);
    setCurrentOrder(currOrder);
    setOriginalOrder(currOrder);
    setCustomerName(currOrder.orderedFor.customerName);
  };

  const viewOrder = async (currOrder: OrderDetails) => {
    setViewDialogVisible(true);
    setCurrentOrder(currOrder);
    setCustomerName(currOrder.orderedFor.customerName);
  };

  const updateOrderConfirm = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: updateOrder,
      reject: () => {
        toast.info("Order Not Updated");
      },
    });
  };

  async function updateOrder() {
    console.log(currentOrder);
    if (JSON.stringify(originalOrder) !== JSON.stringify(currentOrder)) {
      // need to write update Order API
      dispatch(setLoading());
      const updateOrder = await updateOrderAPI(
        currentOrder,
        _authState.value.accessToken
      );
      if (isSuccess(updateOrder)) {
        toast.success("Order Updated");
        fetchData();
        dispatch(closeLoading());
        setProductDialogVisible(false);
      } else {
        toast.error("Order Update Failed, try again later");
        dispatch(closeLoading());
      }
    } else {
      toast.warning("There are no changes to update order");
    }
  }

  const deleteOrderConfirm = (order: OrderDetails) => {
    console.log(order);
    confirmDialog({
      message:
        "Are you sure you want to delete " +
        order.orderedFor.customerName +
        " bill, bill no " +
        order.orderId +
        "?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        deleteOrder(order);
      },
      reject: () => {
        toast.info("Order Not Deleted");
      },
    });
  };

  async function deleteOrder(currOrder: OrderDetails) {
    dispatch(setLoading());
    const deleteOrder = await deleteOrderAPI(
      currOrder._id || "",
      _authState.value.accessToken
    );
    if (isSuccess(deleteOrder)) {
      toast.success("Order Deleted");
      fetchData();
      dispatch(closeLoading());
      setProductDialogVisible(false);
    } else {
      toast.error("Order Delete Failed, try again later");
      dispatch(closeLoading());
    }
  }

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
      fetchData();
    } else {
      toast.error("Approval Failed, try again later");
      dispatch(closeLoading());
    }
  };

  return (
    <>
      <OrderListComponent
        type={props.type}
        orders={_orderState.value}
        approveOrder={approveOrder}
        editOrder={editOrder}
        viewOrder={viewOrder}
        deleteOrder={deleteOrderConfirm}
      ></OrderListComponent>
      <ConfirmDialog />
      <Dialog
        visible={viewDialogVisible}
        onHide={() => setViewDialogVisible(false)}
        style={{ width: "80vw" }}
        header={customerName}
      >
        <ReviewOrderComponent
          productCart={currentOrder.orderList ?? []}
          customer={currentOrder.orderedFor ?? ({} as CustomerDetails)}
          isOrder={true}
        ></ReviewOrderComponent>
      </Dialog>
      <Dialog
        visible={productDialogVisible}
        onHide={() => setProductDialogVisible(false)}
        style={{ width: "80vw" }}
        header={customerName}
      >
        <>
          <ProductTableComponent
            method="edit"
            submitProduct={submitProductforOrder}
            isOrder={true}
          ></ProductTableComponent>
          {/* if productCart isn't empty display the product name in a list */}
          {currentOrder.orderList?.length && (
            <ProductOrderList
              products={currentOrder.orderList}
              deleteProductforOrder={deleteProductforOrder}
            />
          )}
          <div className="flex justify-content-center mt-4">
            <Button
              label="Update Order"
              className="p-button-success"
              disabled={!currentOrder.orderList?.length}
              onClick={updateOrderConfirm}
            />
          </div>
        </>
      </Dialog>
    </>
  );
}

export default OrderHelperComponent;
