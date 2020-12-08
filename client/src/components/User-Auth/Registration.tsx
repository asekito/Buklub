import * as React from "react";

const Registration = () => {
  const [user, setUser] = React.useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const onChangeForPasswordVerificiation = () => {};
  const handleChange = async (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    await setUser({ ...user, [name]: value });
    console.log(user);
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form>
        <label>Firstname</label>
        <input type='text' name='firstname' onChange={handleChange} />
        <label>Lastname</label>
        <input type='text' name='lastname' onChange={handleChange} />
        <label>Username</label>
        <input type='text' name='username' onChange={handleChange} />
        <label>Password</label>
        <input type='password' name='password' onChange={handleChange} />
        <label>Re-Type Password</label>
        <input type='password' name='passwordVerification' />
        <input type='submit' />
      </form>
    </div>
  );
};

type UserRegistration = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  re_type_password: string;
};

export default Registration;
