import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Switch>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
