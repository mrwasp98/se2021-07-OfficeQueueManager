import { Navbar } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";

export default function MyNav(props) {

  return (
    <>
      <Navbar className="pr-2 justify-content-between" variant="dark" bg="dark" fixed="top" expand="sm">
        <Navbar.Brand href="" >
          <Icons.Mailbox2 size="1.2em" className="mr-2 " /> Office Queue Management
        </Navbar.Brand>
        <Navbar.Text>Made by team 07 </Navbar.Text>
      </Navbar>
    </>
  );
}