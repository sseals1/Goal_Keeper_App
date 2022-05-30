import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
<>
        

        <ul className="navbar">
            {/* <li className="navbar__item">
                <Link className="navbar__link" to="/goalform">Home</Link>
            </li> */}

            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/">My Goals</Link>
            </li> */}

            {/* <li className="navbar__item">
                <Link className="navbar__link" to="/goals">My Progress</Link>
            </li> */}


            {/* <li className="navbar__item">
                <Link className="navbar__link" to="/review">Year In Review</Link>
            </li> */}

            {/* <li className="navbar__item">
                <Link className="navbar__link" to="#" 
                onClick={
                    () => {
                        localStorage.removeItem("goal_keeper")
                        }
                    }>
                    Logout
                </Link>
            </li> */}
        </ul>
        </>
    )
}