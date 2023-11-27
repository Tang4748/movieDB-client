import { useState } from 'react'; //useState hook
import { Form, Button } from 'react-bootstrap'; //importing Form and Button from react-bootstrap
import { CardGroup, Col, Row, Container, Card } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => { //exporting login-view component
    const [username, setUsername] = useState(""); //useState hook to store the state of the username    
    const [password, setPassword] = useState(""); //useState hook to store the state of the password
    
    
    const handleSubmit = (event) => { //handleSubmit function
        event.preventDefault(); //prevents the default refresh of the page

        const data = { //data object
            Username: username, 
            Password: password
        };

        fetch ("https://myflixdb2-49f7e3987c2e.herokuapp.com/login", {
            method: "POST", //POST request
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) //stringifies the data object
        }) 
        .then((response) => response.json())
        .then((data) => {
            console.log("Login Response: ", data); //logs the response
            if (data.user) { //if the user is true, calls the onLoggedIn function
                localStorage.setItem("user", JSON.stringify(data.user)); //stores the user in localStorage
                localStorage.setItem("token", data.token); //stores the token in localStorage
                onLoggedIn(data.user, data.token); //onLoggedIn prop
            } else {
                alert("This user does not exist.");
            }
        }) .catch((error) => {
            console.log(error);
            alert("Something went wrong");
        });
    };

    return (
        <Container className="margin-top-custom">
          <Row className="justify-content-md-center">
            <Col md={5}>
              <CardGroup className="">
                <Card className="mb-5 border border-0">
                  <Card.Body>
                    <Card.Title>Already have an account? Login:</Card.Title>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Label>
                          username:
                          <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                            required
                            placeholder="enter your username"
                          />
                        </Form.Label>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>
                          password:
                          <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                            placeholder="enter your password"
                          />
                        </Form.Label>
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                        className="text-white"
                      >
                        submit
                      </Button>
                    </Form>{" "}
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      );
    };