export interface ProductDetails {
  productCode: string;
  productName: string;
  HSN_Code: string;
  unit: string;
  purchaseRate?: string;
  GST: string;
  salesRate: string;
  CGST: string;
  SGST: string;
  IGST: string;
  reOrderLevel?: string;
  _id?: string;
}
export interface CustomerDetails {
  customerName: string;
  customerBillAddline1: string;
  customerBillAddline2: string;
  customerBillAddline3: string;
  customerShipAddline1: string;
  customerShipAddline2: string;
  customerShipAddline3: string;
  phoneNumber: string;
  altPhoneNumber: string;
  gstNumber: string;
  state: string;
  stateCode: string;
  _id?: string;
}

export interface userDetails {
  isLoggedIn: boolean;
  username: string;
  id: string;
  role: string;
  email: string;
  accessToken: string;
}
