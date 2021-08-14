// React-Bootstrap:
import Button from "react-bootstrap/Button";

function Footer() {
  return (
    <div id="footerDiv">
      <ul>
        {/* 1° linea */}
        <li>
          <span>App creada Por FedeHC para</span>
          <Button variant="link"
                  size="sm"
                  href="https://github.com/FedeHC/SuperHeroes"
                  title="[GitHub] FedeHC- SuperHeroes "
                  target="_blank"
                  rel="noreferrer">Alkemy Challenge Frontend</Button>
        </li>

        {/* 2° linea */}
        <li>
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
        </li>
      </ul>
      <br />
    </div>
  );
}

export default Footer;
