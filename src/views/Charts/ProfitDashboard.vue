<template>
  <div id="container">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";

export default defineComponent({
  name: "App",
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "column",
        },
        title: {
          text: "Stacked percentage column",
        },
        xAxis: {
          categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
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
              color:
                // theme

                "gray",
            },
          },
        },
        legend: {
          align: "right",
          x: -30,
          verticalAlign: "top",
          y: 25,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend?.backgroundColor || "white",
          borderColor: "#CCC",
          borderWidth: 1,
          shadow: false,
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
        },
        plotOptions: {
          column: {
            stacking: "percent",
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: "John",
            data: [5, 3, 4, 7, 2],
          },
          {
            name: "Jane",
            data: [2, 2, 3, 2, 1],
          },
          {
            name: "Joe",
            data: [3, 4, 4, 2, 5],
          },
        ],
      },
    };
  },
});
</script>
