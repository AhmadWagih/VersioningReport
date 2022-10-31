import client from "./client";
import { alertError, alertSuccess } from "./../helper/toast";
import { DifferenceType } from "../helper/differenceType";
const resource = "/Versions";

export const getVersions = async () => {
  try {
    const { data } = await client.get(resource);
    data.$values.shift();
    return data.$values;
  } catch (err) {
    if (err.response.data) {
      alertError(err.response.data);
    } else {
      alertError(err.message);
    }
  }
};

export const createVersionReport = async (version, level, clipADB) => {
  try {
    const response = await client.post(resource + "/createReport", {
      version: version,
      levelOfDetails: level,
      clipADB: clipADB,
    });
    if (response.status === 400) {
      return { success: false, message: response.data };
    } else {
      const report = response.data.changes.$values.map((dataSet) => ({
        name: dataSet.featureDataset.split(".")[
          dataSet.featureDataset.split(".").length - 1
        ],
        fcs: dataSet.changes.$values.map((featureClass) => ({
          name: featureClass.featureClass.split(".")[
            featureClass.featureClass.split(".").length - 1
          ],
          diff: featureClass.changes.$values.map((object) => ({
            objectId: object.objectId,
            operation: DifferenceType[object.differenceType],
            status: object.isOutMask,
          })),
        })),
      }));
      return { success: true, report, reportId: response.data.id };
    }
  } catch (err) {
    if (err.response.data) {
      alertError(err.response.data);
    } else {
      alertError(err.message);
    }
    return { success: false };
  }
};

export const saveVersionReport = async (id) => {
  try {
    const response = await client.post(resource + `/saveReport/${id}`);
    if (response.status === 400) {
      return { success: false, message: "database error" };
    } else {
      return { success: true, message: "Report is saved succesfully" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editVersion = async (id, edittedReport) => {
  try {
    const message = await client.put(resource + id, edittedReport).data;
    alertSuccess(message);
  } catch (error) {
    alertError(error.message);
  }
};
export const deleteVersion = async (id) => {
  try {
    const message = await client.delete(resource + id).data;
    alertSuccess(message);
  } catch (error) {
    alertError(error.message);
  }
};
export const getReports = async (isAdmin) => {
  try {
    const { data } = await client.get(
      isAdmin ? resource + "/getAllReports" : resource + "/getMyReports"
    );
    return data.$values.map((report) => ({
      id: report.id,
      version: report.version,
      levelOfDetails: report.levelOfDetails,
      clipADB: report.clipADB,
      user: report.user,
      createdOn: report.createdOn,
      changes: report.changes.$values.map((dataSet) => ({
        name: dataSet.featureDataset.split(".")[
          dataSet.featureDataset.split(".").length - 1
        ],
        fcs: dataSet.changes.$values.map((featureClass) => ({
          name: featureClass.featureClass.split(".")[
            featureClass.featureClass.split(".").length - 1
          ],
          diff: featureClass.changes.$values.map((object) => ({
            objectId: object.objectId,
            operation: DifferenceType[object.differenceType],
            status: object.isOutMask,
          })),
        })),
      })),
    }));
  } catch (err) {
    if (err.response.data) {
      alertError(err.response.data);
    } else {
      alertError(err.message);
    }
  }
};
