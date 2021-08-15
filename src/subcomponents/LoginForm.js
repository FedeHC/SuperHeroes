// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Librerías y demás:
import { Formik } from "formik";
import * as yup from "yup";
import logo from "../assets/images/superhero-64.png";


function LoginForm({ getTokenHandler, errorMessage }) {
  // Esquema para Yup (con restricciones):
  const schema = yup.object().shape({
    email: yup.string().min(4, "Debe tener 4 o más caracteres de largo.")
                       .max(40, "No debe tener más de 40 caracteres de largo.")
                       .required("Requerido."),
    password: yup.string().min(4, "Debe tener 4 o más caracteres de largo.")
                          .max(40, "No debe tener más de 40 caracteres de largo.")
                          .required("Requerido."),
  });

  // JSX:
  return (
    <Container fluid>
      <Row>
        {/* Columna con contenido */}
        <Col xs={{span: 8, offset: 2}} md={{span: 6, offset: 3}} xl={{span: 4, offset: 4}}>
          <div id="loginDiv">
            {/* Logo y Título */}
            <div className="text-center">
              <Image src={logo}
                    id="imageLogo"
                    alt="Logo" />

              <h1 id="loginTitle">[ Login ]</h1>
            </div>
            <br />

            {/* Componente Formik, necesario para formulario: */}
            <Formik validationSchema={schema}
                    onSubmit={getTokenHandler}
                    initialValues={{ email: "", password: "" }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                /* Formulario */
                <Form onSubmit={handleSubmit} noValidate >

                  {/* Email */}
                  <Form.Group className="mb-3" controlId="formLoginEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email"
                                  name="email"
                                  placeholder="Ingrese su email acá"
                                  size="lg"
                                  onChange={handleChange}
                                  value={values.email}                                  
                                  isInvalid={!!errors.email}
                                  autoFocus />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Contraseña */}
                  <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control type="password"
                                  name="password"
                                  placeholder="Ingrese su contraseña"
                                  size="lg"
                                  onChange={handleChange}
                                  value={values.password}
                                  isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Mensaje de error, si se envía email y/o contraseña incorrectas */}
                  {errorMessage &&
                    <p id="errorMessage">El mail y/o la contraseña enviadas no son válidas.</p>
                  }

                  {/* Si no hay mensaje de error, simplemente agregar salto. */}
                  {!errorMessage && 
                    <br />
                  }
                  
                  {/* Boton Enviar */}
                  <div className="text-left">
                    <Button variant="outline-primary"
                            type="submit"
                            size="lg"
                    >Enviar</Button>
                  </div>
                </Form>
              )}
            </Formik>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
