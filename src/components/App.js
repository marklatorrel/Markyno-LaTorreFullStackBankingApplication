import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import PrivateRoute from "./PrivateRoute";
import Navi from "./Navi";
import "./App.css";
import AccountHistory from "./AccountHistory";
import TransactionTable from "./TransactionTable";

function App() {
  return (
    <div className="App">
    <Router>
      <AuthProvider>
         <Navi />
        <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/deposit" component={Deposit} />
              <PrivateRoute path="/withdraw" component={Withdraw} />
              <PrivateRoute path="/accountHistory" component={AccountHistory} />

              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
        </Switch>
       </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
