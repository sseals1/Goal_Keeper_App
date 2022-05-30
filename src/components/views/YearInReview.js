import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMilestones, ListOfGoals } from "../ApiManager";

export const YearInReview = () => {
  const [goals, setGoalList] = useState([]);
  const [milestones, setMilestone] = useState([]);

  const getFilteredGoals = () => {
    ListOfGoals()
    .then((data) => {
      setGoalList(
        data.filter((item) => {
          return item.userId === parseInt(localStorage.getItem("goal_keeper"));
        })
      );
    });
  };

  useEffect(() => {
    getFilteredGoals();
  },[]);

  const getFilteredMilestones = () => {
    getMilestones()
    .then((data) => {
      setMilestone(
        data.filter((item) => {
          return item.goalId === item.goal?.id
        })
      )
    })
  }

  useEffect(() => {
    getFilteredMilestones();
  },[])

  const deleteGoal = (id) => {
    fetch(`http://localhost:8088/goals/${id}`, {
      method: "DELETE",
    }).then(() => {
      getFilteredGoals();
    });
  };

  const deleteMilestone = (id) => {
    fetch(`http://localhost:8088/milestones/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      {goals.map((goalObj) => {
        return (
          <>
            <div key={"key1"}>
              <Link key={goalObj.id} to={`/goals/${goalObj.id}`}>
                {goalObj.goalDescription}
              </Link>
              <button key={goalObj.id} onClick={() => deleteGoal(goalObj.id)}>
                DELETE
              </button>
            </div>
            {
                <button
                  key={""}
                  className="drop-btn"
                  style={{ background: `${goalObj.category?.color}` }}
                >
                  {goalObj.category?.category}
                </button>
            }

            <button key={""} className="drop-btn">{goalObj.priority?.priority}</button>

            <button key={""} className="drop-btn">{goalObj.term?.term}</button>
          </>
        );
      })}
    </>
  );
};
