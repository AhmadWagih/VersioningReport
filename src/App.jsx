import { Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import VersionRepoertModule from "./Components/VersionReportModule";

import "./App.css";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<VersionRepoertModule/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
