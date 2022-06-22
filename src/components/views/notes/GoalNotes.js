import React, { useEffect, useState } from "react";
import { GetGoal } from "../../ApiManager";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./GoalNotes.css"

export const GoalNotes = () => {
  let [goalNotes, setGoalNotes] = useState({});
  const [goals, setGoals] = useState([]);
  const { goalsId } = useParams();
  const history = useHistory();

  useEffect(() => {
    GetGoal(goalsId)
    .then((data) => {
      setGoals(data);
      console.log(data)
    });
  }, [goalsId]);

  const editNotes = (e) => {
      e.preventDefault();
    const noteObj = {
        ...goals,   
        notes: goalNotes,
    };

    fetch(`http://localhost:8088/goals/${goalsId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteObj),
    }).then(() => {
      history.push("/mygoals");
    });
  };

  
  return (
      <>
      <Container className="container">
        <form className="goalForm">
          <h4 className="goalForm__title">Edit Goal Notes</h4>
          <fieldset>
            <div className="form-group">
              <label htmlFor="note_description">Update notes:</label>
              <input
                // The input tag holds all of the logic for capturing the
                // user input for the description field
                required
                autoFocus
                type="textarea"
                // The code that tells what the form field will be (type="text")
                className="form-control"
                placeholder="Writes notes here"
                // The onChange event listener is used to capture the user input from the DOM
                onChange={(event) => {
                    setGoalNotes(event.target.value);
                }}
                />
                <button className="update-btn" onClick={editNotes}>Submit</button>
            </div>
          </fieldset>
        </form>
      </Container>
    </>
  );
};
