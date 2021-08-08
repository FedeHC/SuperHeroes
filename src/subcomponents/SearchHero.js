// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Formik/Yup:
import { Formik } from "formik";
import * as yup from "yup";


function SearchHero({ getMainViewHandler }) {
  // Esquema para Yup (con restricciones):
  const schema = yup.object().shape({
    search: yup.string().min(4, "Debe tener 4 o más caracteres de largo.")
                        .max(40, "Debe tener no más de 40 caracteres de largo.")
                        .required("Requerido."),
  });

  // Handlers:
  const getHeroHandler = () => {
    console.log("- ENVIANDO PEDIDO GET A SUPERHEROES API.")
  };

  // JSX:
  return (
    <Row>      
      <Col xs={12} md={{span: 10, offset: 1}}>
        <div id="searchDiv">
          <h1 className="text-center">[Agregar Héroe]</h1>
          <br />

          {/* Componente Formik, necesario para formulario: */}
          <Formik validationSchema={schema}
                  onSubmit={getHeroHandler}
                  initialValues={{ search: "" }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              /* Formulario */
              <Form onSubmit={handleSubmit} noValidate>

                {/* Input Buscar */}
                <Form.Group className="mb-3" controlId="formLoginEmail">
                  <Form.Label>Buscar:</Form.Label>
                  <Form.Control type="text"
                                name="search"
                                placeholder="Ingrese un nombre a buscar (ej.: Batman)"
                                size="lg"
                                onChange={handleChange}
                                value={values.search}                                  
                                isInvalid={!!errors.search}
                                autoFocus />
                  <Form.Control.Feedback type="invalid">
                    {errors.search}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                
                {/* Botón Buscar */}
                  <Button variant="outline-primary"
                          type="submit"
                          size="lg"
                  >Buscar Héroe</Button>

                  <Button variant="outline-secondary"
                          type="input"
                          size="lg"
                          onClick={getMainViewHandler}
                  >Volver a vista principal</Button>

              </Form>
            )}
          </Formik>

          <br />
        </div>
      /</Col>
    </Row>
  );
}

export default SearchHero;
