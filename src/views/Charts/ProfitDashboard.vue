<template>
  <div id="container">
    <div class="grid justify-items-end px-5 my-3">
      <select v-model="selectedDay" @change="updateDays" class="px-3 border-2 border-indigo-500 rounded">
        <option value="60">Last 60 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="14">Last 14 Days</option>
        <option value="7">Last 7 Days</option>
      </select>
    </div>
    <highcharts :options="chartOptions"></highcharts>
    <skuListVue :salesDates="selectedPoint" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import { mapState, mapActions } from "vuex";
import skuListVue from "./skuList.vue";


export default defineComponent({
  name: "App",
  components: {
    highcharts: Chart,
    skuListVue
  },
  data() {
    return {
      selectedDay: "30",
      selectedPoint: [],
      chart_data_profit: [],

      chartOptions: {
        chart: {
          type: "column",
        },
        title: {
          text: "Daily Sales",
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          min: 0,
          title: {
            text: "Total fruit consumption",
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: "bold",
              color: "gray",
            },
          },
        },
        legend: {
          align: "center",
          x: -30,
          verticalAlign: "bottom",
          y: 0,
          floating: false,
          backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || "white",
          borderColor: "#CCC",
          borderWidth: 0,
          shadow: false,
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
        },
        plotOptions: {
          column: {
            states: {
              select: {
                color: Highcharts.defaultOptions.legend?.backgroundColor,
                borderColor: Highcharts.defaultOptions.legend?.backgroundColor,
                shadow: {
                  color: 'black',
                  offsetX: 25,
                  offsetY: 25,
                  blur: 0.5,
                },
              }
            },
            drilldown: {
              events: {
                drillup: function () {
                  this.getSelectedPoints().forEach(point => {
                    point.select(false);
                  });
                }
              }
            },
            stacking: "percent",
            dataLabels: {
              enabled: true,
            },
            colorByPoint: false,
            allowPointSelect: false,


            point: {
              events: {
                click: (event) => {
                  let category = event.point.category;
                  let selectedPointIndex = this.selectedPoint.findIndex(point => point.category === category);

                  if (selectedPointIndex !== -1) {
                    this.selectedPoint.splice(selectedPointIndex, 1);
                    event.point.update({ color: null });
                  } else if (this.selectedPoint.length < 2) {
                    this.selectedPoint.push({ category });
                    event.point.select(null, true);
                  }

                  const categoryStringList = this.selectedPoint.map(it => it.category)
                  this.getSkuList(categoryStringList)


                }
              }
            },
          },
        },
        series: [
          {
            name: "Profit",
            data: [],
            color: "#42f59e",
          },
          {
            name: "FBA Sales",
            data: [],
            color: "#2609e6",
          },
          {
            name: "FBM Sales",
            data: [],
            color: "#2d17bf",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("chartStore", ["salesData"]),
  },
  methods: {
    ...mapActions("chartStore", ["getSalesData"]),
    updateDays() {
      this.$store.commit("chartStore/setDays", parseInt(this.selectedDay));
      this.fetchSalesData(parseInt(this.selectedDay));
    },
    async fetchSalesData(days) {
      await this.$store.dispatch("chartStore/getSalesData", days).then(() => {
        this.chartOptions.xAxis.categories = this.salesData?.map((item) => item.date);
        this.chartOptions.series[0].data = this.salesData?.map((item) => item.profit);
        this.chartOptions.series[1].data = this.salesData?.map((item) => item.fbaAmount);
        this.chartOptions.series[2].data = this.salesData?.map((item) => item.fbmAmount);
      });
    },
    async getSkuList(salesDates) {
      await this.$store.dispatch('chartStore/getSkuListData', salesDates);
    }
  },



  async mounted() {
    console.log('created')
    await this.$store.dispatch('getUserInfo')
    await this.$store.dispatch('chartStore/getSalesData')
    await this.fetchSalesData();
    await this.$store.dispatch("chartStore/getSkuListData")
  }

});

</script>

<style>
#container {
  width: 100%;
  height: 400px;
}
</style>
