import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import Randomizer from "./components/Randomizer";
import Home from "./components/Home";
import ReadList from "./components/BookReview";
import Registration from "./components/User-Auth/Registration";

export const App = () => (
  <div>
    <h1>Welcome to BukLub!</h1>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/book-list'>Book List</Link>
            </li>
            <li>
              <Link to='/book-randomizer'>Randomizer</Link>
            </li>
            <li>
              <Link to='/register'>Sign Up</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/register'>
            <Registration />
          </Route>
          <Route path='/book-read-list'>
            <ReadList />
          </Route>
          <Route path='/book-list'>
            <BookList />
          </Route>
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

// export default App;

// export interface Props {
//   userName: string;
//   lang: string;
// }
