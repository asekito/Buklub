import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/User-Auth/Login";
import Randomizer from "./components/Randomizer";
import ReadListProfile from "./components/ReadListProfile";
import Registration from "./components/User-Auth/Registration";
import { authCheck } from "../utils/token-check";
// import fetchCommand from "../utils/fetching";
// import Logout from "./components/User-Auth/________"

export const App = () => {
  React.useEffect(() => {
    authCheck();
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("user");
    if (token) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  return (
    <div>
      <h1>BukLub</h1>
      <Router>
        <div>
          <nav>
            <ul>
              {localStorage.getItem("user") ? null : (
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              )}
              {localStorage.getItem("user") ? null : (
                <li>
                  <Link to='/register'>Sign Up</Link>
                </li>
              )}
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/book-randomizer'>Randomizer</Link>
              </li>
              {localStorage.getItem("user") ? (
                <li>
                  <Link to='/read-list'>Read List Profile</Link>
                </li>
              ) : null}
              {localStorage.getItem("user") ? (
                <li onClick={handleLogout}>Logout</li>
              ) : null}
            </ul>
          </nav>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Registration />
            </Route>
            {localStorage.getItem("user") ? (
              <Route path='/read-list'>
                <ReadListProfile />
              </Route>
            ) : null}
            <Route path='/book-randomizer'>
              <Randomizer />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

// export default App;

// export interface Props {
//   userName: string;
//   lang: string;
// }

{
  /* {localStorage.getItem("user") ? null : (
)} */
}
