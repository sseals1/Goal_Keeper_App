import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFilledMilestones, GetGoal, getMilestones } from "../../ApiManager";

export const MileFilled = () => {
  const { goalsId } = useParams();
  const [goal, setGoal] = useState({});
  const [milestone, setMilestone] = useState({});
  const history = useHistory();

  console.log(milestone);

  useEffect(() => {
    getFilledMilestones(goalsId)
    .then((data) => {
      setMilestone(data)
    })
  },[])

  
  // useEffect(() => {
    //   getMilestones().then((data) => {
      //     setMilestone(data);
      //   });
      // },[]);
      
      return (
        <>
      <h1>This text</h1>
      

        {

        milestone.find((mileObj) => {
          return (
            mileObj.id === goalsId
          );
        })

        }

        
    </>
  );
};
