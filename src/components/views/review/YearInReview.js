import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMilestones, ListOfGoals } from "../../ApiManager";
import { Container, Row, Col } from "react-bootstrap";
import "./YearInReview.css";

export const YearInReview = () => {
  const [goals, setGoalList] = useState([]);
  const [milestones, setMilestone] = useState([]);

  const getFilteredGoals = () => {
    ListOfGoals().then((data) => {
      setGoalList(
        data.filter((item) => {
          return item.userId === parseInt(localStorage.getItem("goal_keeper"));
        })
      );
    });
  };

  useEffect(() => {
    getFilteredGoals();
  }, []);

  const getFilteredMilestones = () => {
    getMilestones().then((data) => {
      setMilestone(
        data.filter((item) => {
          return item.goalId === item.goal?.id;
        })
      );
    });
  };

  useEffect(() => {
    getFilteredMilestones();
  }, []);

  const deleteGoal = (id) => {
    fetch(`http://localhost:8088/goals/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        deleteMilestone(id);
      })
      // deleteMilestone called inside of the deleteGoal Delete fetch call to delete the ascociated milestone from the milstones array in the db.
      .then(() => {
        getFilteredGoals();
      });
  };

  const deleteMilestone = (id) => {
    fetch(`http://localhost:8088/milestones/${id}`, {
      method: "DELETE",
    });
  };

  const unixTime = (time) => {
    const myDate = new Date(time);
    const myDateString = `${
      myDate.getDate() + 1
    }/${myDate.getMonth()}/${myDate.getFullYear()}`;
    return myDateString;
  };

  const milestoneChecker = (goalsId) =>
    milestones.find((mileObj) => {
      return (
        mileObj.userId === parseInt(localStorage.getItem("goal_keeper")) &&
        mileObj.goalId === parseInt(goalsId)
      );
    });

  return (
    <>
      {goals
        .map((goalObj) => {
          const currentMilestone = milestoneChecker(goalObj.id);

          return (
            <>
              <div className="goal_list" key={goalObj.id}>
                <Container>
                  <Row>
                    <Col md={12}>
                      {/* <Link
                        className="goal_list"
                        style={{ background: `${goals.category?.color}` }}
                        key={"key2"}
                        to={`/goals/${goalObj.id}`}
                      > */}
                      Goal description: {goalObj.goalDescription}
                      Goal objectives: {goalObj.goalObjective}
                      Notes: {goalObj.goalNotes}
                      Note updates: {goalObj.notes}
                      Start Date: {unixTime(goalObj.goalDate)}
                      {/* </Link> */}
                      <button
                        className="delete-btn"
                        key={"key3"}
                        onClick={() => deleteGoal(goalObj.id)}
                        // When clicked, it invokes the DELETE fetch call for deleteGoal and then invokes the DELETE fetch call for deleteMilestone.
                      >
                        DELETE
                      </button>
                    </Col>

                    <Col className="parent-drop">
                      Goal Category:
                      <button
                        className="drop-btn-2"
                        style={{ background: `${goalObj.category?.color}` }}
                      >
                        {goalObj.category?.category}
                      </button>
                      Goal Priority:
                      <button
                        key={"key5"}
                        className="drop-btn-2"
                        style={{ background: `${goalObj.priority?.color}` }}
                      >
                        {goalObj.priority?.priority}
                      </button>
                      Goal Term:
                      <button
                        key={"key6"}
                        className="drop-btn-2"
                        style={{ background: `${goalObj.term?.color}` }}
                      >
                        {goalObj.term?.term}
                      </button>
                    </Col>
                    {/* </Col> */}
                    <div className="milestone-Container">
                      <Col className="milestones">
                        <label>Overall Direction</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={currentMilestone.direction}
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Flushed And Difined</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={currentMilestone.defined}
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Tangible Progress Made</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={currentMilestone.progress}
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Features Completed</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={currentMilestone.features}
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>

                      <Col className="milestones">
                        <label>Goal Objective Attained</label>
                        {currentMilestone ? (
                          <input
                            className="dirbx"
                            type="checkbox"
                            label="Overall Direction"
                            checked={currentMilestone.attained}
                            disabled
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </div>
                  </Row>
                </Container>
              </div>
            </>
          );
        })
        .reverse()}
    </>
  );
};

// <button
//   key={"key4"}
//   className="cat-btn"
//   style={{ background: `${goalObj.category?.color}` }}
//   >
//   {goalObj.category?.category}
// hello
// </button>

// <button className="test-btn">
//   test
// </button>
