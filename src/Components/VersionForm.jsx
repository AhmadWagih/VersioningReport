import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { alertError, alertSuccess } from "../helper/toast";
import RegionElement from "./RegionElement";
import { getVersions, createVersionReport } from "../APIs/VersioningReport";
import { getADB } from "../APIs/ADB";

import classes from "./VersionReport.module.css";

const VersionForm = ({ setVersionReport,setFormState,formState }) => {
  // version , levels and ADB never changes
  const [versions, setVersions] = useState();
  const [levels] = useState([
    "Region",
    "Governrate",
    "Markaz",
    "Municipality",
    "Shiakha",
  ]);

  // ADB is the large object from back end including all regions, governs, etc
  const [ADB, setADB] = useState();

  // state indicates selected fields only
  const [state, setState] = useState(formState);

  //  the ADBs shown in the options of the select
  const [visibleADB, setVisibleADB] = useState({
    Region: [],
    Governrate: [],
    Markaz: [],
    Municipality: [],
    Shiakha: [],
  });

  const Navigate = useNavigate();

  // read data from backend
  useEffect(() => {
    (async () => {
      const regesteredVersions = await getVersions();
      const readADB = await getADB();
      setVersions(regesteredVersions);
      setADB(readADB);
      setState((state) => ({ ...state, Region: readADB[0].name }));
      filterADB("Region", readADB);
    })();
  }, []);

  // filter small fields with large and set default values
  const filterADB = useCallback(
    (level, readADB = ADB) => {
      const Region =
        readADB?.filter((reg) => reg.name === state.Region)[0] || readADB[0];
      const Govern =
        Region?.governs?.filter((gov) => gov.name === state.Governrate)[0] ||
        Region.governs[0];
      const Markaz =
        Govern?.marakez?.filter((gov) => gov.name === state.Markaz)[0] ||
        Govern?.marakez[0];
      const Mun =
        Markaz?.muns?.filter((gov) => gov.name === state.Municipality)[0] ||
        Markaz?.muns[0];

      const filteredADB = {
        Region: readADB.map((region) => region.name),
        Governrate: Region.governs?.map((gov) => gov.name),
        Markaz: Govern.marakez?.map((gov) => gov.name),
        Municipality: Markaz?.muns?.map((gov) => gov.name),
        Shiakha: Mun?.shiakhas.map((gov) => gov.name),
      };
      let newState = {};
      switch (level) {
        case "Region":
          newState.Governrate = filteredADB.Governrate[0];
        case "Governrate":
          newState.Markaz = filteredADB.Markaz[0] ? filteredADB.Markaz[0] : "";
        case "Markaz":
          newState.Municipality = filteredADB.Municipality
            ? filteredADB.Municipality[0]
            : "";
        case "Municipality":
          newState.Shiakha = filteredADB.Shiakha ? filteredADB.Shiakha[0] : "";
          break;
        default:
          break;
      }
      setState((state) => ({ ...state, ...newState }));
      setVisibleADB(filteredADB);
    },
    [state, ADB]
  );

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      if (
        name === "Region" ||
        name === "Governrate" ||
        name === "Markaz" ||
        name === "Municipality"
      ) {
        state[name] = value;
        filterADB(name);
      } else {
        setState((state) => ({ ...state, [name]: value }));
      }
    },
    [filterADB, state]
  );

  // submit
  const handleVersionReport = useCallback(() => {
    if (state.version === "") {
      alertError("Please Choose a version");
    } else if (state[state.level] === "") {
      alertError(`Please Choose ${state.level} or change the Details level`);
    } else {
      (async () => {
        setState(state=>({...state,loading:true}))
        let report = await createVersionReport(
          state.version,
          levels.indexOf(state.level),
          state[state.level]
        );
        console.log(
          state.version,
          levels.indexOf(state.level),
          state[state.level]
        );
        if (report) {
          setVersionReport({ version: state.version, report });
          setFormState({...state,loading:false})
          alertSuccess(`report is created for ${state.version}`);
          Navigate("/report");
        }else{
          setState(state=>({...state,loading:false}))
        }
      })();
    }
  }, [state,Navigate ,levels,setVersionReport,]);

  return (
    <>
      <ToastContainer />
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
          <div
            className={`${classes.radioGroup} btn-group`}
            role="group"
            aria-label="Basic radio toggle button group"
          >
            {levels.map((lvl, index) => (
              <>
                <input
                  key={index}
                  type="radio"
                  className="btn-check"
                  name="level"
                  id={lvl}
                  autoComplete="off"
                  value={lvl}
                  onChange={handleChange}
                  checked={lvl === state.level ? true : false}
                />
                <label
                  className="btn btn-outline-light"
                  htmlFor={lvl}
                  style={{ height: 40 }}
                >
                  <b>{lvl}</b>
                </label>
              </>
            ))}
          </div>
          {levels.slice(0, levels.indexOf(state.level) + 1).map((level) => {
            return (
              <RegionElement
                key={level}
                labelText={level}
                selectionName={level}
                selectedOption={state[level]}
                options={visibleADB[level]}
                handleChange={handleChange}
              />
            );
          })}
          <button
            onClick={handleVersionReport}
            className={classes.submitButton}
          >
            Create Version report
            {state.loading?<div className="spinner-div d-inline-block">
              <div className="spinner-border" style={{height:"20px",width:"20px",marginLeft:"15px"}} role="status">
              </div>
            </div>:<></>}
          </button>
        </div>
      </div>
    </>
  );
};

export default VersionForm;
