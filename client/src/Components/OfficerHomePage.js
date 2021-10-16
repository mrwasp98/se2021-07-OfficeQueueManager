import { useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function OfficerHomePage(props) {
    const officers = [
        {counter: 1, nameOfficer: "Riccardo", codeTicket: "A01"},
        {counter: 2, nameOfficer: "Francesco", codeTicket: "A02"},
        {counter: 4, nameOfficer: "Giacomo", codeTicket: "B01"}]

    return (<>
        {/* Contenitore */}
        <Container className="justify-content-center pt-5 mt-5">
        <h1 className="text-center">Welcome, Officer.</h1>
            <Card className="text-left">
                <Card.Header as="h5">List of officer</Card.Header>
                {/* Intestazione */}
                {/* Corpo */}
                < Card.Body >
                    <Container>
                        {officers.map((officer, index) => 
                            <ViewOfficer key={index} counter={officer.counter} nameOfficer={officer.nameOfficer} codeTicket={officer.codeTicket} /> )}
                    </Container>
                </Card.Body >
            </Card >
        </Container>
    </>);

}

function ViewOfficer(props) {
    const {counter, nameOfficer, codeTicket} =  props;
    const TEXT_BUTTON = "Complete";

    return (<>
        <Row style={{ "padding": "15px" }}>
            <Col md="1">{counter}</Col>
            <Col md="6">{nameOfficer}</Col>
            <Col md="3">{codeTicket}</Col>
            <Col md="2">
                {' '}<Button variant="secondary">{TEXT_BUTTON}</Button>{' '}
            </Col>
        </Row>


    </>);

}

export default OfficerHomePage;