import React from "react"
import "./Home.css"
import { useHistory } from "react-router-dom"




export const Home = () => {
const history = useHistory()
    return (
        <>
        <div className="home-style">
            {<h1>Welcome to Goalify</h1>}
            click below to get started
        </div>
        <button className="button-box" onClick={(event) => 
        history.push("/goalform")}>
            Start tracking your goals now!
        </button>
        
        </>
        
        
    )
}