import React, { useEffect, useState } from "react";
import { getTips } from "../../ApiManager";
import { useParams } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap"
import "./Tips.css"

export const Tips = () => {
  const [tips, setTips] = useState({});
  const { tipsId } = useParams();

  useEffect(() => {
    getTips(tipsId)
    .then((data) => {
      setTips(data);
      console.log(data)
    });
  },[]);

  return (

    <Container>
      <Row>
        <h4 className="h4">{tips.suggestion}</h4>
      </Row>
      <div className="tips">
      <Row>
        <Col xs={5}>{tips.tip}</Col>
      </Row>
        <label htmlFor="name"></label>
       
         
        
      </div>
      </Container>

  );
};
