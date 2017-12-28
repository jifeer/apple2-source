<template>

  <div class="fertiliserCostSM-box">
    <FCchart :FCchartData="FCchartData"></FCchart>
  </div>

</template>

<script type="text/javascript">
  import FCchart from "./echarts/FCchartSM.vue"

  export default {
    name: 'fertiliserCostSM',

    data() {
      return {
        FCchartData: {
          data: [],
          timeData: [],
          option: {},
        },
      }
    },

    mounted(){
      this.getFCchartData()
    },

    methods: {
      //获取数据
      getFCchartData(){
        this.$xhr.get('/apple/income/getChemicalFertilizerData', {
          params: {
            area: "101,116,128",
            time: "2010,2011,2012,2013,2014",
            type: "101002",
            itemId: "103015",
          }
        }).then((res) => {
          this.FCchartData.data = res.data.data
          this.FCchartData.timeData = res.data.time
        })
      },
    },

    components: {
      FCchart,
    }

  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-window-cont {
    display: flex;
    .fertiliserCostSM-box {
      height: 100%;
      flex: 1;
      .FCchart-wrapper {
        height: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
