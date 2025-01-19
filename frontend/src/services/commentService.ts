import http from "./httpService";

export async function createCommentApi(data: any, options: any) {
  return http.post("/comment/add", data , options).then(({ data }) => data.data);
}

export async function getAllCommentsApi(options = {}) {
  return http.get("/comment/list", options).then(({ data }) => data.data);
}
