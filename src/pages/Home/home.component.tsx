import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userData } from "../../features/Auth/AuthSlice";

function HomeComponent() {
  // const _authState = useAppSelector(userData);
  // const navigate = useNavigate();

  useEffect(() => {
    // if (_authState.value.isLoggedIn) {
    // } else {
    //   navigate("/");
    // }
  }, []);

  return (
    <div className="flex flex-column align-items-center justify-content-center h-full">
      <h1>Welcome</h1>
      <h3 className="mb-0">Select any action to continue</h3>
      <h3 className="mt-0">or explore in the top menu bar</h3>
      <Link to="/create-order" className="p-2">
        Create Order
      </Link>
      <Link to="/edit-order" className="p-2">
        Edit Order
      </Link>
      <Link to="/create-product" className="p-2">
        Create Product
      </Link>
      <Link to="/edit-product" className="p-2">
        Edit Product
      </Link>
    </div>
  );
}

export default HomeComponent;
