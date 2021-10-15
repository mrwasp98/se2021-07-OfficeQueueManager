import { Card, Container, Alert, Row, Form, Button, Col} from "react-bootstrap";
import { useEffect, useState } from "react";

import Service from '../Components/Service';

import { addCounter } from "../API/PostAPI";
import getAllServices  from "../API/GetAPI";

export default function NewCounter(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [counterNum, setCounterNum] = useState(0);
    const [allServices, setAllServices] = useState([])
    const [servicesChosen, setServicesChosen] = useState([]);

    // when a service is checked this useEffect render the form so when I will click on the submit i send to server a correct list
    useEffect(()=>{
        
    }, [servicesChosen])

    const handleSubmit = (event) => {
        setError("");           
        setLoading(false);
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            setLoading(true)
            addCounter(counterNum, servicesChosen)
                .then(() => setLoading(false))
                .catch(res => setError(res.message))
                .finally(() => setLoading(false))
            }

        setCounterNum(0);
        setServicesChosen([]);
        }
  

    useEffect ( () => {
        const getServices = async() => {
            try {
              const allServices = await getAllServices();
              setAllServices(allServices);
            } catch (err) {
              console.error(err.error);        
            }
          }
        getServices().then( () => {
          setLoading(false);
        })
      }, []);

    return (<Container className="justify-content-center pt-5 mt-5">
            <Card className="text-center">
            <Card.Body>
                <Card.Text>
                    If you want to <b>add a new counter</b>, this is the right form.
                </Card.Text>

                <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCounterNumber">
                        <Form.Label>Counter number</Form.Label>
                        <Form.Control placeholder="Enter the counter number"
                            onChange={(x) => setCounterNum(x.target.value)}
                            value={counterNum}
                            required
                        />
                    </Form.Group>  
                </Row>

                <Row className="mb-3">
                    {allServices.map( s => <Service service={s} servicesChosen={servicesChosen} setServicesChosen={setServicesChosen}>  </Service>)}
                </Row>

                <Row className="justify-content-end">
                    {loading && (<Alert variant="info" className="mb-0 mr-1"> Now adding</Alert>)}
                    {error && (<Alert variant="danger" className="mb-0 mr-1"> {error}</Alert>)}
                    <Button variant="outline-dark" type="submit">Add Counter</Button>
                </Row>

                </Form>
            </Card.Body>
            </Card>
        </Container>
    );
}