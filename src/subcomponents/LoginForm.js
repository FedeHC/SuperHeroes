// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Formik/Yup:
import { Formik } from "formik";
import * as yup from "yup";


function LoginForm({ getTokenHandler }) {

  // Esquema para Yup con restricciones:
  const schema = yup.object().shape({
    email: yup.string().min(4, "Debe tener 4 o más caracteres de largo.")
                       .max(40, "Debe tener no más de 50 caracteres de largo.")
                       .required("Requerido."),
    password: yup.string().min(4, "Debe tener 4 o más caracteres de largo.")
                          .max(40, "Debe tener no más de 50 caracteres de largo.")
                          .required("Requerido."),
  });

  // JSX:
  return (
    <Container fluid>
      <Row>
        <Col></Col>

        {/* Columna con contenido */}
        <Col xs={8} md={6} lg={4}>
          <div id="loginDiv">
            <h1 className="text-center">[ Login ]</h1>
            <br />

            {/* Compoinente Formik, necesario para formulario: */}
            <Formik validationSchema={schema}
                    onSubmit={getTokenHandler}
                    initialValues={{ email: "", password: "" }}
            >
              {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
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
                                  isInvalid={!!errors.email} />
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

                  <br />
                  
                  {/* Boton Enviar */}
                  <div className="text-left">
                    <Button variant="outline-primary"
                            type="submit"
                            size="lg"
                            id="buttonLogin"
                    >Enviar</Button>
                  </div>
                </Form>
              )}
            </Formik>

            <br />
          </div>
        </Col>

        <Col></Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
