import { useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function OfficerHomePage(props) {
    const { officers } = props;
    
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
                            <ViewOfficer counter={officer.counter} name={officer.name} codeTicket={"A01"} />)}
                    </Container>
                </Card.Body >
            </Card >
        </Container>
    </>);

}

function ViewOfficer(props) {
    const { counter, name, codeTicket } = props;
    const TEXT_BUTTON = "Complete";

    return (<>
        <Row style={{ "padding": "15px" }}>
            <Col md="1">{counter}</Col>
            <Col md="6">{name}</Col>
            <Col md="3">{codeTicket}</Col>
            <Col md="2">
                {' '}<Button variant="secondary">{TEXT_BUTTON}</Button>{' '}
            </Col>
        </Row>


    </>);

}

export default OfficerHomePage;