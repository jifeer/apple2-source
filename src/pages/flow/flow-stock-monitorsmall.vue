<template>
  <div class="trade-small-wrapper">
    <stockChart :data="echartsData" v-if="echartsData.length" class="world-chart"></stockChart>
  </div>
</template>
<script>
  import { rightBarMixin } from 'assets/js/common.js'
  import stockChart from 'pages/flow/echarts/flow-stocklineSmall.vue'
  import { dataZoom, tooltipStyle, axisLabel } from 'assets/js/echarts-style'

  export default {
    data() {
      return {
        time: '',
        echartsData: []
      };
    },
    mounted() {
      // this.getTime()
      this.getData()
    },
    computed: {
      // ApiParams() {
      //   return {
      //     TIME_ID: this.time,
      //     NAME: '出口',
      //     AREA: '中国',
      //     PRODUCT: '鲜苹果'
      //   }
      // }
    },
    methods: {
      getTime() {
        this.$xhr.get('apple/trade/history/getTime', {
          params: {
            areaId: '中国',
            timeType: 'year'
          }
        }).then((res) => {
          let defaultTime = res.data.default.split('-')
          let i = defaultTime[0]
          let str = ''
          while (i <= defaultTime[1]) {
            str += i + ','
            i++
          }
          this.time = str.slice(0, -1)
          this.getData()
        })
      },
      getData() {
        this.$xhr.get('apple/circulation/capacity', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          this.echartsData = res.data
          // this.echartsData = [{
          //   "data": [5.22, 6.86, 6.96, 8.83, 9.24, 5.36, 6.21, 24, 25.39, 13.12, 18.41, 19.2, 3.02, 14.99, 36.46],
          //   "name": "山东仓容比",
          //   "time": [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
          //   "type": "bar"
          // }, {
          //   "data": [10, -1, 3.5, -1, 0, -3, 4, 1.6, 0, -2, 2.9, -12, -3.9, 1.6, 7],
          //   "name": "山东相比去年同期",
          //   "time": [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
          //   "type": "line"
          // }, {
          //   "data": [5.92, 5.86, 7.96, 7.83, 7.84, 7.56, 7.91, 15.96, 15.39, 13.12, 5.41, 14.2, 3.02, 14.99, 26.46],
          //   "name": "陕西仓容比",
          //   "time": [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
          //   "type": "bar"
          // }, {
          //   "data": [0, -1.2, 30, -1.5, 0.1, -1.3, 0.4, 16, 0, -2.2, 2.2, -1.5, -30, 13.2, 12],
          //   "name": "陕西相比去年同期",
          //   "time": [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
          //   "type": "line"
          // }]
        })
      }
    },
    components: {
      stockChart
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-window-cont {
    .trade-small-wrapper {
      height: 100%;
    }
  }

  .trade-small-wrapper {}

</style>
