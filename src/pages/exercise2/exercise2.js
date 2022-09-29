import React, { useEffect } from "react";
import Range from "../../components/Range/range";
import { useLocation, useNavigate } from "react-router-dom";

const Exercise2 = ({ optionsRange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(location.pathname);
  }, []);
  return (
    <div className="container">
      <div className="container_center">
        <h2>Fixed Values Range:</h2>
        <Range options={[optionsRange[0]?.fixedRange]} />
      </div>
    </div>
  );
};

export default Exercise2;
