import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SingleSpot from "./components/SingleSpot";
import SpotForm from './components/SpotForm'
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import * as sessionActions from "./store/session";
import AllSpots from './components/AllSpots'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [spot, setSpot] = useState({})
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/users/login">
            <LoginFormPage />
          </Route> */}
          <Route path="/users/signup" component={SignupFormPage}/>
          <Route path="/spots/new" component={CreateSpotForm} />
          <Route exact path="/spots" component={AllSpots} isLoaded={isLoaded}/>
          <Route exact path="/spots/:spotId" component={SingleSpot} />
          <Route exact path="/spots/:spotId/edit" component={EditSpotForm}/>
          <Route exact path="/" component={AllSpots} isLoaded={isLoaded} />
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>)}
    </div>
  );
}

export default App;
