// React-Bootstrap:
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

// Librerías:
import { useHistory } from "react-router-dom";


function LoginButton({ email, logOutHandler }) {
  // Para usar hook 'useHistory' de react-router:
  let history = useHistory();
  
  return(
    <div id="loginButton">    
      <ButtonGroup>
        <DropdownButton as={ButtonGroup} title={email||""} variant="outline-light" id="bg-nested-dropdown">
          {/* Opciones falsas (deshabilitadas): */}
          <Dropdown.Item eventKey="1" disabled>Perfil</Dropdown.Item>
          <Dropdown.Item eventKey="2" disabled>Opciones</Dropdown.Item>
          <Dropdown.Divider />

          {/* Cerrar sesión: */}
          <Dropdown.Item eventKey="3"
                         onClick={ () => logOutHandler(history)}>Cerrar sesión</Dropdown.Item>

        </DropdownButton>
      </ButtonGroup>
    </div>
  );
}

export default LoginButton;
