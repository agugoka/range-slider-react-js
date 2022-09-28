import React from "react";
import Nav from "../../components/Nav/nav";
import Range from "../../components/Range/range";

const Exercise2 = ({ optionsRange }) => {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="container_center">
          <h2>Fixed Values Range:</h2>
          <Range options={[optionsRange[0]?.fixedRange]} />
        </div>
      </div>
    </>
  );
};

export default Exercise2;
