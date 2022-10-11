import { Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import VersioningModule from "./Components/VersioningModule";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/*" element={<VersioningModule/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
