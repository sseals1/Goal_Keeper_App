import React, { useEffect, useState } from "react";
// import { ListOfGoals } from '../../ApiManager'
import { GoalList } from "../goalist/GoalList";
import { Container, Row, Col } from "react-bootstrap";

export const MyGoals = () => {
  return (
    <Container>
      <Row>
        <Col>
        {GoalList()}
        </Col>
      </Row>
    </Container>
  );
};
