import { Card, Button, ButtonGroup, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomeButtons(props) {
    return (
        <Container className="justify-content-center pt-5 mt-5">
            <Card className="mt-4">
                <Card.Header as="h5">Select the user's type</Card.Header>
                <Card.Body className="mb-2">
                    <ButtonGroup aria-label="Directions" className="d-flex justify-content-around">
                            <Link style={{minWidth:"33%", textDecoration: "none" }} to="/admin" className="btn-secondary text-center">
                                <Button variant="secondary" style={{minWidth:"100%"}} className="mx-auto" size="lg">Admin</Button>
                            </Link>
                            <Link style={{minWidth:"35%", textDecoration: "none" }} to="/"  className="btn-secondary text-center">
                                <Button variant="secondary" style={{minWidth:"100%"}} className="mx-auto" size="lg" >Officer</Button>
                            </Link>
                            <Link style={{minWidth:"33%", textDecoration: "none" }} to="/customer"  className="btn-secondary text-center">
                                <Button variant="secondary" style={{minWidth:"100%"}} className="mx-auto" size="lg">Customer</Button>
                            </Link>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

