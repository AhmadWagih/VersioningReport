import { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DataSetTable from "./DataSetTable";
import classes from "./Report.module.css";

const Report = ({ version, report }) => {
  const [state] = useState(report);
  const [filter, setFilter] = useState(true);
  const filterHandler = useCallback(() => {
    setFilter((oldFilter) => !oldFilter);
  }, []);

  return (
    <>
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.mainTitle}>
          <Link className="d-inline" to={"/"}>
            <i className="fa-solid fa-circle-arrow-left" style={{height:"20px"}}></i>
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
          {state.map((set, index) => (
            <DataSetTable
              key={index}
              index={index}
              dataSet={set}
              outliersOnly={filter}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Report;
