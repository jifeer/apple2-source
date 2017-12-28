<template>
  <div class="flow-salesto-wrapper big-wrapper">
    <h3 class="big-title">{{arearank}}{{title}}</h3>
    <div class="bigW-option">
      <selectBtn :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="changeBtn"></selectBtn>
      <!--<div class="btn-into">{{areaType}}:</div>-->
      <selectDiy @change="changeDiy" :url="url" v-if="url" :defaultOption="defaultArea"></selectDiy>
      <explain :eText="eText"></explain>
    </div>
    <div class="bigW-chart">
      <div class="chart-left">
        <STchart :echartsData="echartsData" :seriesName="seriesName"></STchart>
      </div>
      <div class="chart-right">
        <STDetails :echartsDatab="echartsDatab"></STDetails>
      </div>

    </div>
    <div class="timeScroll-wrapper">
      <timeScroll :scorllOption="scorllOption" @scorllTime="scorllTime" v-if='scorllOption.url'></timeScroll>
    </div>
  </div>


</template>

<script>
  import selectTime from 'components/selectTime/selectTime'
  import selectBtn from 'components/selectBtn/selectBtn'
  import selectDiy from 'components/selectDiy/selectDiy'
  import selectArea from 'components/selectArea/selectArea'
  import timeScroll from 'components/timeScroll/timeScroll'
  import explain from 'components/explain/explain'
  import STchart from './echarts/flow-STchart.vue'
  import STDetails from './echarts/flow-STDetails.vue'
  import {rightBarMixin} from 'assets/js/common.js'

  export default {
    name: 'SalesTo',
    data() {
      return {
        btnData: ['主产区', '主销区'],
        // title:'2016年我国鲜苹果出口前三国家为孟加拉国、印度、泰国，第一进口来源为美国。',
        eText: '数据起始于2008年1月，级别为全国、省级，来源于农业部。',
        myowndata: '这里可以定义自己的属性 生产1111',
        screenWidth: document.body.clientWidth,
        btnIndex: 0,
        areaType: '主产区',
        selectDiyData: [
          {name: '陕西', value: 1},
          {name: '山东', value: 2}
        ],
        arearank: '',
        url: '',
        marketName: '去向',
        seriesName: '',
        echartsData: {
          id: "salesto",
          xdata: [],
          data: [],
          option: {}
        },
        areas: '',
        marketclass: '',
        year: '',
        title: '',
        scorllOption: {
          width: '100%', //宽
          height: '50px', //高
          needDefault: true,
          id: 'flowSl',  //随便写ID  保证同一个页面ID不一样就可以
          url: ''
        },
        echartsDatab: {
          id: "stdetails",
          xdata: [],
          data: [],
          option: {
            legend: {
              show: true,
              top: "top",
              data: ["第一季度", "第二季度", "第三季度", "第四季度"],
              textStyle: {
                color: "#fff",
                fontSize: 16
              },
              itemWidth: 14,
              itemHeight: 7,
            },
            xAxis: {
              axisLabel: {
                fontSize: 16
              }
            },
            yAxis: {
              nameTextStyle: {
                fontSize: '16'
              },
              axisLabel: {    //坐标轴刻度标签的相关设置。
                textStyle: {
                  fontSize: 16
                }
              },
            },
            grid: {
              top: "20%"
            }
          }
        },

      }
    },
    mounted() {

    },
    computed: {
      flowSalesParms() {
        return {
          areas: this.areas,
          marketclass: this.marketclass,
          year: this.year,
        }
      },
      defaultArea() {
        return this.areaType === '主产区' ? '陕西省' : '浙江省'
      }
    },
    methods: {
      changeBtn(name) {
        if (name == '主产区') {
          this.marketclass = 1;
          this.marketName = '去向';
          this.areaType = '主产区';
          this.url = 'apple/circulation/getDropArea?marketclass=' + this.marketclass + '&date=' + this.year
        } else {
          this.marketclass = 2;
          this.marketName = '来源';
          this.areaType = '主销区';
          this.url = 'apple/circulation/getDropArea?marketclass=' + this.marketclass + '&date=' + this.year
        }
        // console.log(this.url)
      },
      scorllTime(time) {
        this.year = time
        //console.log(time)
      },
      //自定义-下拉框改变
      changeDiy(name) {
        this.seriesName = name
        this.areas = name
      },
      myownEvent() {
        this.changeBar()
      },
      getAearRank() {
        this.$xhr.get('apple/circulation/getYearAys', {
          params: {
            ...this.flowSalesParms
          }
        }).then((res) => {
          let xdata = [], ydata = [];
          res.data[0].data.forEach(function (item, index) {
            xdata.push(item.name)
            ydata.push(item.value)
          })
          this.echartsData.xdata = xdata
          this.echartsData.data = ydata
          this.arearank = res.data[0].time + '年'
        })
      },
      getYearRank() {
        let echartsDatabArr = [];
        this.$xhr.get('apple/circulation/getQuarterAys', {
          params: {
            ...this.flowSalesParms
          }
        }).then((res) => {
          this.echartsDatab.xdata = res.data.rightname
          echartsDatabArr.push(res.data.rightval1, res.data.rightval2, res.data.rightval3, res.data.rightval4)
          this.echartsDatab.data = echartsDatabArr
        })
      },

      changeBar() {
        // 在这里发送请求
        setTimeout(() => {
          this.echartsData.xdata = ['Mon', 'Tue', 'Wed']
          this.echartsData.data = [10, 152, 100]
          this.echartsData.option = {
            yAxis: [
              {
                type: 'value',
//                          name:  'tes22222222222'
              }
            ],
          }
        }, 500)
      }

    },
    components: {
      selectTime,
      selectBtn,
      selectDiy,
      explain,
      STchart,
      selectArea,
      timeScroll,
      STDetails
    },
    watch: {
      flowSalesParms(newVal) {
        this.getAearRank()
        this.getYearRank()
        this.title = this.areas + '富士苹果' + this.marketName
        this.scorllOption.url = 'apple/circulation/getDetectTimes?marketclass=' + this.marketclass + '&areas=' + encodeURI(this.areas)

      }
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .big-window-wrapper .big-window-cont > div {
    height: calc(100% - 0.92rem);
  }

  h3.big-title {
    font-weight: bold;
  }

  .bigW-option {
    display: flex;
    justify-content: flex-end;
    .option-right-wrapper > div {
      margin-right: 0.2rem;
    }

    .btn-into {
      color: #0372b1;
      display: flex;
      align-items: center;
    }
  }

  .bigW-option > div {
    margin-left: 0.2rem;
  }

  .bigW-chart {
    margin-top: 0.5rem;
    display: flex;
    height: calc(100% - 1.68rem);
    font-size: 0;
    .chart-left, .chart-right {
      flex: 1;
    }

  }

  .timeScroll-wrapper {
    width: 100%;
    margin-top: .5rem;
  }


</style>
