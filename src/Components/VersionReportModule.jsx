import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { alertError, alertSuccess } from "../helper/toast";
import RegionElement from "./RegionElement";

import classes from "./VersionReport.module.css";

const VersionRepoertModule = () => {
  // state indicates selected fields only
  const [state, setState] = useState({ version: "", level: "Region",region:"" });
  // version , levels and ADB never changes 
  const [versions, setVersions] = useState([]);
  const [levels] = useState([
    "Region",
    "Governrate",
    "Markaz",
    "Municipality",
    "Shiakha",
  ]);
  const Navigate = useNavigate();
  const [ADB, setADB] = useState({
    Region: [],
    Governrate: [],
    Markaz: [],
    Municipality: [],
    Shiakha: [],
  });

  // read data from backend
  useEffect(() => {
    // call backend
    const regesteredVersions = ["version1", "version2", "version3"];
    const readADB = {
      Region: ["1", "2", "3", "4", "5", "6"],
      Governrate: ["Cairo", "Giza", "Alex", "Gharbia", "Qalubia"],
      Markaz: ["zefta", "santa"],
      Municipality: [],
      Shiakha: [],
    };
    setVersions(regesteredVersions);
    setADB(readADB);
    console.log();
  }, []);

  // filter small with large
  useEffect(()=>{
    // const {Region,Governrate,Markaz,Municipality,Shiakha}=state
    // Filter fields to those only exist
  },[state,ADB])

  const handleChange = useCallback((e) => {
    const { value, name } = e.target;
    setState((u) => ({ ...u, [name]: value }));
  }, []);

  // submit
  const handleVersionReport = useCallback(() => {
    console.log(state);
    if (state.version==="") {
      alertError("Please Choose a version")
    }else{
      // call backend 
      alertSuccess(`report is created on version ${state.version}`)
      Navigate("/report")
    }
  }, [state,Navigate]);

  return (
    <>
    <ToastContainer/>
      <div className={classes.container}>
        <div className={classes.mainTitle}>Create Versioning report</div>
        <div className={classes.row}>
          <label className={classes.labelText} htmlFor="version">
            Select Version
          </label>
          <select
            onChange={handleChange}
            name="version"
            id="version"
            className={classes.selectVersion}
            value={state.version}
          >
            <option value={""} hidden disabled>
              Select Version
            </option>
            {versions?.map((ver, index) => (
              <option key={index} value={ver}>
                {ver}
              </option>
            ))}
          </select>
          <label className={classes.labelText} htmlFor="level">
            Search Level
          </label>
          <select
            onChange={handleChange}
            name="level"
            id="level"
            className={classes.selectVersion}
            value={state.level}
          >
            {levels.map((lvl, index) => (
              <option key={index} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          {levels
            .slice(0, levels.indexOf(state.level) + 1)
            .map((level, index) => {
              return (
                <RegionElement
                  key={index}
                  labelText={level}
                  selectionName={level}
                  selectedOption={state[level]||ADB[level][0]}
                  options={ADB[level]}
                  handleChange={handleChange}
                />
              );
            })}
          <button
            onClick={handleVersionReport}
            className={classes.submitButton}
          >
            Create Version report
          </button>
        </div>
      </div>
    </>
  );
};

export default VersionRepoertModule;
