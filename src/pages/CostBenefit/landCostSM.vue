<template>

  <div class="landCostSM-box">
    <landChart :landChartData="landChartData"></landChart>
  </div>

</template>

<script type="text/javascript">
  import landChart from "./echarts/LandChartSM.vue"

  export default {
    name: 'landCostSM',

    data() {
      return {
        landChartData: {
          data: [],
          timeData: [],
          option: {},
        },
        area: null,
        time: null,
        type: null,
        itemId: null,
      }
    },
    mounted(){
      this.getlandChartData()
    },

    computed: {
    },

    methods: {
      //获取数据
      getlandChartData(){
        this.$xhr.get('/apple/income/getLandCostData', {
          params: {
//     	  		...this.ApilandChartParms
            area: "101,116,128",
            time: "2010,2011,2012,2013,2014",
            type: "101002",
            itemId: "101011",
          }
        }).then((res) => {
          this.landChartData.data = res.data.data
          this.landChartData.timeData = res.data.time
        })
      },
    },

    components: {
      landChart,
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-window-cont {
    display: flex;
    .landCostSM-box {
      height: 100%;
      flex: 1;
      .landChart-wrapper {
        height: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
