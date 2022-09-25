import ObjectTable from "./ObjectTable";
import classes from "./Report.module.css";

const DataSetTable = ({ index, dataSet, outliersOnly }) => {
  return (
    <>
      <div className={classes.secTitle}>{`${index + 1}) ${dataSet.name} `}</div>
      {dataSet.fcs.map((featureClass, i) => (
        <div key={i}>
          <div className={classes.fcTitle}>{` ${i + 1}) ${
            featureClass.name
          } `}</div>
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-light">
                <th scope="col">#</th>
                <th scope="col">Object Id</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              {featureClass.diff.map((object, i) => (
                <ObjectTable
                  key={i}
                  index={i}
                  object={object}
                  outliersOnly={outliersOnly}
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default DataSetTable;
