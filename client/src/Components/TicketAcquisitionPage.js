import { Card, Container, Button, Form, Row, Col, Alert } from "react-bootstrap";

export default function TicketAcquisitionPage(props) {
    return (
        <Container className="justify-content-center pt-5 mt-5">
            <h1 className="text-center">Welcome, Customer.</h1>
            <Card className="text-center">
                <Card.Body>
                    <Card.Text>
                        If you want to <b>be served</b>, this is the right place.
                    </Card.Text>

                    <Alert variant="info" className="mb-0 mr-1"> Work in progress</Alert>
                </Card.Body>
            </Card>
        </Container>
    );
}