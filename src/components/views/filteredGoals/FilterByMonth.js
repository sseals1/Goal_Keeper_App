import React, { useEffect, useState } from "react";
import { ListOfGoals } from "../../ApiManager";

export const FilterByMonth = () => {
  const [goalList, setGoalList] = useState([]);

  useEffect(() => {
    ListOfGoals().then((data) => {
      setGoalList(data.filter((item) => {
        return item.userId === parseInt(localStorage.getItem("goal_keeper"));
      }));
    });
  }, []);


  let date = new Date();
  date.setDate(date.getDate() + 30);
  return (
    <>
      <div key="filter-month">
      {<h4 className="title">This Months goals</h4>}
        {goalList
          .filter((goal) => {
            const goalDate = new Date(goal.goalDate);
            const isInRange = goalDate <= date;
            return isInRange;
          })
          .map((filteredGoal) => (
            <div
              style={{ whiteSpace: "pre-line" }}
              className="goal"
              key={filteredGoal.id}
            >
              <p className="goal">
                {filteredGoal.goalDescription}
                {filteredGoal.goalDate}
              </p>
            </div>
          )).reverse()}
      </div>
      
    </>
  );
};
