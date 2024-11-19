import * as axios from "axios";

const instanse = axios.create({
  withCredentials: true,
  baseURL: "https://snp-tests.herokuapp.com/api/v1/",
  headers: {
    "scope-key": "jUnjhQ94GA3JNyHH",
  },
});

export const authApi = {
  signin(params) {
    console.log(params);
    return instanse.post("signin", params).then((response) => {
      return response.data;
    });
  },
  signup(params) {
    return instanse.post("signup", params).then((response) => {
      return response.data;
    });
  },
  getCurrentUser() {
    return instanse.get("users/current").then((response) => {
      return response.data;
    });
  },
  logout() {
    return instanse.delete("logout").then((response) => {
      return response.data;
    });
  },
};
export const testApi = {
  getTestList() {
    const params = {
      page: 1,
      per: 5,
      search: "",
      sort: "created_at_desc",
    };
    return instanse.get("tests", params).then((response) => {
      return response.data;
    });
  },
  createTest(params) {
    return instanse.post("tests", params).then((response) => {
      return response.data;
    });
  },
  createQuestion(test_id, params) {
    return instanse
      .post(`tests/${test_id}/questions`, params)
      .then((response) => {
        return response.data;
      });
  },
};
