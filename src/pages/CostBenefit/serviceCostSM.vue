<template>

  <div class="laborCostSM-box">
    <SCchart :SCchartData="SCchartData"></SCchart>
  </div>

</template>

<script type="text/javascript">
  import SCchart from "./echarts/SCchartSM.vue"

  export default {
    name: 'serviceCostSM',

    data() {
      return {
        SCchartData: {
          data: [],
          timeData: [],
          option: {},
        },
      }
    },

    mounted(){
      this.getSCchartData()
    },
//computed: {
//  	ApiSCchartParms() {
//		        return {
//		              area: "101,116,128",
//	                time: "2010,2011,2012,2013,2014",
//	                type: "101002",
//	                itemId: "101011",
//		        }
//		      },
//  },
    methods: {
      //获取数据
      getSCchartData(){
        this.$xhr.get('/apple/income/getMaterialServiceData', {
          params: {
            area: "101,116,128",
            time: "2010,2011,2012,2013,2014",
            type: "101002",
            itemId: "101007",
          }
        }).then((res) => {
          this.SCchartData.data = res.data.data
          this.SCchartData.timeData = res.data.time
        })
      },
    },

    components: {
      SCchart,
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
      .SCchart-wrapper {
        height: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
