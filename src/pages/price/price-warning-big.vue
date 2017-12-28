<template>
  <div class="price-risefall-wrapper big-wrapper">
    <div class="bigW-option">
      <div class="chart-title">价格预测</div>
      <div class="area-select">
        <selectDiy @change="_changeDiy" :url="url" :data="selectData" v-if="selectData.length"></selectDiy>
        <selectBtn :btnData="btnData" @changeBtn="_changeType" :btnIndex.sync="btnIndex"></selectBtn>
        <explain :eText="eText"></explain>
      </div>
    </div>
    <div class="forecast-wrapper">
      <div class="chart-up">
        <Linechart v-if="this.lineChartData.data1.length" :lineChart="lineChartData"></Linechart>
      </div>
      <div class="bigW-option">
        <div class="chart-title">涨跌幅预测 </div>
        <div class="date-select">
          <selectBtn :btnData="btnDataBar" @changeBtn="_changeTypeBar" :btnIndex.sync="btnIndexBar"></selectBtn>
        </div>
      </div>
      <div class="chart-down">
        <div class="chart-legend"><span class="green-color">下跌</span> <span class="red-color">上涨</span></div>
        <Updown :echartsData="riseFallData" class="chart-down-chart"></Updown>
      </div>
    </div>
  </div>
</template>
<script>
  import { rightBarMixin } from 'assets/js/common.js'

  import Linechart from './echarts/price-forecast-line.vue'
  import Updown from './echarts/up-down-bar.vue'
  import selectDiy from '../../components/selectDiy/selectDiy.vue'
  import SelectBtn from '../../components/selectBtn/selectBtn.vue'
  import Explain from '../../components/explain/explain.vue'

  export default {
    name: 'warning-big',
    data() {
      return {
        btnData: ['未来一周', '未来一月', '未来一年'],
        btnDataBar: ['未来一周', '未来一月'],
        eText: '使用GARCH模型拟合近10年的价格预测未来一周、一月的价格。以2000年以来的苹果主产省单产数据来拟合苹果价格，并用单产预测的结果预测当年全国年平均价格。数据来源于农业部。',
        areaType: '北京市',
        timeType: '',
        timeTypeBar: '',
        btnIndex: 1,
        btnIndexBar: 0,
        selectData: ['全国'],
        url: '',
        riseFallData: {
          Xdata: [],
          data: [],
          option: {}
        },
        lineChartData: {
          Xdata: [],
          data1: [],
          data2: [],

          option: {
            xAxis: {
              name: ''
            },
            grid: {
              right: '5%'
            }
          }
        }
      }
    },
    computed: {
      ApibtnParams() {
        return {
          areaName: this.areaType,
          timeType: this.timeType
        }
      },
      ApibtnParamsBar() {
        return {
          timeType: this.timeTypeBar
        }
      }
    },
    mounted() {
      this.getWarningData(),
        this.getWarningBarData(),
        //this.url = this.timeType == 'nextYear' ? this.url : "apple/price/warning/getCity"
        this.url = "apple/price/warning/getCity"
    },
    methods: {
      //自定义-下拉框改变
      _changeDiy(name) {
        this.areaType = name
      },
      _changeType(name) {
        let _timeType = ""
        if (name == "未来一年") {
          _timeType = "nextYear"
          this.lineChartData.option.xAxis.name = '年度';
          this.url = ""
        }
        if (name == "未来一月") {
          _timeType = "nextMonth"
          this.lineChartData.option.xAxis.name = '';
          this.url = "apple/price/warning/getCity"
        }
        if (name == "未来一周") {
          _timeType = "nextWeek"
          this.lineChartData.option.xAxis.name = '';
          this.url = "apple/price/warning/getCity"
        }
        this.timeType = _timeType;
      },
      _changeTypeBar(name) {
        let _timeTypeBar = ""
        if (name == "未来一月")
          _timeTypeBar = "nextMonth"
        if (name == "未来一周")
          _timeTypeBar = "nextWeek"
        this.timeTypeBar = _timeTypeBar;
      },
      getWarningData() {
        //console.log(this.ApibtnParams)
        /*//柱图的数据
        this.riseFallData.Xdata = ['北京', "山西", "陜西", "河南", "河北", '广州', '湖北', '山东', '湖南', '天津'];
        this.riseFallData.data = [50, 40, 30, 20, 10, 10, 20, 30, 40, 50]
        //折线的数据
        this.lineChartData.Xdata = ['北京', "山西", "陜西", "河南", "河北", '广州', '湖北', '山东', '湖南', '天津']
        this.lineChartData.data1 = [50, 40, 30, 20, 10, 10, 20, 30, 40, 50]
        this.lineChartData.data2 = [30, 60, 70, 80, 125, 70, 100, 150,]*/
        this.$xhr.get('apple/price/waring/priceForecast', {
          params: {
            ...this.ApibtnParams
          }
        }).then((res) => {
          //折线的数据
          this.lineChartData.Xdata = res.data.year
          this.lineChartData.data1 = res.data.data1
          this.lineChartData.data2 = res.data.data2
          // console.log(res)
        })
      },
      getWarningBarData() {
        this.$xhr.get('apple/price/waring/priceChange', {
          params: {
            ...this.ApibtnParamsBar
          }
        }).then((res) => {
          //柱图的数据
          this.riseFallData.Xdata = res.data.areaData
          this.riseFallData.data = res.data.data
        })

      }
    },

    components: {
      Linechart,
      Updown,
      SelectBtn,
      Explain,
      selectDiy
    },
    watch: {
      ApibtnParams(newVal) {
        if (newVal.areaName && newVal.timeType) {
          this.getWarningData()

        }
      },
      ApibtnParamsBar(newVal) {
        this.getWarningBarData()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .price-risefall-wrapper {
    height: 100%;
    padding-bottom: 0;
    .bigW-option {
      @include flex(space-between);
      height: 0.5rem;
      padding-top: 0.1rem;
    }

    .forecast-wrapper {
      height: calc(100% - 0.6rem);
    }
    /*.date-select {
      width: 5.6rem;
      text-align: right;
      margin-right: 0.2rem;
    }*/
    .area-select {
      display: flex;
    }
    .area-select>div {
      display: inline-block;
      margin-left: 0.2rem;
    }
    .title-info {
      margin: 0.1rem 0;
    }
    .chart-up,
    .chart-down {
      height: 42%;
    }

    .chart-up>div,
    .chart-down .chart-down-chart {
      height: 100%;
    }
    .chart-title {
      font-size: 0.24rem;
      height: 0.3rem;
      color: #fff;
    }
    .chart-down .chart-title {
      margin: 0.3rem 0;
    }
    .chart-down {
      position: relative;
    }
    .chart-legend {
      position: absolute;
      right: 30%;
      font-size: 0.18rem;
      color: #e9e9ea;
    }
    .red-color:before {
      content: '';
      display: inline-block;
      height: 0.1rem;
      width: 0.2rem;
      background: #e74b64;
      margin-right: 0.15rem;
      margin-bottom: 0.02rem;
    }
    .green-color:before {
      content: '';
      display: inline-block;
      height: 0.1rem;
      width: 0.2rem;
      margin-right: 0.15rem;
      margin-bottom: 0.02rem;
      background: #01a061;
    }
    .chart-legend span {
      margin-right: 1rem;
    }
  }

</style>
