import { Card, Container, Alert, Row, Form, Button, Col} from "react-bootstrap";
import { useEffect, useState } from "react";

import Service from '../components/Service';

import { addCounter } from "../API/PostAPI";

export default function NewCounter(props){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [counterNum, setCounterNum] = useState();
    const [servicesChosen, setServicesChosen] = useState([]);


    const handleSubmit = (event) => {
        setError("");           
        setLoading(false);
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        let valid = true;
        if(counterNum == 0){
            valid = false;
            setError("Cannot exists a counter with 0");
        }
        if(servicesChosen.length == 0){
            valid = false;
            setError("A counter must serve one o more services");
        }

        if (form.checkValidity() === true && valid === true) {
                setLoading(true);
                addCounter(counterNum, servicesChosen)
                    .then(() => setLoading(false))
                    .catch(res => setError(res.message))
                    .finally(() => setLoading(false));
                    setCounterNum();
        }
    }
  

    return (<Container className="justify-content-center pt-5 mt-5">
            <Card className="text-center">
            <Card.Body>
                <Card.Text>
                    If you want to <b>add a new counter</b>, this is the right form.
                </Card.Text>

                <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCounterNumber">
                        <Form.Label>Counter number</Form.Label>
                        <Form.Control placeholder="Enter the counter number"
                            onChange={(x) => setCounterNum(x.target.value)}
                            value={counterNum}
                            required
                        />
                    </Form.Group>  
                </Row>
                Select services that new counter can serve 

                <Row className="mb-3">
                    {props.services.map( s => <Service service={s} servicesChosen={servicesChosen} setServicesChosen={setServicesChosen}>  </Service>)}
                </Row>

                <Row className="justify-content-end">
                    {loading && (<Alert variant="info" className="mb-0 mr-1"> Now adding</Alert>)}
                    {error && (<Alert variant="danger" className="mb-0 mr-1"> {error}</Alert>)}
                    <Button variant="outline-dark" type="submit">Add Counter</Button>
                </Row>

                </Form>
            </Card.Body>
            </Card>
        </Container>
    );
}