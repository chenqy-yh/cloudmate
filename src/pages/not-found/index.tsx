import { useLocation } from "react-router-dom";

const Notfound = () => {
  const location = useLocation();
  console.log("404:", location);
  return <div>404</div>;
};

export default Notfound;
