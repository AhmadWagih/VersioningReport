import classes from "./VersionReport.module.css";

const RegionElement = ({ labelText,selectionName, options,selectedOption, handleChange }) => {
  return (
    <div key ={selectionName} className={classes.regionDev}>
      <label className={classes.labelText} htmlFor={selectionName}>
        {labelText}
      </label>
      <select
        onChange={handleChange}
        name={selectionName}
        id={selectionName}
        className={classes.selectRegion}
        value={selectedOption}
      >
        {options?.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionElement;
