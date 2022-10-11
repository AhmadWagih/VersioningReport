import client from "./client";
import { alertError, alertSuccess } from "./../helper/toast";
import { DifferenceType } from "../helper/differenceType";
const resource = "/Versions";

export const getVersions = async () => {
  try {
    const { data } = await client.get(resource);
    data.$values.shift();
    return data.$values;
  } catch (error) {
    alertError(error);
  }
};

export const createVersionReport = async (version, level, clipADB) => {
  try {
    const { data } = await client.post(resource + "/createReport", {
      version: version,
      levelOfDetails: level,
      clipADB: clipADB,
    });
    if (typeof data === "string") {
      alertError(data);
    } else {
      return data.$values.map((dataSet) => ({
        name: dataSet.featureDataset.split(".")[dataSet.featureDataset.split(".").length-1],
        fcs: dataSet.changes.$values.map((featureClass) => ({
          name: featureClass.featureClass.split(".")[featureClass.featureClass.split(".").length-1],
          diff: featureClass.changes.$values.map((object) => ({
            objectId: object.objectId,
            operation: DifferenceType[object.differenceType],
            status: object.IsOutMask,
          })),
        })),
      }));
    }
  } catch (error) {
    alertError(error);
  }
};

export const saveVersionReport = async (report) => {
  try {
    const message = await client.get(resource, report).data;
    alertSuccess(message);
  } catch (error) {
    alertError(error);
  }
};

export const editVersion = async (id, edittedReport) => {
  try {
    const message = await client.put(resource + id, edittedReport).data;
    alertSuccess(message);
  } catch (error) {
    alertError(error);
  }
};
export const deleteVersion = async (id) => {
  try {
    const message = await client.delete(resource + id).data;
    alertSuccess(message);
  } catch (error) {
    alertError(error);
  }
};
