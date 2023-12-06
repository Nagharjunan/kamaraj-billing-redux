import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { ProductDetails } from "../../assets/interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { userData } from "../../features/Auth/AuthSlice";
import {
  productState,
  getAllProducts,
  setLoading,
} from "../../features/product/productSlice";
import { getAllProduct } from "../../features/product/productAPI";

function ProductTableComponent(props: { method: string; submitProduct: any }) {
  const _productState = useAppSelector(productState);
  const _authState = useAppSelector(userData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (_authState.value.isLoggedIn) {
    // } else {
    //   navigate("/");
    // }
    fetchData();
  }, []);

  async function fetchData() {
    if (_productState.value.length === 0) {
      dispatch(setLoading());
      const productList = await getAllProduct();
      try {
        dispatch(getAllProducts(productList));
      } catch (error) {
        window.alert("API Failed");
      }
    }
  }
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails>({
    productName: "",
    productCode: "",
    HSN_Code: "",
    purchaseRate: "",
    salesRate: "",
    GST: "",
    CGST: "",
    SGST: "",
    IGST: "",
    unit: "",
  });
  const [filteredProducts, setFilteredProducts] = useState<ProductDetails[]>();

  const search = (event: AutoCompleteCompleteEvent) => {
    setTimeout(() => {
      let _filteredProducts;

      if (!event.query.trim().length) {
        _filteredProducts = [..._productState.value];
      } else {
        _filteredProducts = _productState.value.filter((product) => {
          return product.productName
            .toLowerCase()
            .includes(event.query.toLowerCase());
        });
      }
      setFilteredProducts(_filteredProducts);
    }, 250);
  };

  function onProductSelect(event: AutoCompleteChangeEvent) {
    if (typeof event.value === "string") {
      setSelectedProduct((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else {
      Object.keys(event.value).forEach((key: any) => {
        setSelectedProduct((prevState) => ({
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

    setSelectedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <>
      <div className="form-group">
        {props.method === "create" && (
          <InputText
            placeholder="Product Name"
            name="productName"
            value={selectedProduct.productName}
            onChange={onTextChange}
          ></InputText>
        )}

        {props.method === "edit" && (
          <AutoComplete
            field="productName"
            placeholder="Product Name"
            className="form-input"
            name="productName"
            value={selectedProduct}
            suggestions={filteredProducts}
            completeMethod={search}
            onChange={(e) => onProductSelect(e)}
          />
        )}

        <InputText
          placeholder="Product Code"
          onChange={onTextChange}
          name="productCode"
          value={selectedProduct.productCode}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="HSN Code"
          onChange={onTextChange}
          name="HSN_Code"
          value={selectedProduct.HSN_Code}
        ></InputText>
        <InputText
          placeholder="Unit"
          onChange={onTextChange}
          name="unit"
          value={selectedProduct.unit}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="Purchase Rate"
          onChange={onTextChange}
          name="purchaseRate"
          value={selectedProduct.purchaseRate}
        ></InputText>
        <InputText
          placeholder="Sales Rate"
          onChange={onTextChange}
          name="salesRate"
          value={selectedProduct.salesRate}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="GST"
          onChange={onTextChange}
          name="GST"
          value={selectedProduct.GST}
        ></InputText>
        <InputText
          placeholder="IGST"
          onChange={onTextChange}
          name="IGST"
          value={selectedProduct.IGST}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="SGST"
          onChange={onTextChange}
          name="SGST"
          value={selectedProduct.SGST}
        ></InputText>
        <InputText
          placeholder="CGST"
          onChange={onTextChange}
          name="CGST"
          value={selectedProduct.CGST}
        ></InputText>
      </div>
      <button onClick={() => props.submitProduct(selectedProduct)}>
        CLick me
      </button>
    </>
  );
}

export default ProductTableComponent;
