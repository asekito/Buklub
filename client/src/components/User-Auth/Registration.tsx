import * as React from "react";
import { useParams } from "react-router-dom";
import fetchCommand from "../../../utils/fetching";

const Registration = () => {
  const [user, setUser] = React.useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordConfirmation: "",
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (
      !user.firstname ||
      !user.lastname ||
      !user.username ||
      !user.password ||
      !user.passwordConfirmation
    ) {
      return alert("Make sure all fields are filled out.");
    }

    if (user.password !== user.passwordConfirmation) {
      return alert("Check if the passwords match.");
    }

    if (user.password.search(/[a-z]/i) < 0) {
      return alert("Password must have at least one alphabetical character.");
    }

    if (user.password.search(/[0-9]/) < 0) {
      return alert("Password must have at least one numerical character.");
    }

    if (user.password.length < 5) {
      return alert(
        "Password must have be at least 5 or greater charactesr long."
      );
    }

    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetchCommand("/api/test", obj).then((data) => {
      console.log(data);
    });
  };

  const handleChange = (e: any) => {
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
        <input type='submit' onClick={(e) => submitHandler(e)} />
      </form>
    </div>
  );
};

type UserRegistration = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

export default Registration;
