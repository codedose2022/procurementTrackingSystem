import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import _ from "lodash";

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const user = _.get(state, "user.user", "");
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          return loggedInStatus ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }}
      />
    );
  }
  return (
    <>
      <Router>
        <Route exact path='/'>
          <Login />
        </Route>
        <Switch>
          <PrivateRoute exact path='/dashboard'>
            <Dashboard user= {user} />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
