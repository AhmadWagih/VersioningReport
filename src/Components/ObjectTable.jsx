
const ObjectTable = ({ index, object, outliersOnly }) => {

  return outliersOnly && !object.status ? (
    <></>
  ) : (
    <tr key={object.objectId} className={object.status?"table-danger":"table-light"}>
      <td className="p-2">{index + 1}</td>
      <td>{object.objectId}</td>
      <td>{object.operation}</td>
    </tr>
  );
};

export default ObjectTable;
