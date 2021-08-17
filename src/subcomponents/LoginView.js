// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Librerías y demás:
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import logo from "../assets/images/superhero-64.png";


function LoginView({ getTokenHandler, errorMessage }) {
  // Para usar hook 'useHistory' de react-router:
  let history = useHistory();

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
        <Col md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}} xxl={{span: 4, offset: 4}}>
          <Row id="loginDiv" className="emptyHero">
            <Col xs={{span: 10, offset: 1}}>
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
                      onSubmit={(form)=> getTokenHandler(form, history)}
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
                                    placeholder="Ingrese su email"
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

                    {/* Mensaje de error: */}
                    {errorMessage &&
                      <p id="errorMessage">{checkErrorAndGiveAResponse(errorMessage)}</p>
                    }

                    {/* Si no hay mensaje de error, simplemente agregar salto. */}
                    {!errorMessage && <br />}
                    
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
              
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

// Función auxiliar que recibe un string o entero de error como parámetro y devuelve un
// string de mensaje de error para ser mostrado a usuario.
function checkErrorAndGiveAResponse(error) {
  switch(error) {
    case 401:
      return "El mail y/o la contraseña enviadas no son válidas (error 401).";
    case 403:
      return "Se enviaron los datos pero el servidor no autoriza el pedido (error 403)"
    case 404:
      return "No se encuentra el sitio (error 404)."
    case 429:
      return "Demasiadas solicitudes realizadas. Intente más tarde (error 429)."
    case undefined:
    case null:
    case "":
      return "Ha sucedido un error inesperado al enviar datos (error no recibido)."
    default:
      return `Ha sucedido un error inesperado al enviar datos (error ${error}).`;
  }
}

export default LoginView;
