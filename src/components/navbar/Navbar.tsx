import { Menubar } from "primereact/menubar";
import "./Navbar.css";

import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Product",
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
        },
        {
          separator: true,
        },
        {
          label: "Export Product List",
        },
      ],
    },
    {
      label: "Customer",
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
        },
        {
          separator: true,
        },
        {
          label: "Export Customer List",
        },
      ],
    },
    {
      label: "Order",
      items: [
        {
          label: "New",
          data: "create-order",
          command: selectedItem,
        },
        {
          label: "Edit",
          data: "edit-order",
          command: selectedItem,
        },
      ],
    },
    {
      label: "Users",
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
      command: selectedItem,
    },
  ];
  const end = (
    <NavLink to="/" className="company-logo">
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
}

export default Navbar;
