import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "../APIs/VersioningReport";
import classes from "./Report.module.css";

const MyReports = ({ isAdmin ,setReport,setPrevPath}) => {
  useEffect(() => {
    (async () => {
      const reports = await getReports(isAdmin);
      setReports(reports);
    })();
  }, [isAdmin]);
  const [reports, setReports] = useState();
  const [levels] = useState([
    "Region",
    "Governrate",
    "Markaz",
    "Municipality",
    "Shiakha",
  ]);
  const Navigate = useNavigate();
  const handleClick = (index) => {
    let report=reports[index];
    setReport({
      version: report.version,
      reportId: report.id,
      report: report.changes,
    });
    setPrevPath("/myReports")
    Navigate(`/report`);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.mainTitle}>{isAdmin?"All":"Your"} Reports</div>
        <table className="table table-striped table-hover">
          <thead>
            <tr className="table-light">
              <th scope="col">#</th>
              <th scope="col">Version</th>
              <th scope="col">Clipping Level</th>
              <th scope="col">Zone</th>
              {isAdmin ? <th scope="col">Owner</th> : null}
              <th scope="col">Date of Creation</th>
              <th scope="col">Time of Creation</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((rep, index) => (
                <tr key={index} className=" clickable-row table-light"onClick={()=>handleClick(index)} >
                  <td className="p-2">{index + 1}</td>
                  <td>{rep.version}</td>
                  <td>{levels[rep.levelOfDetails]}</td>
                  <td>{rep.clipADB}</td>
                  {isAdmin ? <td>{rep.user}</td> : null}
                  <td>{rep.createdOn.split("T")[0]}</td>
                  <td>{rep.createdOn.split("T")[1].split(".")[0]}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyReports;
