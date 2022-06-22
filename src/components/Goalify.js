import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Goalify.css";
import { NavigationBar } from "./nav/NavigationBar"


export const Goalify = () => (
  <>
   

    
      <Route
        render={() => {
          if (localStorage.getItem("goal_keeper")) {
            return (
              <>
                <NavigationBar />
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route path="/login">
      <Login />
        </Route> 

      <Route path="/register">
      <Register />
      </Route>
    

    
  </>
);
