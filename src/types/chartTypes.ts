export interface IDailySale {
  date: string;
  profit: number;
  fbaAmount: number;
  fbmAmount: number;
}

export interface ISku {
  skuList: any;
}

export interface IDailySalesState {
  salesData: IDailySale[] | null;
  days: number;
}

export interface IChartState {
  dailySale: IDailySale;
  skuProduct: ISku;
  dailySaleState: IDailySalesState;
}
