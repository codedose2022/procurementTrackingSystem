import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import _ from "lodash";
import PrivateRoute from "./PrivateRoute";
import ChangePassword from "./components/Login/ChangePassword";

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const user = _.get(state, "user.user", "");

  return (
    <>
      <Router>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/reset/:key">
          <ChangePassword />
        </Route>
        <Switch>
          <PrivateRoute exact path="/dashboard" loggedInStatus={loggedInStatus}>
            <Dashboard user={user} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/changePassword"
            loggedInStatus={loggedInStatus}
          >
            <ChangePassword user={user} changePassword={true} />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
