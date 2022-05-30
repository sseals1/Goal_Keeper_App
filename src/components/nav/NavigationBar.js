import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getTips, GoalTips } from "../ApiManager";
import { Link, useHistory } from "react-router-dom";

export const NavigationBar = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    GoalTips().then((data) => {
      setSuggestions(data);
    });
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Goalify</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/goalform">Create A Goal</Nav.Link>
              <Nav.Link href="/mygoals">My Goals</Nav.Link>
              <Nav.Link href="/review">Year In Review</Nav.Link>
              <NavDropdown
                title="Goalsetting Tips"
                id="collasible-nav-dropdown"
              >
                {suggestions.map((data) => {
                  return (
                    <NavDropdown.Item key={data.id} href={`/tips/${data.id}`}>
                      {data.suggestion}
                    </NavDropdown.Item>
                  );
                })}
                {/* <NavDropdown.Item href="#action/3.1">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Nav>
              {/* <Link to="#" 
                onClick={
                    () => {
                        localStorage.removeItem("goal_keeper")
                        }
                    }>
                    Logout
                </Link> */}

              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("goal_keeper");
                }}
                href="/login"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
