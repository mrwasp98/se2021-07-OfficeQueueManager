import { Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Service(props) {
  const [type, setType] = useState(false);

  useEffect(() => {
    if(props.allFalse == true){
      setType(false);
      props.setAllFalse(false);
    }
  },[props.allFalse]);

  const editServicesChosen = (ev) => {

    if (ev.target.checked == true) {
      props.setServicesChosen([...props.servicesChosen, props.service]);
    } else {
      let otherServices = props.servicesChosen.filter(s => s != props.service);
      props.setServicesChosen(otherServices);
    }
    setType(ev.target.checked);
  }

  return (
    <Form.Group controlId="formBasicCheckbox" style={{ padding: "5px" }}>
      <Row>
        <Col>
          <Form.Check type="checkbox" label={props.service} onClick={ev => editServicesChosen(ev)} onChange={()=>{}} checked={type} />
        </Col>
      </Row>
    </Form.Group>
  );
}