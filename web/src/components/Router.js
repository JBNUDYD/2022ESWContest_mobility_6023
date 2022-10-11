import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Carlist from "routes/Carlist"
import Carinfo from "routes/Carinfo"
import Memberlist from "routes/Memberlist"
import TrafficMap from "routes/TrafficMap"
import Receiptlist from "routes/Receiptlist"

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home isLoggedIn={isLoggedIn} userObj={userObj} />
            </Route>
            <Route exact path="/carlist">
              <Carlist userObj={userObj} />
            </Route>
            <Route path="/map">
              <TrafficMap userObj={userObj}/>
            </Route>
            <Route exact path="/memberlist">
              <Memberlist userObj={userObj} />
            </Route>
            <Route path="/carinfo/:id">
              <Carinfo userObj={userObj} />
            </Route>
            <Route path="/receipt/:id">
              <Receiptlist userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;