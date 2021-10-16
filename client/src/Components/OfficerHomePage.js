import { useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import API from "../API/PutAPI.js"

function OfficerHomePage(props) {
    const { officers, setFlagOfficer } = props;

    const copy_officers = [
        { counter: 1, nameOfficer: "Riccardo", codeTicket: "A01" },
        { counter: 2, nameOfficer: "Francesco", codeTicket: "A02" },
        { counter: 4, nameOfficer: "Giacomo", codeTicket: "B01" }]

    return (<>
        {/* Contenitore */}
        <Container className="justify-content-center pt-5 mt-5">
            <Card className="text-left">
                <Card.Header as="h5">List of officer</Card.Header>
                {/* Intestazione */}
                {/* Corpo */}
                < Card.Body >
                    <Container>
                        {officers.map((officer) =>
                            <ViewOfficer officerId={officer.officerId} counter={officer.counter} name={officer.name} codeTicket={"A01"} setFlagOfficer={setFlagOfficer}/>)}
                    </Container>
                </Card.Body >
            </Card >
        </Container>
    </>);

}

function ViewOfficer(props) {
    const { officerId, counter, name, codeTicket, setFlagOfficer } = props;
    const TEXT_BUTTON = "Complete";
    const STATUS_OFFICER = "waiting"

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        setError("");

        API.updateOfficerStatus(officerId, STATUS_OFFICER)
            .then(() => setLoading(false))
            .catch(res => setError(res.message))
        
            setFlagOfficer(); // Flag per interrogare il db
    }

    return (<>
        <Row style={{ "padding": "15px" }}>
            <Col md="1">{counter}</Col>
            <Col md="6">{name}</Col>
            <Col md="3">{codeTicket}</Col>
            <Col md="2">
                {' '}<Button variant="secondary" type="submit" onClick={handleSubmit}>{TEXT_BUTTON}</Button>{' '}
            </Col>
        </Row>


    </>);

}

export default OfficerHomePage;