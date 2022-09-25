import { useCallback } from "react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DataSetTable from "./DataSetTable";
import classes from "./Report.module.css";

const Report = () => {
  const [state, setState] = useState({ dataSets: [] });
  const [version, setVersion] = useState("");
  const [filter, setFilter] = useState(true);
  useEffect(() => {
    //callBackend
    const sentReport = {
      dataSets: [
        {
          name: "local",
          fcs: [
            {
              name: "roads",
              diff: [
                { objectId: 1,operation: "insert", status: true },
                { objectId: 10,operation: "insert", status: true },
                { objectId: 3,operation: "update", status: true },
                { objectId: 1,operation: "update", status: true },
                { objectId: 5,operation: "delete", status: false },
              ],
            },
          ],
        },
        {
          name: "utilites",
          fcs: [
            {
              name: "water_lines",
              diff: [
                { objectId: 1,operation: "insert", status: true },
                { objectId: 10,operation: "insert", status: true },
                { objectId: 3,operation: "update", status: true },
                { objectId: 1,operation: "update", status: true },
                { objectId: 5,operation: "delete", status: false },
              ],
            },
          ],
        },
      ],
    };
    const version = "version1";
    setState(sentReport);
    setVersion(version);
  }, []);

  const filterHandler = useCallback(()=>{
    setFilter((oldFilter)=>!oldFilter)
  },[])

  return (
    <>
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.mainTitle}>{`${version} differences`}</div>
        <div className="form-check form-switch d-flex justify-content-end">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={filterHandler}
            checked={filter}
          />
          <label htmlFor="filter d-inline-block ">
            errors only 
          </label>
        </div>
        <div className={classes.reportContainer}>
          {state.dataSets.map((set, index) => (
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
