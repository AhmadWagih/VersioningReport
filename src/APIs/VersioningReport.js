import client from "./client";
import { alertError, alertSuccess } from "./../helper/toast";
const resource = "/versions";

export const getVersions = async () => {
  try {
    const { data } = await client.get(resource);
    return data;
  } catch (error) {
    alertError(error);
  }
};

export const createVersionReport = async(version ,level , clipADB)=>{
    try {
        const { data } = await client.get(resource, {version,level,clipADB})
        return data;
    } catch (error) {
        alertError(error);
    }
}

export const saveVersionReport = async(report)=>{
    try {
        const message = await client.get(resource, report).data
        alertSuccess(message)
    } catch (error) {
        alertError(error);
    }
}

export const editVersion = async(id , editReport)=>{
    try {
        const message = await client.put(resource+id,edittedReport).data
        alertSuccess(message)
    } catch (error) {
        alertError(error);
    }
}
export const deleteVersion = async(id )=>{
    try {
        const message = await client.delete(resource+id).data
        alertSuccess(message)
    } catch (error) {
        alertError(error);
    }
}