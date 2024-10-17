import http from "./httpService";

export const signupApi = async (data: string[]) => {
  return http.post("/user/signup", data).then(({ data }) => data.data);
};

export const signinApi = async (data: string[]) => {
  return http.post("/user/signin", data).then(({ data }) => data.data);
};