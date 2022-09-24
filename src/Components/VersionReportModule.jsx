import { useCallback, useEffect, useState } from "react";
import classes from "./VersionReport.module.css";

const VersionRepoertModule = () => {
  const [state, setState] = useState({ version: "", level: "Region" });
  const [versions, setVersions] = useState([]);
  const [levels] = useState([
    "Regional",
    "Governrate",
    "Markaz",
    "Municipality",
    "Shiakha",
  ]);
  const [ADB, setADB] = useState();
  useEffect(() => {
    // call backend
    const regesteredVersions = ["version1", "version2", "version3"];
    const readADB = {reg:[],gvr:[],mrk:[],mun:[],shk:[]};
    setVersions(regesteredVersions);
    setADB(readADB);
  }, []);

  const handleChange = useCallback((e) => {
    const { value, name } = e.target;
    setState((u) => ({ ...u, [name]: value }));
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.mainTitle}>Create Versioning report</div>
        <div className={classes.row}>
          <label className="label-dark" htmlFor="version">
            Select Version
          </label>
          <select
            onChange={handleChange}
            name="version"
            id="version"
            className={classes.selectVersion}
            value={state.version}
          >
            {versions.length === 0 ? (
              <option>no Versions is defined</option>
            ) : (
              versions.map((ver, index) => <option key={index} value={ver}>{ver}</option>)
            )}
          </select>
          <label className="label-dark" htmlFor="level">
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
              <option key={index} value={lvl}>{lvl}</option>
            ))}
          </select>
            {/* {
                for i = 1:state.level.length

                end
            } */}
          <label className="label-dark" htmlFor="reg">
            Region
          </label>
          <select
            onChange={handleChange}
            name="level"
            id="level"
            className={classes.selectVersion}
            value={state.level}
          >
            {levels.map((lvl, index) => (
              <option key={index}>{lvl}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default VersionRepoertModule;
