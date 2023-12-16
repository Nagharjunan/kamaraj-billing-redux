import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useEffect, useState } from "react";
import "./Login.css";
import { setAuthData, userData } from "../../features/Auth/AuthSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/Auth/AuthAPI";

function LoginComponent() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userState = useAppSelector(userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.value.isLoggedIn) {
      navigate("home");
    }
  });

  async function onUserSubmit() {
    const authData = await loginUser(userName, password);
    if (authData.accessToken) {
      dispatch(setAuthData(authData));
      console.log(authData);
    } else {
      setErrorMessage(authData.response.data.message);
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
        <div className="flex flex-column justify-content-center align-items-center">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <Button label="Submit" onClick={onUserSubmit} />
        </div>
      </Card>
    </div>
  );
}

export default LoginComponent;
