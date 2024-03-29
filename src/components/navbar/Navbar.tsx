import { Menubar } from "primereact/menubar";
import "./Navbar.css";

import { NavLink, useNavigate } from "react-router-dom";
import { removeAuthData, userData } from "../../features/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetStore } from "../../app/resetAction";

function Navbar() {
  const navigate = useNavigate();

  const _userState = useAppSelector(userData);
  const dispatch = useAppDispatch();

  const items = [
    {
      label: "Product",
      visible: _userState.value.isLoggedIn && _userState.value.role === "admin",
      items: [
        {
          label: "Create Product",
          data: "create-product",
          command: selectedItem,
        },
        {
          label: "Edit Product",
          data: "edit-product",
          command: selectedItem,
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
        {
          label: "Delete Product",
          data: "delete-product",
          command: selectedItem,
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
        {
          separator: true,
        },
        {
          label: "Export Product List",
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
      ],
    },
    {
      label: "Customer",
      visible: _userState.value.isLoggedIn,
      items: [
        {
          label: "Create Customer",
          data: "create-customer",
          command: selectedItem,
        },
        {
          label: "Edit Customer",
          data: "edit-customer",
          command: selectedItem,
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
        {
          label: "Delete Customer",
          data: "delete-customer",
          command: selectedItem,
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
        {
          separator: true,
        },
        {
          label: "Export Customer List",
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
      ],
    },
    {
      label: "Order",
      visible: _userState.value.isLoggedIn,
      items: [
        {
          label: "New",
          data: "create-order",
          command: selectedItem,
        },
        {
          label: "My Orders",
          data: "my-orders",
          command: selectedItem,
        },
        {
          label: "View Invoice",
          data: "view-invoice",
          command: selectedItem,
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
        {
          label: "Edit",
          data: "edit-order",
          command: selectedItem,
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
        {
          label: "Delete",
          data: "delete-order",
          command: selectedItem,
          visible:
            _userState.value.isLoggedIn && _userState.value.role === "admin",
        },
      ],
    },
    {
      label: "Users",
      visible: _userState.value.isLoggedIn && _userState.value.role === "admin",
      items: [
        {
          label: "New",
        },
        {
          label: "Delete",
        },
        {
          label: "Search",
          items: [
            {
              label: "Filter",
              items: [
                {
                  label: "Print",
                },
              ],
            },
            {
              label: "List",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      visible: _userState.value.isLoggedIn,
      items: [
        {
          label: "Edit",
          items: [
            {
              label: "Save",
            },
            {
              label: "Delete",
            },
          ],
        },
        {
          label: "Archive",
          items: [
            {
              label: "Create",
              data: "create",
              command: selectedItem,
            },
          ],
        },
      ],
    },

    {
      label: "Login",
      data: "login",
      visible: !_userState.value.isLoggedIn,
      command: selectedItem,
    },
    {
      label: "Logout",
      visible: _userState.value.isLoggedIn,
      command: () => {
        logout();
      },
    },
  ];
  const end = (
    <NavLink to="/home" className="company-logo">
      K A M A R A J
    </NavLink>
  );

  function selectedItem(event: any) {
    navigate("/" + event.item.data);
    console.log(event, "/" + event.item.data);
  }
  return (
    <div className="navbar-container">
      <Menubar model={items} end={end}></Menubar>
    </div>
  );
  function logout() {
    dispatch(resetStore());
    dispatch(removeAuthData());
    navigate("/");
  }
}
export default Navbar;
