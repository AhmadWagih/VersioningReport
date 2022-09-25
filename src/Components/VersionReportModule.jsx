import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { alertError, alertSuccess } from "../helper/toast";
import RegionElement from "./RegionElement";

import classes from "./VersionReport.module.css";

const VersionRepoertModule = () => {
  // state indicates selected fields only
  const [state, setState] = useState({ version: "", level: "Region",region:"1" });
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
    console.log(value,name);
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
            Details Level
          </label>
          <div className={`${classes.radioGroup} btn-group`} role="group" aria-label="Basic radio toggle button group">
          {levels.map((lvl, index) => (
            <>
              <input key={index} type="radio" className="btn-check" name="level" id={lvl} autoComplete="off" value={lvl} onChange={handleChange} checked={lvl===state.level?true:false}/>
              <label className="btn btn-outline-light" htmlFor={lvl} style={{height:40}}><b>{lvl}</b></label>
            </>
            ))}
          </div>
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
