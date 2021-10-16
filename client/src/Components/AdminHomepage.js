import { useState } from "react";
import { Card, Container, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { addService } from "../API/PostAPI";

export default function AdminHomepage(props) {
    const [serviceTag, setServiceTag] = useState("");
    const [serviceTime, setServiceTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        setError("");
        setLoading(false);
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            setLoading(true)
            addService(serviceTag, serviceTime)
                .then(() => {
                    props.setDirty(true)
                })
                .catch(res => setError(res.message))
                .finally(() => {
                    setLoading(false)
                    setServiceTag("");
                    setServiceTime("");
                })
        }
    };

    return (
        <Container className="justify-content-center pt-5 mt-5">
            <h1 className="text-center">Welcome, Admin.</h1>
            <Card className="text-center">
                <Card.Body>
                    <Card.Text>
                        If you want to <b>add a new service</b>, this is the right place.
                    </Card.Text>

                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridServiceTag">
                                <Form.Label>Service Tag</Form.Label>
                                <Form.Control placeholder="Enter the service tag"
                                    onChange={(x) => setServiceTag(x.target.value)}
                                    value={serviceTag}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTimeService">
                                <Form.Label>Time of Service</Form.Label>
                                <Form.Control type="number" placeholder="Enter the service time (use minutes)"
                                    onChange={(x) => setServiceTime(x.target.value)}
                                    value={serviceTime}
                                    step="0.1"
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Row className="justify-content-end">
                            {loading && (<Alert variant="info" className="mb-0 mr-1"> Now adding</Alert>)}
                            {error && (<Alert variant="danger" className="mb-0 mr-1"> {error}</Alert>)}
                            <Button variant="outline-dark" type="submit">Add service</Button>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}