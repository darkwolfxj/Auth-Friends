import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
        <div>
            <Switch>
                <PrivateRoute path="/protected" component={ ProtectedRoute } />
                <Route path="/" component={ Login } />
            </Switch>
        </div>
        </Router>
    );
}

export default App;
