import { MainContainer } from "pages/MainContainer/MainContainer";
import { Container } from "react-bootstrap";
import "./App.scss";

function App() {
  return (
    <Container className="App container-xxl pt-5">
      <MainContainer></MainContainer>
    </Container>
  );
}

export default App;
