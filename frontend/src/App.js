import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SingleSpot from "./components/SingleSpot";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import UserReview from "./components/UsersSpotReview/UserReviews";
import UserSpot from "./components/UsersSpotReview/UserSpot";
import AboutPage from "./components/AboutPage";
import * as sessionActions from "./store/session";
import AllSpots from './components/AllSpots'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/users/signup" component={SignupFormPage}/>
          <Route exact path="/users/my/spots" component={UserSpot}isLoaded={isLoaded}/>
          <Route exact path="/users/my/reviews" component={UserReview} isLoaded={isLoaded}/>
          <Route exact path="/spots/new" component={CreateSpotForm} />
          <Route exact path="/spots" component={AllSpots} isLoaded={isLoaded}/>
          <Route exact path="/spots/:spotId" component={SingleSpot} />
          <Route exact path="/spots/:spotId/edit" component={EditSpotForm}/>
          <Route exact path="/" component={AllSpots} isLoaded={isLoaded} />
          <Route exact path="/about" component={AboutPage} />
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>)}
    </div>
  );
}

export default App;
