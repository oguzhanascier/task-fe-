import { IState, IStoreInformation, IUserInformation } from "@/types/auth";
import appAxios from "@/utils/appAxios";


type CommitFunction = (mutationType: string, payload?: any) => void;


const state: IState = {
  loginUser: {
    email: "homework@eva.guru",
    password: "Homeworkeva1**",
  },
  userInformation: {
    firstName: "",
    lastName: "",
    email: "",
    userId: ""
  },
  storeInformation: {
    sellerId: "",
    marketplace: ""
  },
};

const getters = {};
const mutations = {
  setUserInformation(state: IState, userInformation: IUserInformation) {
    state.userInformation = userInformation;
  },
  setStoreInformation(state: IState, storeInformation: IStoreInformation) {
    state.storeInformation = storeInformation;
  }
};
const actions = {
  authenticate({ state }: { state: IState }) {
    if (!state.loginUser) {
      console.error("loginUser is null");
      return;
    }
    appAxios
      .post(`/oauth/token`, {
        Email: state.loginUser?.email,
        Password: state.loginUser?.password,
        GrantType: "password",
        Scope: "amazon_data",
        ClientId: "C0001",
        ClientSecret: "SECRET0001",
        RedirectUri: "https://api.eva.guru",
      })
      .then(function (response) {
        localStorage.setItem(
          "user",
          JSON.stringify({ accessToken: response.data.Data.AccessToken })
        );
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getUserInfo({ state, commit }: { state: IState, commit: CommitFunction }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
  
    if (user !== null) {
      appAxios.post("/user/user-information", {
        email: state.loginUser?.email,
      }).then(((response) => {
        const storeInformation: IStoreInformation = {
          sellerId: "",
          marketplace: ""
        };
        const userInformation: IUserInformation = {
          firstName: response.data.Data.user.firstName,
          lastName: response.data.Data.user.lastName,
          email: response.data.Data.user.email,
          userId: response.data.Data.user.userId
        };
        commit("setUserInformation", userInformation);
      }))
    }
  },
  
  
};

export default {
  state,
  getters,
  mutations,
  actions,
};
