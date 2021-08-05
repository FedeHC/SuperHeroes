import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function LoginForm() {
  // useState:
  const [validated, setValidated] = useState(false);

  // Handler:
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col></Col>

        <Col xs={8} md={6} lg={4}>
          <div id="loginDiv">
            <h1 className="text-center">[ Login ]</h1>
            <br />

            <Form validated={validated}
                  onSubmit={handleSubmit}
                  noValidate>

              <Form.Group className="mb-3" controlId="formLoginEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email"
                              placeholder="Ingrese su email acá"
                              size="lg" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLoginPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password"
                              placeholder="Ingrese su contraseña"
                              size="lg" />
              </Form.Group>

              <br />
              <div className="text-left">
                <Button variant="outline-primary"
                        type="submit"
                        size="lg"
                        id="buttonLogin"
                >Enviar</Button>
              </div>

            </Form>
            <br />
          </div>          
        </Col>
        
        <Col></Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
