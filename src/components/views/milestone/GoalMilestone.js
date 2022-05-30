import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { getGoal, getMilestones } from "../../ApiManager";
import "./GoalMilestone.css";

export const GoalMilestone = () => {
  const history = useHistory();
  const { goalsId } = useParams();
  const [goal, setGoal] = useState("");
  const [direction, setDirection] = useState({});
  const [defined, setDefined] = useState({});
  const [progress, setProgress] = useState({});
  const [features, setFeatures] = useState({});
  const [attained, setAttained] = useState({});
  const [notes, setNotes] = useState({});
  const [milestone, setMilestone] = useState([]);

  const saveMilestone = () => {
    const milestoneChecker = milestone.find((mileObj) => {
      return (
        mileObj.userId === parseInt(localStorage.getItem("goal_keeper")) &&
        mileObj.goalId === parseInt(goalsId)
      );
    });

    const newMilestoneObject = {
      direction: direction,
      defined: defined,
      progress: progress,
      features: features,
      attained: attained,
      notes: notes,
      userId: parseInt(localStorage.getItem("goal_keeper")),
      goalId: goal.id,
    };

    if (milestoneChecker) {
      fetch(`http://localhost:8088/milestones/${goalsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMilestoneObject),
      })
      .then(() => {
      history.push("/milefilled");
      });
    } else {
      const fetchObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMilestoneObject),
      };
      return fetch(`http://localhost:8088/milestones`, fetchObject).then(() => {
        history.push("/mygoals");
      });
    
  };}

  useEffect(() => {
    getGoal(parseInt(goalsId)).then((data) => {
      setGoal(data);
    });
  }, []);

  useEffect(() => {
    getMilestones().then((data) => {
      setMilestone(data);
    });
  }, []);

  return (
    <>
      <Container className="container">
        <h3 className="milestone-rev">Milstone Review</h3>
        <Container>
          <fieldset>
            <div className="form-group">
              <input
                className="dirbx"
                type="checkbox"
                label="My Value"
                value={""}
                onChange={(event) => {
                  setDirection(event.target.checked);
                }}
              />

              <Row>
                <Col>
                  <label className="title" htmlFor="name">
                    Overall Direction
                  </label>
                </Col>
              </Row>
            </div>
          </fieldset>
        </Container>
        <Container>
          <fieldset>
            <div className="form-group">
              <input
                className="defbx"
                type="checkbox"
                label="My Value"
                value={""}
                onChange={(event) => {
                  setDefined(event.target.checked);
                }}
              />

              <Row>
                <Col>
                  <label className="title" htmlFor="name">
                    Flushed And Defined
                  </label>
                </Col>
              </Row>
            </div>
          </fieldset>
        </Container>
        <Container>
          <fieldset>
            <div className="form-group">
              <input
                className="featbx"
                type="checkbox"
                label="My Value"
                value={""}
                onChange={(event) => {
                  setProgress(event.target.checked);
                }}
              />

              <Row>
                <Col>
                  <label className="title" htmlFor="name">
                    Tangible Progress Made
                  </label>
                </Col>
              </Row>
            </div>
          </fieldset>
        </Container>
        <Container>
          <fieldset>
            <div className="form-group">
              <input
                className="featbx"
                type="checkbox"
                label="My Value"
                value={""}
                onChange={(event) => {
                  setFeatures(event.target.checked);
                }}
              />

              <Row>
                <Col>
                  <label className="title" htmlFor="name">
                    Features Completed
                  </label>
                </Col>
              </Row>
            </div>
          </fieldset>
        </Container>
        <Container>
          <fieldset>
            <div className="form-group">
              <input
                className="attbx"
                type="checkbox"
                transform="scale(4)"
                label="My Value"
                value={""}
                onChange={(event) => {
                  setAttained(event.target.checked);
                }}
              />

              <Row>
                <Col>
                  <label className="title" htmlFor="name">
                    Goal Objective Attained
                  </label>
                </Col>
              </Row>
            </div>
          </fieldset>
        </Container>
        <Container>
          <fieldset>
            <div className="form-group">
              <Row>
                <Col>
                  <label className="title" htmlFor="name">
                    Notes
                  </label>
                </Col>
              </Row>
              <Row>
                <Col>
              <textarea
                className="textarea"
                placeholder="Enter milestone notes here..."
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
              ></textarea>
               </Col>
              </Row>
            </div>
          </fieldset>
        </Container>

        <button
          key={"save-btn"}
          className="saveMilestone-btn"
          onClick={saveMilestone}
        >
          Save
        </button>
      </Container>
    </>
  );
};
