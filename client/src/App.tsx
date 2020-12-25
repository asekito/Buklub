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
import Loading from "./components/Loading";
import authCheck from "../utils/token-check";
import { useHistory } from "react-router-dom";
import "./assets/App.scss";

export const App = () => {
  const history = useHistory();

  React.useEffect(() => {
    authCheck(history, "");
  }, []);

  return (
    <div id="app">
      <Router>
        <NavBar />
        <Switch>
          <React.Suspense fallback={<Loading />}>
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
