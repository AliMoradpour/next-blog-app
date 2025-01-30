import http from "./httpService";



export async function getCategoryApi(option : any) {
  return http.get("/category/list", option).then(({ data }) => data.data);
}
