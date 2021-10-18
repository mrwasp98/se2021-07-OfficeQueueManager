import { Card, Container, Alert, Form, Button, Row } from "react-bootstrap";
import { useState } from "react";
import { addTicket } from '../API/PostAPI'


export default function TicketAcquisitionPage(props) {
    const [service, setService] = useState("");
    const [ticketId, setTicketId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        setError("");
        setLoading(false);
        event.preventDefault();
        event.stopPropagation();
        if (service) {
            setLoading(true);
            addTicket(service)
                .then((res) => {
                    setLoading(false);
                    setTicketId(res);
                })
                .catch(res => setError(res.message))
                .finally(() => {
                    setLoading(false)
                })
        }
    };

    return (
        <Container className="justify-content-center pt-5 mt-5">
            <h1 className="text-center">Welcome, Customer.</h1>
            <Card className="text-center">
                <Card.Body>
                    <Card.Text>
                        If you want to <b>be served</b>, this is the right place.
                    </Card.Text>
                    <Form onSubmit={handleSubmit} >
                        <Row>
                            <Form.Control as="select" aria-label="Default select example"
                                onChange={(e) => setService(e.target.value)}
                                disabled={ticketId ? true : false}>
                                <option disabled selected>Please, choose one of the following services </option>
                                {props.services.map((option, indeoption) => (
                                    <option key={indeoption} value={option}>{option}</option>
                                ))}
                            </Form.Control>
                        </Row>
                        <Row className="justify-content-end">
                            {loading && (<Alert variant="info" className="mb-0 mr-1 mt-1"> Now adding</Alert>)}
                            {error && (<Alert variant="danger" className="mb-0 mr-1 mt-1"> {error}</Alert>)}
                            <Button variant="outline-dark" type="submit" className="mt-1"
                                disabled={ticketId ? true : false}
                            >Request ticket</Button>
                        </Row>
                    </Form>
                </Card.Body>
                {ticketId &&
                    <Card.Footer>
                        Your <b>ticket id </b> is
                        <h1>{ticketId}</h1>
                    </Card.Footer>}
            </Card>

            {ticketId && <Card className="text-center">
                <Card.Body>
                    <Alert key={1} variant={'success'}>The Estimate Time :   {props.estimation[0].EstimateTime} min</Alert>
                    <Alert key={2} variant={'info'}> The number of people in front of you:  {props.estimation[0].InLinePerson}</Alert>
                </Card.Body>
            </Card>}
        </Container>
    );
}