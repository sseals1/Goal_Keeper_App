import React, { useEffect, useState } from "react";
import { getTips } from "../../ApiManager";
import { useParams } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap"

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
        <h4>{tips.suggestion}</h4>
      </Row>
      <Row>
        <Col xs={6}>{tips.tip}</Col>
      </Row>
      <div className="tips">
        <label htmlFor="name"></label>
       
         
        
      </div>
      </Container>

  );
};
