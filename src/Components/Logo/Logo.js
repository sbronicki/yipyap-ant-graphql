import { Link } from "react-router-dom";
import logo_has_text from "./yip-yap-logo-png-text.png";
import logo_icon_png from "./yip-yap-logo-png.png";

const Logo = ({ hasText, size }) => {
  const src = hasText ? logo_has_text : logo_icon_png;

  return (
    <Link to="/">
      <img
        className={`logo logo-${size} ${
          hasText ? "logo-has-text" : "logo-no-text"
        }`}
        src={src}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
