<template>
  <div class="price-risefall-wrapper big-wrapper">
    <div class="bigW-option">
      <selectDiy @change="_changeDiy" :url="'apple/price/monitor/getProvince?type='+timeType"></selectDiy>
      <selectTime @chooseTime="_chooseTime" url="apple/price/monitor/getTime" defaultTimeType="月度" :timeTypeData="timeTypeData" :areaId="areaId"></selectTime>
      <explain :eText="eText" class="help-text"></explain>
    </div>
    <div class="chart-wrapper">
      <div class="chart-up">
        <priceKline :echartsData="KlineData" :dateName="dateName"></priceKline>
      </div>
      <div class="time-top">{{titleDate}}</div>
      <div class="chart-down">
        <div class="chart-down-left">
          <div class="down-title">价格上涨排名</div>
          <rankingBar :rankingEchart="rankingDataRise"></rankingBar>
        </div>
        <div class="chart-down-right">
          <div class="down-title">价格下跌排名</div>
          <rankingBar :rankingEchart="rankingBarFall"></rankingBar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import selectDiy from 'components/selectDiy/selectDiy';
  import explain from 'components/explain/explain';
  import selectBtn from 'components/selectBtn/selectBtn';
  import rankingBar from './echarts/rankingBar';
  import priceKline from 'pages/price/echarts/price-riseFall-Kline';
  import {rightBarMixin, handleTimeData} from 'assets/js/common.js'
  import selectTime from 'components/selectTime/selectTime';

  export default {
    name: 'line',
    data() {
      return {
        eText: '数据来源于农业部。',
        titleDate: '',
        rankingDataRise: {
          yAxisData: [],
          data: [],
          option: {
            tooltip: {
              formatter: function (params) {
                return "<span style='color:#fff'>" + params.name + "</span>" + "<br />" + "<span style='color:#fff'>苹果批发价格涨幅: </span>" + "<span style='color:#ff3b00;font-size:0.16rem;font-weight: bold;'>" + params.value + "%</span>";
              }
            },
            series: [{
              itemStyle: {
                normal: {
                  color: '#202c3f',
                }
              }
            }, {
              label: {
                normal: {
                  textStyle: {
                    fontSize: '0.14rem',
                    color: "#a54158"
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#a54158'
                },
                emphasis: {
                  color: '#ff0000',
                }
              }
            }]
          }
        },
        rankingBarFall: {
          yAxisData: [],
          data: [],
          option: {
            tooltip: {
              formatter: function (params) {
                return "<span style='color:#fff'>" + params.name + "</span>" + "<br />" + "<span style='color:#fff'>苹果批发价格跌幅: </span>" + "<span style='color:#00ff79;font-size:0.16rem;font-weight: bold;'>" + params.value + "%</span>";
              }
            },
            series: [{
              itemStyle: {
                normal: {
                  color: '#202c3f',
                }
              }
            }, {
              label: {
                normal: {
                  textStyle: {
                    fontSize: '0.14rem',
                    color: "#0d7b57"
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#0d7b57'
                },
                emphasis: {
                  color: '#00ff79',
                }
              }
            }]
          }
        },
        KlineData: {
          Xdata: [],
          data: [],
          data1: [],
          option: {}
        },

        timeTypeData: ['日度', '周度', '月度', '年度'],   // selectTime 组件
        areaId: '',                       // selectTime 组件
        timeType: 'month',
        time: '',
        value: '',
        areaType: '',
        url: '',
        areas: '',
        dateName: ''
      }
    },
    computed: {
      ApibtnParms() {
        return {
          area: 'province',
          timeType: this.timeType
        }
      },
      ApiKlineParms() {
        return {
          areas: this.areas,
          areaType: 'province',
          timeType: this.timeType,
          times: this.time
        }
      }
    },
    methods: {
      //自定义-下拉框改变
      _changeDiy(params) {
        this.areaId = params.value

        this.areas = params.value
        this.areaType = params.name
        //let titleParams = this.titleDate + this.areaType
        let titleParams = this.areaType
        this.$emit('changeName', titleParams)
      },
      // 时间参数 捕获
      _chooseTime(time) {
        this.time = time.time
        this.timeType = time.timeType
        this.url = this.timeType

        if (this.timeType == 'week') {
          this.dateName = '周'
        }
        if (this.timeType == 'month') {
          this.dateName = '月'
        }
        if (this.timeType == 'year') {
          this.dateName = '年'
        }
        if (this.timeType == 'day') {
          this.dateName = '日'
        }


      },
      getriseFallData() {
        /* //左侧柱图数据
         this.rankingDataRise.yAxisData = ['黑龙江', '西藏', '山西', '河北', '河南', '浙江', '江苏', '甘肃', '湖北', '新疆'];
         this.rankingDataRise.data = [12,22,23,56,45,34,63,27,53,36];
         //右侧柱图数据
         this.rankingBarFall.yAxisData = ['福建', '浙江', '山东', '黑龙江', '新疆', '青海', '甘肃', '内蒙古', '湖北', '湖南'];
         this.rankingBarFall.data = [12,22,23,56,45,34,63,27,53,36];
         */

        //涨跌幅后台请求数据部分
        this.$xhr.get('apple/price/monitor/getChangeAmount', {
          params: {
            ...this.ApibtnParms
          }
        }).then((res) => {
          let yAxisDataFall = []
          let dataFall = []
          let yAxisDataRise = []
          let dataRise = []
          //涨幅的柱图
          res.data.up.forEach((v, i) => {
            yAxisDataRise.push(v.province)
            dataRise.push(v.aveg)
          })
          this.rankingDataRise.yAxisData = yAxisDataRise.reverse()
          this.rankingDataRise.data = dataRise.reverse()
          //跌幅的柱图

          res.data.down.forEach((v, i) => {
            yAxisDataFall.push(v.province)
            dataFall.push(v.aveg)
          })
          this.rankingBarFall.yAxisData = yAxisDataFall
          this.rankingBarFall.data = dataFall

          /**** 处理日期的格式 ****/
          let date = (res.data.titleDate[0].date).replace(/-0/g, '-');
          //console.log(this.timeType)
          if (this.timeType == 'day') {
            let newDate = date.split('-');
            this.titleDate = newDate[0] + '年' + newDate[1] + '月' + newDate[2] + '日'
          } else if (this.timeType == 'month') {
            let newDate = date.split(',');
            let newDate1 = newDate[0].split('-');
            let newDate2 = newDate[1].split('-');
            let newTitleDate = newDate1[0] + '年' + newDate1[1] + '月' + newDate1[2] + '日' + '-' + newDate2[2] + '日';
            this.titleDate = newTitleDate
          } else {
            let newDate = date.split(',');
            let newDate1 = newDate[0].split('-');
            let newDate2 = newDate[1].split('-');
            let newTitleDate = newDate1[0] + '年' + newDate1[1] + '月' + newDate1[2] + '日' + '-' + newDate2[1] + '月' + newDate2[2] + '日';
            this.titleDate = newTitleDate
          }
          /*//标题里的时间
          let titleParams = this.titleDate + this.areaType
          this.$emit('changeName', titleParams)*/
        })

      },
      getKlineData() {
        /*this.KlineData.data = [
          //数据顺序:[周初价,周末价,最低价,最高价]
          ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
          ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
          ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
          ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
          ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
          ['2013/1/31', 2383.43, 2383.43, 2383.43, 2383.43],
          ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
          ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
          ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
          ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
          ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
          ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
          ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
          ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
          ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
          ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
          ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
          ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
          ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
          ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
          ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
          ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
          ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
          ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
          ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44]
        ],
          this.KlineData.data1 = [2310, 2310, 2285, 2357, 2360, 2373, 2377, 2435, 2431, 2432, 2430, 2426, 2431, 2430, 2373, 2378, 2352, 2330, 2323, 2287, 2332, 2360, 2330, 2270, 2330]*/
        //处理K线图的后台交互
        this.$xhr.get('apple/price/monitor/getPriceTrend', {
          params: {
            ...this.ApiKlineParms
          }
        }).then((res) => {
          if (this.timeType == 'day') {
            this.KlineData.data = []
            this.KlineData.data1 = res.data.data1
            this.KlineData.Xdata = res.data.Xdata
          } else {
            this.KlineData.data = res.data.data
            this.KlineData.data1 = res.data.data1
            /* let Xdata = []
             res.data.data.forEach((val) => {
               Xdata.push(val[0])
             })*/
            this.KlineData.Xdata = res.data.Xdata
          }

        })
      }
    },

    mounted() {
      this.getriseFallData()
    },

    components: {
      selectDiy,
      explain,
      selectBtn,
      rankingBar,
      priceKline,
      selectTime
    },
    watch: {
      ApibtnParms(newVal) {
        if (newVal.area && newVal.timeType) {
          this.getriseFallData()
        }
      },
      ApiKlineParms(newVal) {
        if (newVal.areas && newVal.timeType && newVal.times) {
          this.getKlineData()
        }
      }
    }

  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .help-text {
    margin-left: 0.2rem;
  }

  .price-risefall-wrapper {
    height: 100%;
    padding-bottom: 0;
    .bigW-option {
      //border-top: 1px solid #1961A5;
      height: 0.5rem;
      padding: 0 0 0.1rem 0;
    }
    .bigW-option > div:nth-child(1) {
      margin-right: 0.2rem;
    }
    .title-info {
      margin: 0.1rem 0;
    }
    .chart-wrapper {
      height: calc(100% - 0.6rem);

      .chart-up,
      .chart-down {
        height: calc((100% - 0.6rem) / 2);
      }
      .chart-up {
        padding-bottom: 0.2rem;
        box-sizing: border-box;
      }
      .chart-up div {
        height: 100%;
      }
      .time-top {
        font-size: 0.32rem;
        text-align: center;
        color: #fff;
        font-weight: 100;
        height: 0.4rem;
        line-height: 0.4rem;
      }
      .chart-down {
        font-size: 0;
        //margin-top:0.2rem;
        .down-title {
          font-size: 0.24rem;
          height: 0.3rem;
          width: 100%;
          color: #fff;
          text-align: center;
        }
        .chart-down-left,
        .chart-down-right {
          display: inline-block;
          width: 50%;
          height: 100%;
        }
        .chart-down-left > div:nth-child(2),
        .chart-down-right > div:nth-child(2) {
          height: calc(100% - 0.3rem);
        }
        .rankingEchart-wrapper {
          height: 100%;
        }

        .chart-down-left {
          padding-right: 0.2rem;
          box-sizing: border-box;
        }
        .chart-down-right {
          padding-left: 0.2rem;
          box-sizing: border-box;
        }
      }
    }
  }

</style>
