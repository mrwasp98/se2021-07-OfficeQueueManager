import {Form, Row, Col} from "react-bootstrap";
import {useState } from "react";

export default function Service(props){
    const [type, setType] = useState(false);
    
    const editServicesChosen = (ev) => {
        if(ev.target.checked == true){
          props.setServicesChosen([...props.servicesChosen, props.service]);
        } else{
          let otherServices = props.servicesChosen.filter( s => s!=props.service);
          props.setServicesChosen(otherServices);
        }
        setType(ev.target.checked);
      }

    return (
        <Form.Group controlId="formBasicCheckbox" style={{padding: "5px"}}>
        <Row>
          <Col>
          <Form.Check type="checkbox" label={props.service} onClick={ev => editServicesChosen(ev)} checked={type}/>
          </Col>
        </Row>
      </Form.Group>
    );
}