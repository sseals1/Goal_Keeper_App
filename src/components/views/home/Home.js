import React from "react"
import "./Home.css"
import { useHistory } from "react-router-dom"




export const Home = () => {
const history = useHistory()
    return (
        <>
        <div className="home-style">
            {<h1>Welcome to Goalify</h1>}
            <p className="text1">
                Make sure your goals are single accomplishment aspirations. 
                Ongoing goals will be a feature that will be added to future versions of Goalify.
            </p>
            
            <p className="text2">
            click below to get started
            </p>
        </div>

        <button className="button-box" onClick={(event) => 
        history.push("/goalform")}>
            Start tracking your goals now!
        </button>
        
        </>
        
        
    )
}