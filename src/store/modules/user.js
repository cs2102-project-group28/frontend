import axios from "axios";

const back_end_base = "http://IP:PORT"

export default {
  state: {
    authenticated: false
  },
  getters: {
    AUTHENTICATE: state => {
      return state.authenticated;
    }
  },
  mutations: {
    SET_AUTHENTICATE: (state, value) => {
      //Should assert here to check if it's false
      state.authenticated = value;
    }
  },
  actions: {
    LOGIN: (payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(back_end_base + "/login", payload)
          .then(({ status }) => {
            if (status === 200) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    REGISTER: ({ username, email, password }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(back_end_base + "/register", {
            username,
            email,
            password
          })
          .then(({ status }) => {
            if (status === 201) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
