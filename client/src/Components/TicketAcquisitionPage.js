import { Card, Container, Alert, Form, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { addTicket } from '../API/PostAPI'
import { getQueue } from '../API/GetAPI'

export default function TicketAcquisitionPage(props) {
    const [service, setService] = useState("");
    const [ticketId, setTicketId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [queue, setQueue] = useState([]);
    const [find, setFind] = useState(false);

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

    useEffect(() => {
        getQueue()
            .then((res) => {
                setQueue(res)
                console.log(res);
            })
            .then(() => {
                queue.map(el => {
                    if (el.ticket_num == ticketId) {
                        setFind(true);
                    }
                })
            })
    }, []);

    return (
        <Container className="justify-content-center pt-5 mt-5 mb-5">
            <h1 className="text-center">Welcome, Customer.</h1>
            <Card className="text-center">
                {/* <Card.Body>
                    <Alert key={1} variant={'success'}>The Estimate Time :   {props.estimation.EstimateTime} min</Alert>
                    <Alert key={2} variant={'info'}> The number of people in front of you:  {props.estimation.InLinePerson}</Alert>
                </Card.Body> */}
                <Card.Body>
                    <h2>Queue:</h2>
                    <Row >
                        <Col> <h4>Ticket Number</h4></Col>
                        <Col> <h4>Counter Id</h4></Col>
                    </Row>
                    {queue.map((t, i) => {
                        return (
                            <Row key={i}>
                                <Col> {t.ticket_num}</Col>
                                <Col> {t.counterId}</Col>
                            </Row>
                        )
                    })}
                </Card.Body>
                </Card>
            <Card className="text-center">
                <Card.Body>
                    <Card.Text>
                        If you want to <b>be served</b>, this is the right place.
                    </Card.Text>
                    <Form onSubmit={handleSubmit} >
                        <Row>
                            <Form.Control as="select" aria-label="Default select example"
                                onChange={(e) => setService(e.target.value)}
                                disabled={ticketId ? true : false}
                                defaultValue={0}>
                                <option>Please, choose one of the following services </option>
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

            
                {find &&
                <Card>
                    <Card.Footer>
                        <Alert variant="info" className="mb-0 mr-1"> It's your turn!</Alert>
                    </Card.Footer>
                </Card>
                }

          
        </Container>
    );
}