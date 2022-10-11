import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import VersionForm from "./VersionForm";
import Report from "./Report";

const VersioningModule = () => {
  const [VersionReport, setVersionReport] = useState({
    version: null,
    report: null,
  });
  const [formState, setFormState] = useState({
    version: "",
    level: "Region",
    loading: false,
  });

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <VersionForm
            setVersionReport={setVersionReport}
            formState={formState}
            setFormState={setFormState}
          />
        }
      />
      <Route
        path="/report"
        element={
          <Report
            version={VersionReport.version}
            report={VersionReport.report}
          />
        }
      />
    </Routes>
  );
};

export default VersioningModule;
