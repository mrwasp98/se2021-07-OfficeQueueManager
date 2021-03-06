import { Card, Container, Alert, Row, Form, Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import Service from '../Components/Service';

import { addCounter } from "../API/PostAPI";

export default function NewCounter(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [servicesChosen, setServicesChosen] = useState([]);
    const [allFalse, setAllFalse] = useState(false);
    // when a service is checked this useEffect render the form so when I will click on the submit i send to server a correct list
    useEffect(() => {

    }, [servicesChosen])

    const handleSubmit = (event) => {
        setError("");
        setLoading(false);
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        let valid = true;
        if(servicesChosen.length == 0){
            valid = false;
            setError("A counter must serve one o more services");
        }

        if (form.checkValidity() === true && valid === true) {
            setLoading(true);
            servicesChosen.forEach(s=>addCounter(s)
                .then(() => setLoading(false))
                .catch(res => setError(res.message))
                .finally(() => {
                    setLoading(false)
                }));
                setServicesChosen([]);
                setAllFalse(true);
        }
    }

    return (<Container className="justify-content-center pt-5 mt-2 mb-4">
        <Card className="text-center">
            <Card.Body>
                <Card.Text>
                    If you want to <b>add a new counter</b>, this is the right form.
                </Card.Text>

                <Form onSubmit={handleSubmit}>
                    Select services that new counter can serve

                    {props.services.map(s => <Row className="mb-1 ml-2"><Service service={s} servicesChosen={servicesChosen} allFalse={allFalse} setAllFalse={setAllFalse} setServicesChosen={setServicesChosen}>  </Service></Row>)}

                    <Row className="justify-content-end">
                        {loading && (<Alert variant="info" className="mb-0 mr-1"> Now adding</Alert>)}
                        {error && (<Alert variant="danger" className="mb-0 mr-1"> {error}</Alert>)}
                        <Button variant="outline-dark" type="submit" className="mr-3">Add Counter</Button>
                    </Row>

                </Form>
            </Card.Body>
        </Card>
    </Container>
    );
}