import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import VersioningModule from "./Components/VersioningModule";
import Register from "./Components/Register";
import useToken from "./helper/useToken";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import NotFound from "./Components/NotFound";


function App() {
  const { token, role, setToken } = useToken();
  if (!token) {
    return (
      <>
        <Routes>
          <Route exact path="/" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route exact path="/*" element={<VersioningModule isAdmin={role==="Admin"?true:false}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route element={<Navigate to="/notfound" />} />
        </Routes>
      </>
    );
  }
}

export default App;
