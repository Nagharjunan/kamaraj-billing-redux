import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { ProductDetails } from "../../assets/interface";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { productState } from "../../features/product/productSlice";
import { Button } from "primereact/button";

function ProductTableComponent(props: {
  method: string;
  submitProduct: any;
  isOrder: boolean;
}) {
  const initialFormState = {
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
  };

  const initialFormError = {
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
    qty: "",
  };

  const _productState = useAppSelector(productState);

  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetails>(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormError);

  const [filteredProducts, setFilteredProducts] = useState<ProductDetails[]>();

  const search = (event: AutoCompleteCompleteEvent) => {
    setTimeout(() => {
      let _filteredProducts;

      if (!event.query.trim().length) {
        _filteredProducts = [..._productState.value];
      } else {
        _filteredProducts = _productState.value.filter((product: any) => {
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

  function validateForm() {
    if (!selectedProduct.productName) {
      setFormErrors(initialFormError);
      return {
        validity: false,
        error: "Product Name is required",
        name: "productName",
      };
    }
    if (!selectedProduct.productCode) {
      setFormErrors(initialFormError);
      return {
        validity: false,
        error: "Product Code is required",
        name: "productCode",
      };
    }
    if (!selectedProduct.HSN_Code) {
      setFormErrors(initialFormError);
      return {
        validity: false,
        error: "HSN Code is required",
        name: "HSN_Code",
      };
    }
    // if (!selectedProduct.purchaseRate) {
    // setFormErrors(initialFormError);
    //   return {
    //     validity: false,
    //     error: "Purchase Rate is required",
    //     name: "purchaseRate",
    //   };
    // }
    if (!selectedProduct.salesRate) {
      setFormErrors(initialFormError);
      return {
        validity: false,
        error: "Sales Rate is required",
        name: "salesRate",
      };
    }
    if (!selectedProduct.GST) {
      setFormErrors(initialFormError);
      return { validity: false, error: "GST is required", name: "GST" };
    }
    if (!selectedProduct.CGST) {
      setFormErrors(initialFormError);
      return { validity: false, error: "CGST is required", name: "CGST" };
    }
    if (!selectedProduct.SGST) {
      setFormErrors(initialFormError);
      return { validity: false, error: "SGST is required", name: "SGST" };
    }
    if (!selectedProduct.IGST) {
      setFormErrors(initialFormError);
      return { validity: false, error: "IGST is required", name: "IGST" };
    }
    if (!selectedProduct.unit) {
      setFormErrors(initialFormError);
      return { validity: false, error: "Unit is required", name: "unit" };
    }
    if (props.isOrder && !selectedProduct.qty) {
      setFormErrors(initialFormError);
      return { validity: false, error: "Quantity is required", name: "qty" };
    }
    return { validity: true, name: "" };
  }

  function submitForm(e: any) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid.validity) {
      props.submitProduct(selectedProduct);
      setSelectedProduct(initialFormState);
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        [isValid.name]: isValid.error,
      }));
    }
  }

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setSelectedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <form>
      <div className="form-group">
        {props.method === "create" && (
          <InputText
            placeholder="Product Name"
            name="productName"
            value={selectedProduct.productName}
            className={formErrors.productName ? "p-invalid" : ""}
            onChange={onTextChange}
          ></InputText>
        )}

        {(props.method === "edit" || props.method === "delete") && (
          <AutoComplete
            field="productName"
            placeholder="Product Name"
            className="form-input"
            name="productName"
            value={selectedProduct}
            suggestions={filteredProducts}
            onKeyDown={(e) => {
              e.code === "Backspace" && setSelectedProduct(initialFormState);
            }}
            completeMethod={search}
            onChange={(e) => onProductSelect(e)}
          />
        )}

        {props.isOrder && (
          <InputText
            placeholder="Quantity"
            onChange={onTextChange}
            className={formErrors.qty ? "p-invalid" : ""}
            name="qty"
            value={selectedProduct.qty ? selectedProduct.qty.toString() : ""}
          ></InputText>
        )}

        <InputText
          placeholder="Product Code"
          onChange={onTextChange}
          className={formErrors.productCode ? "p-invalid" : ""}
          name="productCode"
          value={selectedProduct.productCode}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="HSN Code"
          onChange={onTextChange}
          className={formErrors.HSN_Code ? "p-invalid" : ""}
          name="HSN_Code"
          value={selectedProduct.HSN_Code}
        ></InputText>
        <InputText
          placeholder="Unit"
          onChange={onTextChange}
          className={formErrors.unit ? "p-invalid" : ""}
          name="unit"
          value={selectedProduct.unit}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="Purchase Rate"
          onChange={onTextChange}
          className={formErrors.purchaseRate ? "p-invalid" : ""}
          name="purchaseRate"
          value={selectedProduct.purchaseRate}
        ></InputText>
        <InputText
          placeholder="Sales Rate"
          onChange={onTextChange}
          className={formErrors.salesRate ? "p-invalid" : ""}
          name="salesRate"
          value={selectedProduct.salesRate}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="GST"
          onChange={onTextChange}
          name="GST"
          className={formErrors.GST ? "p-invalid" : ""}
          value={selectedProduct.GST}
        ></InputText>
        <InputText
          placeholder="IGST"
          onChange={onTextChange}
          name="IGST"
          className={formErrors.IGST ? "p-invalid" : ""}
          value={selectedProduct.IGST}
        ></InputText>
      </div>
      <div className="form-group">
        <InputText
          placeholder="SGST"
          className={formErrors.SGST ? "p-invalid" : ""}
          onChange={onTextChange}
          name="SGST"
          value={selectedProduct.SGST}
        ></InputText>
        <InputText
          placeholder="CGST"
          onChange={onTextChange}
          className={formErrors.CGST ? "p-invalid" : ""}
          name="CGST"
          value={selectedProduct.CGST}
        ></InputText>
      </div>
      <div className="flex justify-content-center">
        <Button
          label={props.isOrder ? "Add Product" : "Submit"}
          className="flex justify-content-center"
          onClick={(e) => submitForm(e)}
        ></Button>
      </div>
    </form>
  );
}

export default ProductTableComponent;
