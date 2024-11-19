import * as axios from "axios";
import Cookies from "universal-cookie";

const authotization_token = new Cookies();

const instanse = axios.create({
  withCredentials: true,
  baseURL: "https://snp.drankov.ru/api/v1/",
  headers: {
    "scope-key": "jUnjhQ94GA3JNyHH",
    token: authotization_token.get("auth_token"),
  },
});

export const authApi = {
  signin(params) {
    return instanse.post("signin", params).then((response) => {
      authotization_token.set("auth_token", response.data.auth_token);
      instanse.defaults.headers.token = authotization_token.get("auth_token");
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
      authotization_token.remove("auth_token");
      instanse.defaults.headers.token = authotization_token.get("auth_token");
      return response.data;
    });
  },
};

export const testApi = {
  getTestList(params) {
    return instanse
      .get(
        `tests?search=${params.search}&per=5&sort=${params.sort}&page=${params.page}`
      )
      .then((response) => {
        return response.data;
      });
  },
  createTest(params) {
    return instanse.post("tests", params).then((response) => {
      return response.data;
    });
  },
  editTest(params) {
    console.log(params.title);
    return instanse
      .patch(`tests/${params.id}/`, { title: params.title })
      .then((response) => {
        return response.data;
      });
  },
  deleteTest(params) {
    return instanse.delete(`tests/${params}/`).then((response) => {
      return response.data;
    });
  },
  getCurrentTest(params) {
    return instanse.get(`tests/${params}/`).then((response) => {
      return response.data;
    });
  },
  createQuestion(params) {
    const question = {
      title: params.title,
      question_type: params.question_type,
      answer: params.answer,
    };
    return instanse
      .post(`tests/${params.test_id}/questions`, question)
      .then((response) => {
        return response.data;
      });
  },
  deleteQuestion(params) {
    return instanse.delete(`questions/${params.id}`).then((response) => {
      return response.data;
    });
  },
  editQuestion(params) {
    const question = {
      title: params.title,
      question_type: params.question_type,
      answer: params.answer,
    };
    return instanse
      .patch(`questions/${params.question_id}`, question)
      .then((response) => {
        return response.data;
      });
  },
  createAnswer(params) {
    const answer = {
      text: params.text,
      is_right: params.is_right,
    };
    return instanse
      .post(`/questions/${params.question_id}/answers`, answer)
      .then((response) => {
        return response.data;
      });
  },
  editAnswer(params) {
    const answer = {
      text: params.text,
      is_right: params.is_right,
    };
    return instanse.patch(`/answers/${params.id}`, answer).then((response) => {
      return response.data;
    });
  },
  moveAnswer(params) {
    return instanse
      .patch(`/answers/${params.id}/insert_at/${params.position}`)
      .then((response) => {
        return response.data;
      });
  },
  deleteAnswer(params) {
    return instanse.delete(`/answers/${params.id}`).then((response) => {
      return response.data;
    });
  },
};
