import axios from "axios";

const back_end_base = "http://IP:PORT"

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    MENU: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(back_end_base + "/customers" + this.$route.username, payload)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GET_ACCOUNT: ({ commit }, { username, email, password }) => {
      return axios.post(back_end_base + "/register", {
            username,
            email,
            password
          }).then(({ data, status }) => {
            if (status === 201) {
              resolve(true);
            }
          }).catch(error => {
            reject(error);
          });
      });
    }
};
