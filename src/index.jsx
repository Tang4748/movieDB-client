import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
// Import statement to indicate that you need to bundle `./index.scss`
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss"; 


// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container style={{border: "5px solid purple"}}>
      <MainView />
    </Container>
  )
};

// Find the root of our app
const container = document.querySelector("#root");
const root = createRoot(container);
// Tell React to render the app in the root DOM element
root.render(<MyFlixApplication />);
