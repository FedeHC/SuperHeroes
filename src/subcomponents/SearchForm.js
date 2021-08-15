// React-Bootstrap:
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Librerías:
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";


function SearchForm({ getMainViewHandler, searchHeroHandler }) {
  // Para usar hook 'useHistory' de react-router:
  let history = useHistory();

  // Esquema para Yup (con restricciones):
  const schema = yup.object().shape({
    search: yup.string().min(2, "Debe tener al menos 2 o más caracteres.")
                        .max(40, "Debe tener no más de 40 caracteres.")
                        .required("Requerido."),
  });

  // JSX:
  return (
    <Row>      
      <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
        {/* Componente Formik, necesario para formulario: */}
        <Formik validationSchema={schema}
                onSubmit={searchHeroHandler}
                initialValues={{ search: "" }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            /* Formulario */
            <Form onSubmit={handleSubmit} noValidate> 

              {/* Input Buscar */}
              <Form.Group className="mb-3 searchFormGroup" controlId="formLoginEmail">
                <Form.Label>Buscar por nombre:</Form.Label>
                <Form.Control type="text"
                              name="search"
                              placeholder="Ej: batman"
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
                <div className="text-center">
                  <Button variant="outline-primary"
                          type="submit"
                          size="lg"
                  >Buscar Héroe</Button>

                  <Button variant="outline-dark"
                          type="input"
                          size="lg"
                          onClick={ () => getMainViewHandler(history)}
                  >Volver a principal</Button>
                </div>

            </Form>
          )}
        </Formik>

        <br />
      </Col>
    </Row>
  );
}

export default SearchForm;
