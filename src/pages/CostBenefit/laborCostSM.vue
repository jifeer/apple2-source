<template>

  <div class="laborCostSM-box">
    <lcChart :lcChartData="lcChartData"></lcChart>
  </div>

</template>

<script type="text/javascript">
  import lcChart from "./echarts/LCchartSM.vue"

  export default {
    name: 'laborCostSM',

    data() {
      return {
        lcChartData: {
          data: [],
          timeData: [],
          option: {},
        },
      }
    },

    mounted(){
      this.getlcChartData()
    },

    methods: {
      //获取数据
      getlcChartData(){
        this.$xhr.get('/apple/income/getLaborCostData', {
          params: {
//     	  		...this.ApiLCchartParms
            area: "101,116,128",
            time: "2010,2011,2012,2013,2014",
            type: "101002",
            itemId: "101008",
          }
        }).then((res) => {
          this.lcChartData.data = res.data.data
          this.lcChartData.timeData = res.data.time

        })
      },
    },

    components: {
      lcChart,
    }

  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-window-cont {
    display: flex;
    .laborCostSM-box {
      height: 100%;
      flex: 1;
      .LCchart-wrapper {
        height: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
