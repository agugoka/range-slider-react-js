import React, { useEffect, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { shortFetch } from "./utils/fetch.utils.js";

import { EXERCISE1, EXERCISE2, BACKEND } from "./routers/router";

import Exercise1 from "./pages/exercise1";
import Exercise2 from "./pages/exercise2";

export default function App() {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    shortFetch({
      url: BACKEND,
      method: "GET",
      onSuccess: (dataOptions) => {
        setFetchData(dataOptions);
        return true;
      },
      onError: () => {
        alert("There was an error retrieving data!");
      },
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to={EXERCISE1} />} />
          <Route
            path={EXERCISE1}
            element={<Exercise1 optionsRange={fetchData} />}
          />
          <Route
            path={EXERCISE2}
            element={<Exercise2 optionsRange={fetchData} />}
          />
          <Route path="*" element={<Navigate replace to={EXERCISE1} />} />
        </Routes>
      </Router>
    </>
  );
}
