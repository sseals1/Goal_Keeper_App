import React, { useState, useEffect } from "react";
import { getCategories, getMilestones, ListOfGoals } from "../../ApiManager";
import "./GoalList.css";
// import { format } from 'date-fns'
import { Link, useParams, useHistory } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export const GoalList = () => {
  const history = useHistory()
  const [goallist, setGoalList] = useState([]);
  const { goalsId } = useParams();
  const [categories, setCategories] = useState([])
  const [milestone, setMilestone] = useState({})

  useEffect(() => {
    getCategories()
    .then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    ListOfGoals()
    .then((data) => {
      setGoalList(
        data.filter((item) => {
          return item.userId === parseInt(localStorage.getItem("goal_keeper"));
        })
      );
    });
  }, []);

  useEffect(() => {
    getMilestones()
    .then((data) => {
      setMilestone(data)
      console.log(data)
    })
  },[])

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
console.log(milestone)
console.log(milestoneChecker)
    if (milestoneChecker) {
        history.push("/milefilled")
    }
    console.log(milestoneChecker)
  }

const filterByWeek = () => {
  return (
    <div>
      {goallist.filter(goal => goal.goalDate < new Date() + 7).map(filteredGoals => (
      <li>
        {filteredGoals}
        </li>
      ))}
    </div>
  )
} 


const filterByMonth = () => {
  return (
    <div>
      {goallist.filter(goal => goal.includes("p")).map(filteredGoal => (
      <li>
        {filteredGoal}
        </li>
      ))}
    </div>
  )
} 

{/* <div>
      {names.filter(name => name.includes('J')).map(filteredName => (
        <li>
          {filteredName}
        </li>
      ))}
    </div> */}





  return (
    <>
      <h4 className="title-myGoals">My Goals</h4>
<div>
      <button className="create_goal-btn" onClick={() => {
        history.push("/goalform")
      }}>Create a goal</button>

      <button  className="create_goal-btn" onClick={filterByWeek}>This weeks goals</button>
      <button  className="create_goal-btn" onClick={filterByMonth}>This months goals</button>

       {/* <button className="mothly_goal-btn" onClick{() => {
         history.push("")
      }}></button> */}

</div>



      {goallist.map((goal) => {
        return (
          <div key={goal.id} className="goal_list">
            <Container>
              <Row xs={6}>
                <Col md={12}>
                  <Link onClick={saveMilestone} to={`/goals/${goal.id}`}>
                    Goal description: {goal.goalDescription}
                    Goal objectives: {goal.goalObjective}
                    Notes: {goal.goalNotes}
                    Start Date: {unixTime(goal.goalDate)}
                  </Link>
                      {/* <p> */}
                        {
                      // Apply conditional css to button category
                      // if (goal.id === goal.category?.color.id){
                      //   ${className=${goal.category?.color}}
                      // }
                      // className={ticketObj.emergency ? "emergency ticket" : "ticket"}>
                      // {ticketObj.emergency ? "🚑" : ""}{" "}
                      <button
                      className="drop-btn"
                        style={{ background: `${goal.category?.color}` }}>
                        {goal.category?.category}
                      </button>
                    }
                  {/* </p> */}
                  {/* <p> */}
                    <button className="drop-btn">
                      {goal.priority?.priority}
                    </button>
                  {/* </p> */}
                  {/* <p> */}
                    <button className="drop-btn">{goal.term?.term}</button>
                  {/* </p> */}
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
    </>
  );
};
