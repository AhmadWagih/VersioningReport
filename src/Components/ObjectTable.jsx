
const ObjectTable = ({ index, object, outliersOnly }) => {

  return outliersOnly && object.status ? (
    <></>
  ) : (
    <tr className={object.status?"table-light":"table-danger"}>
      <td className="p-2">{index + 1}</td>
      <td>{object.objectId}</td>
      <td>{object.operation}</td>
    </tr>
  );
};

export default ObjectTable;
