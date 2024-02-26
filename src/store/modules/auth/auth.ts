import {
  IAuthState,
  IStoreInformation,
  IUserInformation,
} from "@/types/authTypes";
import httpService from "@/utils/appAxios";

type CommitFunction = (mutationType: string, payload?: any) => void;

const state: IAuthState = {
  loginUser: {
    email: "homework@eva.guru",
    password: "Homeworkeva1**",
  },
  userInformation: {
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
  },
  storeInformation: {
    sellerId: "",
    marketplace: "",
  },
};

const getters = {
  getStoreData: (state: any) => state.storeInformation,
  getUserData: (state: any) => state.userInformation,
};
const mutations = {
  setUserInformation(state: IAuthState, userInformation: IUserInformation) {
    state.userInformation = userInformation;
  },
  setStoreInformation(state: IAuthState, storeInformation: IStoreInformation) {
    state.storeInformation = storeInformation;
  },
};
const actions = {
  async authenticate({ state }: { state: IAuthState }) {
    if (!state.loginUser) {
      console.error("loginUser is null");
      return;
    }
    await httpService
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
          JSON.stringify({
            accessToken: response.data.Data.AccessToken,
            email: state.loginUser?.email,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async getUserInfo({ commit }: { state: IAuthState; commit: CommitFunction }) {
    const user = await JSON.parse(localStorage.getItem("user") || "{}");

    if (user !== null) {
      await httpService
        .post("/user/user-information", {
          email: user.email,
        })
        .then(function (response) {
          const store = response.data.Data.user.store[0];
          const storeInformation: IStoreInformation = {
            sellerId: store.storeId,
            marketplace: store.marketplaceName,
          };
          const userInformation: IUserInformation = {
            firstName: response.data.Data.user.firstName,
            lastName: response.data.Data.user.lastName,
            email: response.data.Data.user.email,
            userId: response.data.Data.user.userId,
          };

          localStorage.setItem("userInfo", JSON.stringify({ userInformation }));

          localStorage.setItem(
            "storeInfo",
            JSON.stringify({ storeInformation })
          );

          commit("setUserInformation", userInformation);
          commit("setStoreInformation", storeInformation);
        })
        .catch(function (error) {
          console.error("getUserInfo error:", error);
        });
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
