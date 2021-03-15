import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useEffect } from "react";
import { isTokenValid } from "./api/index";
import PrivateRoute from "./PrivateRoute";

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const user = _.get(state, "user.user", "");

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const tokenRes = await isTokenValid(user.token);
        if (!tokenRes.data) {
          localStorage.setItem("auth-token", "");
          localStorage.setItem("master_class", "");
        }
      } catch (error) {
        localStorage.setItem("auth-token", "");
        localStorage.setItem("master_class", "");
      }
    };
    checkTokenValidity();
  }, []);

  return (
    <>
      <Router>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/reset/:key'>
          hi
        </Route>
        <Switch>
          <PrivateRoute exact path='/dashboard' loggedInStatus={loggedInStatus}>
            <Dashboard user={user} />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
