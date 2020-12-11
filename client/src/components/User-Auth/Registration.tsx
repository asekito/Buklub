import * as React from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import fetchCommand from "../../../utils/fetching";

const Registration = () => {
  const [user, setUser] = React.useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordConfirmation: "",
  });
  const history = useHistory();

  const submitHandler = (
    e: React.MouseEvent,
    inputUser: UserRegistration
  ): void => {
    e.preventDefault();
    if (
      !inputUser.firstname ||
      !inputUser.lastname ||
      !inputUser.username ||
      !inputUser.password ||
      !inputUser.passwordConfirmation
    ) {
      return alert("Make sure all fields are filled out.");
    }

    if (inputUser.password !== inputUser.passwordConfirmation) {
      return alert("Check if the passwords match.");
    }

    if (inputUser.password.search(/[a-z]/i) < 0) {
      return alert("Password must have at least one alphabetical character.");
    }

    if (inputUser.password.search(/[0-9]/) < 0) {
      return alert("Password must have at least one numerical character.");
    }

    if (inputUser.password.length < 5) {
      return alert(
        "Password must have be at least 5 or greater characters long."
      );
    }

    if (inputUser.username.length < 5) {
      return alert("Username must be at least 5 or greater characters long.");
    }

    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputUser),
    };

    fetchCommand("/api/create-account", obj).then((data) => {
      if ((data.auth = false)) {
        alert(data.error);
        return location.reload();
      } else {
        alert("Account creation was successful!");
        return history.push("/login");
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form>
        <label>Firstname</label>
        <input
          type='text'
          name='firstname'
          minLength={1}
          onChange={handleChange}
        />
        <label>Lastname</label>
        <input
          type='text'
          name='lastname'
          minLength={1}
          onChange={handleChange}
        />
        <label>Username</label>
        <input
          type='text'
          name='username'
          minLength={5}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          minLength={6}
          onChange={handleChange}
        />
        <label>Re-Type Password</label>
        <input
          type='password'
          name='passwordConfirmation'
          minLength={6}
          onChange={handleChange}
        />
        <input type='submit' onClick={(e) => submitHandler(e, user)} />
      </form>
    </div>
  );
};

interface UserRegistration {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export default Registration;
