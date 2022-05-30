import React, { useState } from "react";
import { Route } from "react-router-dom";
import { GoalForm } from "./views/goalForm/GoalForm";
import { MyGoals } from "./views/goalForm/MyGoals";
import { Goal, MileFilled } from "./views/milestone/MileFilled"
import { GoalList } from "./views/goalist/GoalList";
import { GoalMilestone } from "./views/milestone/GoalMilestone"
import { Home } from "./views/home/Home";
import { Tips } from "./views/suggestions/Tips"
import { YearInReview } from "./views/YearInReview"

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/goals">
        <GoalList />
      </Route>

      <Route exact path="/goalform">
        <GoalForm />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/review">
       <YearInReview />
      </Route>

      <Route exact path="/mygoals">
        <MyGoals />
      </Route>

      <Route path="/goals/:goalsId(\d+)">
        <GoalMilestone />
      </Route>
      <Route path="/tips/:tipsId(\d+)">
        <Tips />
      </Route>
      <Route exact path="/milefilled">
        <MileFilled />
      </Route>
      
    </>
  );
};
