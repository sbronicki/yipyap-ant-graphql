import tempBanner from "../Logo/yipyaplogobanner.png";

const Banner = ({ src }) => {
  return <img className="banner" src={src || tempBanner} alt="banner" />;
};

export default Banner;
