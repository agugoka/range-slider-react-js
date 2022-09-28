import React from "react";
import Nav from "../../components/Nav/nav";
import Range from "../../components/Range/range";

const Exercise1 = ({ optionsRange }) => {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="container_center">
          <h2>Normal Range:</h2>
          <Range options={[optionsRange[0]?.normalRange]} />
        </div>
      </div>
    </>
  );
};

export default Exercise1;
