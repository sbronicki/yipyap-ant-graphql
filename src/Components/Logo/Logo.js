import { Link } from "react-router-dom";
import logo_has_text from "./yip-yap-logo-png-text.png";
import logo_icon_png from "./yip-yap-logo-png.png";

const Logo = ({ hasText }) => {
  const src = hasText ? logo_has_text : logo_icon_png;
  return (
    <Link to="/">
      <img
        className={`logo ${hasText ? "logo-has-text" : "logo-no-text"}`}
        src={src}
        alt="logo image"
      />
    </Link>
  );
};

export default Logo;
