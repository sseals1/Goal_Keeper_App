import React, { useState, useEffect } from "react";
import { getMilestones, ListOfGoals } from "../../ApiManager";
import "./GoalList.css";
// import { format } from 'date-fns'
import { Link, useParams, useHistory } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
// import { FilterByWeek } from "../filteredGoals/FilterByWeek";
// import { FilterByMonth } from "../filteredGoals/FilterByMonth";

export const GoalList = () => {
  const history = useHistory();
  const [goallist, setGoalList] = useState([]);
  const { goalsId } = useParams();
  // const [categories, setCategories] = useState([]);
  const [milestone, setMilestone] = useState({});

  // useEffect(() => {
  //   getCategories()
  //   .then((data) => {
  //     setCategories(data);
  //   });
  // }, []);

  useEffect(() => {
    ListOfGoals().then((data) => {
      setGoalList(
        data.filter((item) => {
          return item.userId === parseInt(localStorage.getItem("goal_keeper"));
        })
      );
    });
  }, []);

  useEffect(() => {
    getMilestones().then((data) => {
      setMilestone(data);
    });
  }, []);

  const unixTime = (time) => {
    const myDate = new Date(time);
    const myDateString = `${
      myDate.getDate() + 1
    }/${myDate.getMonth()}/${myDate.getFullYear()}`;
    return myDateString;
  };

  const saveMilestone = () => {
    const milestoneChecker = milestone.find((mileObj) => {
      return (
        mileObj.userId === parseInt(localStorage.getItem("goal_keeper")) &&
        mileObj.goalId === parseInt(goalsId)
      );
    });
    
    if (milestoneChecker) {
      history.push("/milefilled");
    }

  };

  return (
    <>
      <h4 className="title-myGoals">My Goals</h4>
      <div>
        <button
          className="create_goal-btn"
          onClick={() => {
            history.push("/goalform");
          }}
        >
          Create a goal
        </button>

        <button
          className="create_goal-btn"
          onClick={() => {
            history.push("/filterbyweek");
          }}
        >
          This weeks goals
        </button>

        <button
          className="create_goal-btn"
          onClick={() => {
            history.push("/filterbymonth");
          }}
        >
          This months goals
        </button>

        {/* <button
          className=""
          // style={{ background: `${goal.category?.color}` }}
          onClick={goal.category}
          >
          {goal.category?.category}
        </button> */}
      </div>

      {goallist
        .map((goal) => {
          return (
            <div key={goal.id} className="goal_list">
              <Container>
                <Row xs={12}>
                  <Col className="goal_list1" md={8}>
                    <Link onClick={saveMilestone} to={`/goals/${goal.id}`}>
                      <div className="goal_props">
                      Goal description: {goal.goalDescription}
                      Goal objectives: {goal.goalObjective}
                      Notes: {goal.goalNotes}
                      Note updates: {goal.notes}
                      Completion Date: {unixTime(goal.goalDate)}
                      </div>
                    </Link>
                    {/* <p> */}
                    {/* {
                    Apply conditional css to button category
                    if (goal.id === goal.category?.color.id){
                      ${className=${goal.category?.color}}
                    }
                    className={ticketObj.emergency ? "emergency ticket" : "ticket"}>
                    {ticketObj.emergency ? "🚑" : ""}{" "}
                  } */}
                    {/* <button className="drop-btn" onClick={() => {
                    history.push(`/goalnotes/${goal.id}`)
                  }}>Edit Notes</button> */}

                    <button
                      className="edit_goal-btn"
                      onClick={() => {
                        history.push(`/goalnotes/${goal.id}`);
                      }}
                    >
                      Edit Notes
                    </button>

                    <button
                      className="drop-btn"
                      style={{ background: `${goal.category?.color}` }}
                      // onClick={editNotes}
                    >
                      {goal.category?.category}
                    </button>

                    {/* <button className="drop-btn">
                    {goal.priority?.priority}
                  </button>
                  
                  <button className="drop-btn">{goal.term?.term}</button> */}
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })
        .reverse()}
    </>
  );
};
