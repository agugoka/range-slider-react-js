import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Range from "../../components/Range/range";

const Exercise1 = ({ optionsRange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    navigate(location.pathname);
  }, [])
  return (
    <div className="container">
      <div className="container_center">
        <h2>Normal Range:</h2>
        <Range options={[optionsRange[0]?.normalRange]} />
      </div>
    </div>
  );
};

export default Exercise1;
