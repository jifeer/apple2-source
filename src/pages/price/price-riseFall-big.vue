<template>
  <div class="price-risefall-wrapper big-wrapper">
    <div class="bigW-option">
      <selectDiy @change="_changeDiyType" :data="typeData"></selectDiy>
      <!-- <selectDiy @change="_changeDiy" :url="'apple/price/monitor/getProvince?type='+timeType+'&appleType='+appleType" :fixArea="areas"></selectDiy> -->
      <priceTree @change="_changeDiy" url="apple/price/monitor/getProvince" :timeType="timeType" :appleType="appleType"></priceTree>
      <selectTime @chooseTime="_chooseTime" url="apple/price/monitor/getTime" :productId="appleType" defaultTimeType="月度" :timeTypeData="timeTypeData" :areaId="areaId"></selectTime>
      <explain :eText="eText" class="help-text"></explain>
    </div>
    <div class="chart-wrapper">
      <div class="chart-up">
        <priceKline :echartsData="KlineData" :dateName="dateName"></priceKline>
      </div>
      <div class="time-top">{{titleDate}}</div>
      <div class="chart-down">
        <div class="chart-down-left">
          <div class="down-title">价格下跌排名</div>
          <rankingBar :rankingEchart="rankingBarFall"></rankingBar>
        </div>
        <div class="chart-down-right">
          <div class="down-title">价格上涨排名</div>
          <rankingBar :rankingEchart="rankingDataRise"></rankingBar>
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
  import priceTree from 'components/selectTreeAsync/priceTree'

  export default {
    name: 'line',
    data() {
      return {
        eText: '数据起始于1995年1月10日，级别为省级，来源于农业部。',
        typeData: ['富士苹果', '蛇果', '国光苹果', '黄元帅苹果', '黄香蕉苹果'],
        titleDate: '',
        appleType: '',
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
                  },
                  formatter: function (value) {
                    return value.data + '%';
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
                },
                formatter: function (value) {
                  return value.data + '%';
                }
              }
            }, {
              label: {
                normal: {
                  textStyle: {
                    fontSize: '0.14rem',
                    color: "#0d7b57"
                  },
                  formatter: function (value) {
                    return value.data + '%';
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
          minData:'',
          maxData:'',
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
        dateName: '',
        areasName: '', // 地区名称
        grade: '', // 级别
      }
    },
    computed: {
      ApibtnParms() {
        return {
          area: 'province',
          timeType: this.timeType,
          appleType: this.appleType
        }
      },
      ApiKlineParms() {
        return {
          grade: this.grade,
          areasName: this.areasName,
          areas: this.areas,
          areaType: 'province',
          timeType: this.timeType,
          times: this.time,
          appleType: this.appleType
        }
      }
    },
    methods: {
      //自定义-苹果类型下拉框
      _changeDiyType(type) {
        this.appleType = type
      },
      //自定义-下拉框改变
      _changeDiy(params) {
        this.areaId = params.id
        this.areas = params.id
        this.areasName = params.name
        this.grade = params.grade
        //let titleParams = this.titleDate + this.areaType
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
            this.KlineData.minData = (res.data.min*0.9).toFixed(1)
            this.KlineData.maxData = (res.data.min*1.1).toFixed(1)
          } else {
            this.KlineData.data = res.data.data
            this.KlineData.data1 = res.data.data1
            /* let Xdata = []
             res.data.data.forEach((val) => {
               Xdata.push(val[0])
             })*/
            this.KlineData.Xdata = res.data.Xdata
            this.KlineData.minData = (res.data.min*0.9).toFixed(1)
            this.KlineData.maxData = (res.data.max*1.1).toFixed(1)
          }

        })
      }
    },

/*
    mounted() {
      this.getriseFallData()
    },
*/

    components: {
      selectDiy,
      explain,
      selectBtn,
      rankingBar,
      priceKline,
      selectTime,
      priceTree
    },
    watch: {
      ApibtnParms(newVal) {
        if (newVal.area && newVal.timeType && newVal.appleType) {
          this.getriseFallData()
        }
      },
      ApiKlineParms(newVal) {
        if (newVal.areas && newVal.timeType && newVal.times && newVal.appleType) {
          this.getKlineData()
          this.$emit('changeName', newVal)
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
    .bigW-option > div:nth-child(1),.bigW-option > div:nth-child(2) {
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
