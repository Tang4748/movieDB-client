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
        <Container>
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <CardGroup>
                        <Card className="mb-5">
                            <Card.Title>
                                Please Login:
                            </Card.Title>
                        </Card>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your username" 
                                    value={username} //value prop
                                    onChange={(e) => setUsername(e.target.value)} //onChange event handler
                                    required
                                    minLength= "3"
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password} //value prop
                                        onChange={(e) => setPassword(e.target.value)} //onChange event handler
                                        required
                                        minLength="5"
                                    />
                                </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </Form>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
);
}