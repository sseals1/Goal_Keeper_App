import React, { useEffect, useState } from "react";
import { GetAllGoals, ListOfGoals } from "../../ApiManager";
import "./FilterBy.css"

export const FilterByWeek = () => {
  const [goallist, setGoalList] = useState([]);

  useEffect(() => {
    ListOfGoals().then((data) => {
      setGoalList(data);
      // console.log(data)
    });
  }, []);

  let date = new Date()
  date.setDate(date.getDate() + 7) 
  
  return (
    <>
      <div key="filter-week">
          {<h4 className="title">This weeks goals</h4>}
        {
          (goallist.filter((goal) => {
              const goalDate = new Date(goal.goalDate)
              const isInRange = goalDate <= date
              return isInRange
            })
            .map((filteredGoal) => (
              <div style={{whiteSpace: 'pre-line'}} className="goal" key={filteredGoal.id}>
               <p className="goal">
               {filteredGoal.goalDescription}{filteredGoal.goalDate}
               </p>
              </div>
              
            )))
        }
      </div>
      {console.log()}
    </>
  );
};

//     const text = "Complete tasks faster than ever before.\n With our platform, it only takes minutes."
//     return (
//         <div style={{whiteSpace: "pre-line"}} >{text}</div>
//     )
// }