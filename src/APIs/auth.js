import { alertError, alertSuccess } from "../helper/toast";
import client from "./client";

const resource = "/Authentications";

export const RegisterUser = async (user, email, pwd) => {
  try {
    const response = await client.post(resource + "/register", {
      username: user,
      email: email,
      password: pwd,
    });
    alertSuccess("New User has been created");
    return response;
  } catch (err) {
    if (!err?.response) {
      alertError("server Error");
    } else alertError(err.response.data.message);
  }
};

export const LoginUser = async (user, pwd) => {
  try {
    const { data } = await client.post(resource + "/login", {
      username: user,
      password: pwd,
    });
    alertSuccess("You are Logged In");
    return {
      token: data.token,
      role: data.role,
      expirationDate: data.expiration,
    };
  } catch (err) {
    if (err.response.data) {
      alertError(err.response.data);
    } else {
      alertError(err.message);
    }
  }
};
