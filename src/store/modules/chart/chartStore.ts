import { ActionContext } from "vuex";
import httpService from "@/utils/appAxios";
import {
  IDailySale,
  IDailySalesState,
  ISku,
  IChartState,
} from "@/types/chartTypes";

const state: IChartState = {
  dailySale: {
    date: "",
    profit: 0,
    fbaAmount: 0,
    fbmAmount: 0,
  },
  skuProduct: {
    skuList: null,
  },
  dailySaleState: {
    salesData: null,
    days: 7,
  },
};

const actions = {
  async getSalesData(context: ActionContext<IDailySalesState, any>, days: any) {
    try {
      const store = await JSON.parse(localStorage.getItem("storeInfo") || "{}");
      const response = await httpService.post("/data/daily-sales-overview/", {
        marketplace: store.storeInformation.marketplace,
        sellerId: store.storeInformation.sellerId,
        requestStatus: 0,
        day: days,
        excludeYoYData: true,
      });

      const data = response.data.Data.item.map((daily: any) => ({
        date: daily.date,
        profit: daily.profit,
        fbaAmount: daily.fbaAmount,
        fbmAmount: daily.fbmAmount,
        orderCount: daily.orderCount,
      }));

      context.commit("setSalesData", data);
    } catch (error) {
      console.error(error);
    }
  },

  async getSkuListData(context: ActionContext<ISku, any>, days: any) {
    try {
      const store = await JSON.parse(localStorage.getItem("storeInfo") || "{}");
      const isDaysCompare = days?.length === 2 ? 1 : 0;
      const response = await httpService.post("/data/daily-sales-sku-list/", {
        marketplace: store.storeInformation.marketplace,
        sellerId: store.storeInformation.sellerId,
        salesDate: days ? days[0] : "",
        salesDate2: days ? days[1] : "",
        pageSize: 60,
        pageNumber: 1,
        isDaysCompare: isDaysCompare,
      });

      const data = response.data.Data.item.skuList;

      context.commit("setSkuListData", data);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setSalesData(state: IDailySalesState, data: IDailySale[]) {
    state.salesData = data;
  },
  setSkuListData(state: IChartState, data: any) {
    state.skuProduct.skuList = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
