import { Card, Button, ButtonGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomeButtons(props) {
    return (
        <Container className="justify-content-center pt-5 mt-5">
            <Card className="mt-4">
                <Card.Header as="h5">Select the user's type</Card.Header>
                <Card.Body className="mb-2">
                    <ButtonGroup aria-label="Directions" className="d-flex">

                        <Button variant="secondary" size="lg">
                            <Link style={{ textDecoration: "none" }} to="/admin" className="btn-secondary">
                            Admin
                        </Link>
                        </Button>
                        <Button variant="secondary" size="lg" >
                            <Link style={{ textDecoration: "none" }} to="/" className="btn-secondary">
                                Officer
                            </Link>
                        </Button>
                        <Button variant="secondary" size="lg">
                            <Link style={{ textDecoration: "none" }} to="/" className="btn-secondary">
                                Customer
                            </Link>
                        </Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

