import { alertError } from "../helper/toast";
import client from "./client";
const resource = "/ADBs";

export const getADB = async (refresh = false) => {
  try {
    const { data } = await client.get(
      refresh ? resource + `?refresh=true` : resource
    );
    if (typeof data === "string") {
      alertError(data);
    } else {
      const ADBs = data.$values.map((reg) => ({
        name: reg.name,
        governs: reg.districts?.$values.map((gov) => ({
          name: gov.name,
          marakez: gov.districts?.$values.map((markaz) => ({
            name: markaz.name,
            muns: markaz.districts?.$values.map((mun) => ({
              name: mun.name,
              shiakhas: mun.districts?.$values.map((shiakha) => ({
                name: shiakha.name,
              })),
            })),
          })),
        })),
      }));
      return ADBs;
    }
  } catch (err) {
    if (err.response.data) {
      alertError(err.response.data);
    } else {
      alertError(err.message);
    }
  }
};
