import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import BookSearch from "./components/BookSearch";
const BookSearch = React.lazy(() => import("./components/BookSearch"));
// import Home from "./components/Home";
const Home = React.lazy(() => import("./components/Home"));
// import Login from "./components/User-Auth/Login";
const Login = React.lazy(() => import("./components/User-Auth/Login"));
// import Randomizer from "./components/Randomizer";
const Randomizer = React.lazy(() => import("./components/Randomizer"));
// import ReadListProfile from "./components/ReadingProfile/ReadListProfile";
const ReadListProfile = React.lazy(
  () => import("./components/ReadingProfile/ReadListProfile")
);
// import Registration from "./components/User-Auth/Registration";
const Registration = React.lazy(
  () => import("./components/User-Auth/Registration")
);
import { authCheck } from "../utils/token-check";
// import fetchCommand from "../utils/fetching";
// import Logout from "./components/User-Auth/________"

export const App = () => {
  React.useEffect(() => {
    authCheck();
  }, []);

  return (
    <div>
      <h1>BukLub</h1>
      <Router>
        <NavBar />
        <Switch>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route exact path="/" component={Home} />
            <Route path="/book-search" component={BookSearch} />
            <Route path="/book-randomizer" component={Randomizer} />
            <Route path="/read-list" component={ReadListProfile} />
          </React.Suspense>
        </Switch>
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
