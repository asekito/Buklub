import * as React from "react";
import fetchCommand from "../../../utils/fetching";
import authCheck from "../../../utils/token-check";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  React.useEffect(() => {
    authCheck(history, "login");
  }, []);

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!loginInfo.username || !loginInfo.password) {
      return alert("One or more fields are invalid");
    }

    fetchCommand("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((data) => {
        if (!data.auth) {
          throw data.error;
        }

        if (data.auth) {
          localStorage.setItem("user", data.token);
          alert("Login successful");
          history.push("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err);
        Array.from(document.getElementsByClassName("login-input")).forEach(
          (i: any) => (i.value = "")
        );
      });
  };

  const testClick = () => {
    console.log(localStorage.getItem("user"));
  };

  return (
    <div>
      <h1 onClick={testClick}>Login page</h1>
      <form>
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="login-input"
          onChange={(e) => handleChange(e)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="login-input"
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" onClick={(e) => handleSubmit(e)} />
      </form>
    </div>
  );
};

export default Login;
