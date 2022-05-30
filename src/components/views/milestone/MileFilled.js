import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { getFilledMilestones, getGoal, } from '../../ApiManager'
 
export const MileFilled = () => {
    const {goalsId} = useParams()
    const [goal, setGoal] = useState({})
    const [milestone, setMilestone] = useState({})
    const history = useHistory()

    

    console.log(milestone)

    useEffect(() => {
        getFilledMilestones(goalsId)
        .then((data) => {
            setMilestone(data)
        })
    },[])

    
        const theMilestone = milestone.find((mileObj) => {
          return (
            mileObj.userId === parseInt(localStorage.getItem("goal_keeper")) &&
            mileObj.goalId === parseInt(goalsId)
          );
        })
console.log(theMilestone)

      return (
            <>
            <h1>
            
                 This text
                {/* {goal.goalDescription} */}
                {/* {theMilestone.direction}
                {theMilestone.defined}
                {theMilestone.progress}
                {theMilestone.features}
                {theMilestone.attained} */}
                </h1>
            
            </>
      )
   
}


  


    

 