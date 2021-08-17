// React-Bootstrap:
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";


function Footer() {
  return (
    <Container fluid>
      <Row>
        <Col md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}} xxl={{span: 4, offset: 4}}>
          <div id="footerDiv" className="emptyHero">
            {/* 1° linea */}
            <p>
              <span>Creado por FedeHC para el</span>
              <Button variant="link"
                      size="sm"
                      href="https://github.com/FedeHC/SuperHeroes"
                      title="[GitHub] FedeHC- SuperHeroes "
                      target="_blank"
                      rel="noreferrer">Alkemy Challenge Frontend</Button>
              <br />

              {/* 2° linea */}
              <span>Icons made by</span>
              <Button variant="link"
                      size="sm"
                      href="https://www.freepik.com"
                      title="Freepik"
                      target="_blank"
                      rel="noreferrer">Freepik</Button>
              <span>from</span>
              <Button variant="link"
                      size="sm"
                      href="https://www.flaticon.com/"
                      title="Flaticon"
                      target="_blank"
                      rel="noreferrer">www.flaticon.com</Button>
            </p>            
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
