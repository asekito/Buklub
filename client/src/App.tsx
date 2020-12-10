import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import Randomizer from "./components/Randomizer";
import Home from "./components/Home";
import ReadList from "./components/BookReview";
import Registration from "./components/User-Auth/Registration";
import Login from "./components/User-Auth/Login";
import fetchCommand from "../utils/fetching";
// import Logout from "./components/User-Auth/________"

export const App = () => {
  React.useEffect(() => {
    const token = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;

    fetchCommand("/api/auth-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("user") }),
    })
      .then((response) => {
        if (response.response) {
          // do something?
        }

        if (!response.response) {
          // do something?
        }

        if (response.error) {
          throw response.error;
        }
      })
      .catch((err) => {
        if (err.expiredAt) {
          localStorage.removeItem("user");
          window.location.reload();
        }
      });
  }, []);

  return (
    <div>
      <h1>Welcome to BukLub!</h1>
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
                  <Link to='/book-list'>Book List</Link>
                </li>
              ) : null}
              {localStorage.getItem("user") ? (
                <li>
                  <Link to='/'>Logout</Link>
                </li>
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
            <Route path='/book-read-list'>
              <ReadList />
            </Route>
            <Route path='/book-randomizer'>
              <Randomizer />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
            {localStorage.getItem("user") ? null : (
              <Route path='/book-list'>
                <BookList />
              </Route>
            )}
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
