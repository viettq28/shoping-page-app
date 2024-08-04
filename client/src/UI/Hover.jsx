import { Link } from "react-router-dom";

const Hover = ({ children, className, link }) => {
  const classes = {className: `relative after:absolute after:inset-0 after:transition-all hover:after:bg-gray-50 hover:after:opacity-30 ${
    className ? className : ''}`}
  if (!link) return <div {...classes}>{children}</div>
  return <Link to={link} {...classes}>{children}</Link>
  
};
export default Hover;
