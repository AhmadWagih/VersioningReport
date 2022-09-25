import { Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import VersionRepoertModule from "./Components/VersionReportModule";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Report from "./Components/Report";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<VersionRepoertModule/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
