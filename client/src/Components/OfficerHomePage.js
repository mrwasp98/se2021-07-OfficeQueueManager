// OfficerHomePage.js: point to access to view the Officers' interface
// Implements by Riccardo and Francesco
// Date update: 18/10/2021

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from "react";
import API from "../API/PutAPI.js"

// Constants
const STATUS_OFFICER = "working";
const WAITING_CODETICKET = "waiting";

// Main functions
function OfficerHomePage(props) {
    // Attributes
    // - officers: list of officers active in this moment
    // - setFlagOfficer: function that allow to update the information about officers
    const { officers, setFlagOfficer } = props;

    return (<>
        {/* Main containter */}
        <Container className="justify-content-center pt-5 mt-3">
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
                                status={officer.status === STATUS_OFFICER ? STATUS_OFFICER : WAITING_CODETICKET}
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
    const { officerId, counter, name, status, setFlagOfficer } = props;

    const TEXT_BUTTON = "Call Next";

    // UseState
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Function that is execute when the officer finish to serve the customer (click the bottom) 
    const handleSubmit = (event) => {
        setError("");

        if (status !== WAITING_CODETICKET) {
            API.updateOfficerStatus(officerId, STATUS_OFFICER)
                .then(() => setLoading(false))
                .catch(res => setError(res.message))

            setFlagOfficer(); // Flag to update the list of officer
        }
    }

    return (<>
        <Row key={`row${officerId}`} style={{ "padding": "15px" }}>
            <Col md="3">{"counterId: " + counter}</Col>
            <Col md="3">{"Name: " + name}</Col>
            <Col md="3">{"Status: " + status}</Col>
            <Col md="3">
                <> <Button variant="secondary" type="submit" disabled={status !== WAITING_CODETICKET ? false : true} onClick={handleSubmit}>{TEXT_BUTTON}</Button> </>
            </Col>
        </Row>


    </>);

}

export default OfficerHomePage;
