import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
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
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/deposit" component={Deposit} />
              <PrivateRoute path="/withdraw" component={Withdraw} />
              <PrivateRoute path="/accountHistory" component={AccountHistory} />
              <PrivateRoute path="/test" component={TransactionTable} />

              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
       </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
