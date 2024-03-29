import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userData } from "../../features/Auth/AuthSlice";
import { resetStore } from "../../app/resetAction";

function HomeComponent() {
  const _authState = useAppSelector(userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (_authState.value.isLoggedIn) {
    } else {
      dispatch(resetStore());
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-column align-items-center justify-content-center h-full">
      <h1>Welcome</h1>
      <h3 className="mb-0">Select any action to continue</h3>
      <h3 className="mt-0">or explore in the top menu bar</h3>
      <Link to="/create-order" className="p-2">
        Create Order
      </Link>
      <Link to="/my-orders" className="p-2">
        My Orders
      </Link>
      {_authState.value.role === "admin" ? (
        <>
          <Link to="/approve-order" className="p-2">
            Approve Order
          </Link>
          <Link to="/view-invoice" className="p-2">
            View Invoice
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomeComponent;
