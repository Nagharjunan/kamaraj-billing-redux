import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useEffect, useState } from "react";
import "./Login.css";
import {
  setAuthData,
  setLoading,
  userData,
} from "../../features/Auth/AuthSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/Auth/AuthAPI";
import { userDetails } from "../../assets/interface";

function LoginComponent() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userState = useAppSelector(userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.value.isLoggedIn) {
      navigate("home");
    }
  });

  async function onUserSubmit() {
    dispatch(setLoading());
    const authData: userDetails = await loginUser(userName, password);
    try {
      dispatch(setAuthData(authData));
      console.log(authData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <Card title="Login" className="login-card">
        <InputText
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User Name"
        />
        <Password
          value={password}
          placeholder="Password"
          className="password-text"
          inputStyle={{ width: "100%" }}
          onChange={(e) => setPassword(e.target.value)}
          feedback={false}
        />
        <div className="flex justify-content-center align-items-center pt-4">
          <Button label="Submit" onClick={onUserSubmit} />
        </div>
      </Card>
    </div>
  );
}

export default LoginComponent;
