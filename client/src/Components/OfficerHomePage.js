// OfficerHomePage.js: point to access to view the Officers' interface
// Implements by Riccardo
// Date update: 18/10/2021

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from "react";
import API from "../API/PutAPI.js"

// Constants
const STATUS_OFFICER = "waiting";
const WAITING_CODETICKET = "- --";

// Main functions
function OfficerHomePage(props) {
    // Attributes
    // - Officers: list of officers active in this moment
    // - setFlagOfficer: function that allow to update the information about officers
    const { officers, setFlagOfficer } = props;

    return (<>
        {/* Main containter */}
        <Container className="justify-content-center pt-5 mt-5">
            <h1 className="text-center">Welcome, Officer.</h1>

            {/* Card to show the list of officers */}
            <Card className="text-left">
                <Card.Header as="h5">List of officer</Card.Header>
                {/* Body of card */}
                < Card.Body >
                    <Container>
                        {/* Show the list of officer */}
                        {officers.map((officer, index) =>
                            <ViewOfficer officerId={officer.officerId}
                                counter={officer.counter}
                                name={officer.name}
                                codeTicket={officer.status === STATUS_OFFICER ? WAITING_CODETICKET : "A 01"}
                                setFlagOfficer={setFlagOfficer} />)}
                    </Container>
                </Card.Body >
            </Card >
        </Container>
    </>);

}

// Function to view the officer
function ViewOfficer(props) {
    // Attributes
    // - officerId: identifier of officer
    // - counter: number to rappresent the number of desk in the office
    // - name: name of officer
    // - codeTicket: numbero of ticket that officer is serving in this moment
    // - setFlagOfficer: function that allow to update the information about officers 
    const { officerId, counter, name, codeTicket, setFlagOfficer } = props;

    const TEXT_BUTTON = "Complete";

    // UseState
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Function that is execute when the officer finish to serve the customer (click the botton) 
    const handleSubmit = (event) => {
        setError("");

        if (codeTicket !== WAITING_CODETICKET) {
            API.updateOfficerStatus(officerId, STATUS_OFFICER)
                .then(() => setLoading(false))
                .catch(res => setError(res.message))

            setFlagOfficer(); // Flag to update the list of officer

            alert(`the officer ${name} had finish to serve the customer. Your state is ${STATUS_OFFICER}`);
        }
    }

    return (<>
        <Row key={`row${officerId}`} style={{ "padding": "15px" }}>
            <Col md="1">{counter}</Col>
            <Col md="6">{name}</Col>
            <Col md="3">{codeTicket}</Col>
            <Col md="2">
                {' '}
                {codeTicket !== WAITING_CODETICKET ?
                    <> <Button variant="secondary" type="submit" onClick={handleSubmit}>{TEXT_BUTTON}</Button> </> :
                    <></>}
                {' '}

            </Col>
        </Row>


    </>);

}

export default OfficerHomePage;
