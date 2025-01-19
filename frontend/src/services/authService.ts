import http from "./httpService";

export const signupApi = async (data: string[]) => {
  return http.post("/user/signup", data).then(({ data }) => data.data);
};

export const signinApi = async (data: string[]) => {
  return http.post("/user/signin", data).then(({ data }) => data.data);
};

export const getUserApi = async (data: string[]) => {
  return http.post("/user/profile").then(({ data }) => data.data);
};

export const getAllUsersApi = async (options : any) => {
  return http.post("/user/list", options).then(({ data }) => data.data);
};
