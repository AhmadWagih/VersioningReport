import { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { saveVersionReport } from "../APIs/VersioningReport";
import { alertError, alertSuccess } from "../helper/toast";
import DataSetTable from "./DataSetTable";
import classes from "./Report.module.css";

const Report = ({ version,report,reportId,prevPath }) => {
  const [loading, setLoading] = useState({b1:false,b2:false});
  const [filter, setFilter] = useState(true);
  const filterHandler = useCallback(() => {
    setFilter((oldFilter) => !oldFilter);
  }, []);

  const handleErrorsAndPost = useCallback(async() => {
    let countOfErrors = 0;
    report?.forEach((set) => {
      set.fcs?.forEach((fc) => {
        fc.diff?.forEach((object) => {
          if (object.status) {
            countOfErrors++;
          }
        });
      });
    });
    if (countOfErrors === 0) {
      alertError("no errors in this version");
    } else {
      setLoading((loading)=>({...loading, b1:true}));
    }
  }, [/*reportId,*/report]);
  const saveReport = useCallback(async() => {
      setLoading((loading)=>({...loading, b2:true}));
      let {success , message} = await saveVersionReport(reportId)
      success?alertSuccess(message):alertError(message);
      setLoading((loading)=>({...loading, b2:false}));
  }, [reportId]);

  return (
    <>
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.mainTitle}>
          <Link className="d-inline" to={prevPath}>
            <i
              className="fa-solid fa-angles-left"
              style={{ color: "white", paddingRight: "5px", scale: "70%" }}
            ></i>
          </Link>
          {`${version} differences`}
        </div>
        <div className="form-check form-switch d-flex justify-content-end">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={filterHandler}
            checked={filter}
          />
          <label htmlFor="filter d-inline-block ">errors only</label>
        </div>
        <div className={classes.reportContainer}>
          {report?.map((set, index) => (
            <DataSetTable
              key={index}
              index={index}
              dataSet={set}
              outliersOnly={filter}
            />
          ))}
        </div>
        <div className={classes.buttonContainer}>
          <button
            onClick={handleErrorsAndPost}
            className={classes.submitButton}
            disabled={loading.b1}
          >
            Delete errors and Post
            {loading.b1 ? (
              <div className="spinner-div d-inline-block">
                <div
                  className="spinner-border"
                  style={{ height: "20px", width: "20px", marginLeft: "15px" }}
                  role="status"
                ></div>
              </div>
            ) : (
              <></>
            )}
          </button>
          <button onClick={saveReport} className={classes.submitButton} disabled={loading.b2}>
            Save Report
            {loading.b2 ? (
              <div className="spinner-div d-inline-block">
                <div
                  className="spinner-border"
                  style={{ height: "20px", width: "20px", marginLeft: "15px" }}
                  role="status"
                ></div>
              </div>
            ) : (
              <></>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Report;
