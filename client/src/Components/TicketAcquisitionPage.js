import { Card, Container, Alert, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import ControlledCarousel from './ControlledCarousel';
import { useState } from "react";

export default function TicketAcquisitionPage(props) {
    const [value, setValue] = useState();
    const handleChange = (val) => setValue(val);
        return (
        <Container className="justify-content-center pt-5 mt-5">
            <h1 className="text-center">Welcome, Customer.</h1>
            <Card className="text-center">
                <Card.Body>
                    <Card.Text>
                        If you want to <b>be served</b>, this is the right place.
                    </Card.Text>
                    <Alert variant="info" className="mb-0 mr-1"> Please, choose one of the following services</Alert>
                    <ToggleButtonGroup type="checkbox" value={value} className="mb-2 mt-2" onChange={handleChange}>
                        <ToggleButton id="tbg-check-1" value={1}>
                            {props.services[0]}
                        </ToggleButton>
                        <ToggleButton id="tbg-check-2" value={2}>
                            {props.services[1]}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}