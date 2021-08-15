// React-Bootstrap:
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function LoginButton({ email, logOutHandler }) {
  return(
    <div id="loginButton">    
      <ButtonGroup>
        <DropdownButton as={ButtonGroup} title={email} variant="outline-light" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1" disabled>Perfil</Dropdown.Item>
          <Dropdown.Item eventKey="2" disabled>Opciones</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="3" onClick={ () => logOutHandler()}>Cerrar sesión</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </div>
  );
}

export default LoginButton;
