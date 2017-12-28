<template>
  <div class='chart_main'>
    <div class="chart_bg">
      <span id="speedometer_f"></span>
      <span id="speedometer_m"></span>
      <span id="speedometer_b"></span>
      <div class='frontChart'></div>
      <div class='lastChart'></div>
      <div class="middleChart"></div>
      <img src="../../../assets/img/dashBoardBg.png" class="posi-sty"/>
      <div class="point" @click.stop="_toggleShowTip"></div>
      <div class="message" :class="{show: toggleshow }">
        <p>
          年均价：参照最近20年苹果年均价，红色区域为最小值至10分位数，绿色区域为10分位数至最大值，橘色区域为最大值至最大值*110%；月均价：参照当前季度最近20年苹果月均价，红色区域为最近一年的成本价至10分位数，绿色区域和橘色区域同年均价；日均价：参照当前月度最近20年苹果日均价，红色区域、绿色区域和橘色区域同年均价。</p>
      </div>
    </div>


  </div>
</template>

<script type="text/javascript">

  import liquidfill from "../js/echarts-liquidfill.js"
  import {d3} from "../js/d3.v3.min.js"
  import {iopctrl} from "../js/iopctrl.js"
  import {libMain} from "../js/main.min.js"
  import {resizeMixin} from 'assets/js/common'

  export default {
    name: 'component_name',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        toggleshow: false,
        kill1: {},
        kill2: {},
        kill3: {},
      }
    },
    mounted() {
      setTimeout(() => {
        this.initdashBoard()

      }, 300)
    },
    methods: {
      initdashBoard() {

        this.$xhr.get('/apple/index/dashboard')
          .then((res) => {
//   	 	  alert(res.data.dashboardData[0].max-res.data.dashboardData[2].seriesData)
//   	   console.log(res.data)
            //图一
            var waterChart = libMain.CreateWaterChart;
            var createChart = new waterChart();
            this.kill1 = createChart.init({
              name: '月均价',
              width: 134,
              height: 134,
              dom: 'frontChart',
              valBigData: res.data.dashboardData[0].max - 0,
              seriesData: res.data.dashboardData[0].seriesData - 0
            });
            var ticks = libMain.TickVals;
            var tickVals = new ticks();
            tickVals.init({
              domId: 'speedometer_f',
//            min: Math.floor(res.data.dashboardData[0].min - 0),
//            max: Math.ceil(res.data.dashboardData[0].max - 0),
              min: res.data.dashboardData[0].min - 0,
              max: res.data.dashboardData[0].max - 0,
              width: 132,
              height: 132,
              section1: res.data.dashboardData[0].section1 - 0,
              section2: res.data.dashboardData[0].section2 - 0,
              val: res.data.dashboardData[0].seriesData
            });
            //中间图
            var waterChart = libMain.CreateWaterChart;
            var createChart = new waterChart();
            this.kill2 = createChart.init({
              name: '日均价',
              width: 150,
              height: 150,
              dom: 'middleChart',
              valBigData: res.data.dashboardData[1].max - 0,
              seriesData: res.data.dashboardData[1].seriesData - 0,
              date: res.data.dashboardData[1].date
            });
            var ticks = libMain.TickVals;
            var tickVals = new ticks();
            tickVals.init({
              domId: 'speedometer_m',
//            min: Math.floor(res.data.dashboardData[1].min - 0),
//            max: Math.ceil(res.data.dashboardData[1].max - 0),
              min: res.data.dashboardData[1].min - 0,
              max: res.data.dashboardData[1].max - 0,
              width: 213,
              height: 213,
              pathx: 107,
              pathy: 110,
              section1: res.data.dashboardData[1].section1 - 0,
              section2: res.data.dashboardData[1].section2 - 0,
              val: res.data.dashboardData[1].seriesData,
              innerRadius: 33
            });
            //图三
            var waterChart = libMain.CreateWaterChart;
            var createChart = new waterChart();
            this.kill3 = createChart.init({
              name: '年均价',
              width: 134,
              height: 134,
              dom: 'lastChart',
              valBigData: res.data.dashboardData[2].max * 1,
              seriesData: res.data.dashboardData[2].seriesData * 1
            });
            var ticks = libMain.TickVals;
            var tickVals = new ticks();
            tickVals.init({
              domId: 'speedometer_b',
//            min: Math.floor(res.data.dashboardData[2].min * 1),
//            max: Math.ceil(res.data.dashboardData[2].max * 1), // // 加0.1和向上取整是为了更好的显示
              min: res.data.dashboardData[2].min - 0,
              max: res.data.dashboardData[2].max - 0,
              width: 132,
              height: 132,
              section1: res.data.dashboardData[2].section1,
              section2: res.data.dashboardData[2].section2,
              val: res.data.dashboardData[2].seriesData

            });
          })
      },

      _toggleShowTip() {
        this.toggleshow = !this.toggleshow
      },

      // echats 图表自适应
      _windowResizeHandler() {
        // do nothing
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.kill1.dispose()
        this.kill2.dispose()
        this.kill3.dispose()
      }
    },

  }
</script>

<style lang="scss">
  .chart_main {
    width: 659px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-content: center;
  }

  .chart_bg {
    position: relative;
    margin-top: -0.2rem;
    .message {
      width: 110%;
      // height: 30%;
      color: #fff;
      margin: 0 auto;
      padding: .2rem;
      // border-radius: 5px;
      background: rgba(11, 13, 29, 1);
      transition: all .2s ease-in;
      box-sizing: border-box;
      position: absolute;
      left: -5%;
      right: 0;
      top: 340px;
      z-index: -1;
      opacity: 0;
      p {
        font-size: .18rem;
        line-height: .24rem;
        width: 100%;
        height: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .show {
      z-index: 99;
      opacity: 1;
      transition: all .2s ease-in;
    }
    .point {
      width: 231px;
      height: 213px;
      cursor: pointer;
      position: absolute;
      top: 96px;
      left: 223px;
      z-index: 99;
    }
  }

  .chart_txt {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 38px;
    left: 0;
    text-align: center;
    color: #fff;
    z-index: 10;
  }

  .unitBox {
    position: relative;
    top: 30px;
    left: 0px;
  }

  .unitBox > span {
    font-size: 14px;
    position: absolute;
    top: 37px;
    left: 44px;
  }

  .chart_txt > p {
    font-size: 16px;
    margin-top: 75px !important;
  }

  .middleChart .chart_txt p:nth-child(2) {
    font-size: 16px;
    margin-top: 110px !important;
  }

  .middleChart .chart_txt p:nth-child(3) {
    font-size: 16px;
    margin-top: 10px !important;
  }

  .posi-sty {
    position: relative;
    top: -72px;
    /*	z-index: 999;*/
  }

  #speedometer_f {
    position: absolute;
    top: 145px;
    left: 103px;
    z-index: 9;
  }

  #speedometer_m {
    position: absolute;
    top: 96px;
    left: 223px;
    z-index: 8;
  }

  #speedometer_b {
    position: absolute;
    top: 145px;
    left: 427px;
    z-index: 9;
  }

  /*d3样式*/

  .unselectable {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* css formats for the gauge */

  .gauge .domain {
    stroke-width: 2px;
    stroke: #35c5ed;
  }

  .gauge .tick line {
    stroke: #FFFFFF;
    stroke-width: 2px;
  }

  .gauge line {
    stroke: #FFFFFF;
  }

  .gauge .arc,
  .gauge .cursor {
    opacity: 0;
  }

  .gauge .major {
    fill: #FFFFFF;
    font-size: 12px;
    font-weight: normal;
  }

  .unselectable {
    font-size: 14px;
  }
</style>
