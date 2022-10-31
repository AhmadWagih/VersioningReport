import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import VersionForm from "./VersionForm";
import Report from "./Report";
import MyReports from "./MyReports";

const VersioningModule = ({isAdmin}) => {
  const [VersionReport, setVersionReport] = useState({
    version: null,
    report: null,
    reportId:null
  });
  const [prevPath,setPrevPath]=useState("/");
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
            setPrevPath={setPrevPath}
          />
        }
      />
      <Route path="/myReports" element={<MyReports setReport={setVersionReport} setPrevPath={setPrevPath} />} />
      {isAdmin?<Route path="/allReports" element={<MyReports isAdmin={isAdmin} setReport={setVersionReport} setPrevPath={setPrevPath} />} />:<></>}
      <Route
        path={`/report`}
        element={
          <Report
            version={VersionReport.version}
            report={VersionReport.report}
            reportId={VersionReport.reportId}
            prevPath={prevPath}
          />
        }
      />
    </Routes>
  );
};

export default VersioningModule;
