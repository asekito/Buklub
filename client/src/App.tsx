import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
const BookSearch = React.lazy(() => import("./components/BookSearch"));
const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/User-Auth/Login"));
const Randomizer = React.lazy(() => import("./components/Randomizer"));
const ReadListProfile = React.lazy(
  () => import("./components/ReadingProfile/ReadListProfile")
);
const Registration = React.lazy(
  () => import("./components/User-Auth/Registration")
);
import { authCheck } from "../utils/token-check";

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
