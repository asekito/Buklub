import * as React from "react";
import fetchCommand from "../../../utils/fetching";

const Login = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
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
    }).then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Login page</h1>
      <form>
        <label>Username</label>
        <input type='text' name='username' onChange={(e) => handleChange(e)} />
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={(e) => handleChange(e)}
        />
        <input type='submit' onClick={(e) => handleSubmit(e)} />
      </form>
    </div>
  );
};

export default Login;
