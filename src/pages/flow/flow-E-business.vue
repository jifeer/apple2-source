<template>
  <div class="flow-E-business-wrapper big-wrapper">
    <div class="bigW-intro"><!--{{months}}烟台市和咸阳市苹果电商网店最多。-->
      <explain :eText="eText" class="explain"></explain>
    </div>
    <div class="map-echarts-wrapper ">
      <div class="Businesecharts-box">
        <div class="topTitle-consume">
          <div class="spec"><span id="totalNum">{{sum}}</span>家</div>
          <div class="spec_txt">电商网店样本数量</div>
        </div>
        <Businesecharts :echartsData="echartsData"></Businesecharts>
      </div>
      <div class="rank-echarts-wrapper">
        <div class="rank-title">全国网点分布排名（家）</div>
        <div class="rankingEchart-box" v-if="rankingEchartToggle">
          <rankingEchart :rankingEchart="rankingEchart"></rankingEchart>
        </div>
        <div class="show-button">
          <i class="iconfont icon-xiangxia showbutton" @click="hideRanke"></i>
        </div>
      </div>
    </div>
    <div class="timeScroll-wrapper">
      <timeScroll :scorllOption="scorllOption" @scorllTime="scorllTime"></timeScroll>
    </div>
  </div>
</template>

<script>

  import rankingEchart from 'pages/flow/echarts/flow-ranking.vue'
  import Businesecharts from 'pages/flow/echarts/flow-busines-echarts.vue'
  import {geoCoordMap,geoCoordMaps} from 'assets/js/common'
  import timeScroll from 'components/timeScroll/timeScroll'
  import explain from 'components/explain/explain'
  export default {
    data() {
      return {
        date: '',
        sum: 0,
        months: '',
        eText: '数据起始于2017年5月，级别为全国、市级，来源于电商平台（天猫、淘宝）。',
        scorllOption: {
          width: '100%', //宽
          height: '50px', //高
          needDefault: true,
          id: 'flowSl',  //随便写ID  保证同一个页面ID不一样就可以
          url: 'apple/circulation/getDsAysTime'
        },
        echartsData: {
          id: "businesmapChart",
          xdata: [],
          data: [],
          option: {},
          series: []

        },
        rankingEchart: {
          id: "Businesranking",
          yAxisData: [],
          yNumber: [],
          data: [],
          option: {
            grid: {
              left: '32%'
            }
          }
        },
        rankingEchartToggle: true
      }
    },
    mounted() {
      //this.renderChart()
      //this.getDsChannelRanking();
    },
    computed: {
      flowSalesParms() {
        return {
          date: this.date,
        }
      }
    },
    watch: {
      flowSalesParms(newVal) {
        this.renderChart()
        this.getDsChannelRanking();
      }
    },
    methods: {

      scorllTime(time) {
        this.date = time
        //标题上的时间处理
        let newYear = this.date.substr(0, 4)
        let newMonth = (this.date.substr(4, 2)).replace(/\b(0+)/gi,"");
        let titleParams = newYear + '年' + newMonth + '月'
        this.$emit('eBusinessName', titleParams)
      },
      renderChart() {
        this.$xhr.get('apple/circulation/getDsNumberAys', {
          params: {
            ...this.flowSalesParms
          }
        }).then((res) => {
          let objdata = [], obj = {};
          res.data.mapData.forEach(function (name, idx) {
            let vname = name.name;
            //let vcoord = name.coord;
            let vval = name.value;
            //obj[vname] = vcoord;
            objdata.push({'name': vname, 'value': vval})
          })
          this.sum = res.data.mapNum;
          this.months = res.data.showMonth;

          let convertData = function (data) {
            let res = [];
            for (let i = 0; i < data.length; i++) {
              let geoCoord = geoCoordMaps[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                });
              }
            }
            return res;
          };

          let convertedData = [
            convertData(objdata),
            convertData(objdata.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 6))
          ];
          this.echartsData.series = convertedData[0]

        })
      },
      getDsChannelRanking() {
        this.$xhr.get('apple/circulation/getDsChannelRanking', {
          params: {
            ...this.flowSalesParms
          }
        }).then((res) => {
          this.rankingEchart.yAxisData = res.data.areas
          this.rankingEchart.data = res.data.areaData
        })
      },
      hideRanke() {
//              console.log(this.screenWidth)
        this.rankingEchartToggle = !this.rankingEchartToggle
        if (this.rankingEchartToggle) {
          // document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '3.74rem';
          document.getElementsByClassName("showbutton")[0].style.transform = 'rotate(180deg)';
        } else {
          // document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '1.0rem';
          document.getElementsByClassName("showbutton")[0].style.transform = 'rotate(0deg)';

        }
      },
    },
    components: {
      rankingEchart,
      Businesecharts,
      timeScroll,
      explain
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .timeScroll-wrapper {
    width: 100%;
    margin-top: -.5rem;

  }
  .big-wrapper .bigW-intro{
    height:0.4rem;
  }
  .big-wrapper .bigW-intro>div{
    float: right;
    width:0.25rem;
  }
  .selectTime-wrapper {
    width: 4rem
  }

  .topTitle-consume {
    position: absolute;
    left: 0;
    top: .2rem;
    width: 12%;
  }

  .topTitle-consume .spec {
    border-bottom: 1px solid #ccc;
    text-align-last: left;
    line-height: 30px;
  }

  .topTitle-consume .spec #totalNum {
    font-size: .3rem;
    font-weight: bold;
    margin-right: 5px;
    color:#00e9ff;
    /*background-image: -webkit-linear-gradient(top, #00e9ff, #057cff);
    background-image: -moz-linear-gradient(top, #00e9ff, #057cff);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;*/
  }

  .topTitle-consume .spec_txt {
    text-align-last: left;
    line-height: 30px;
  }

  .rank-echarts-wrapper {
    position: absolute;
    z-index: 1;
    top: 0.2rem;
    right: 0;
    width: 4.13rem;
    /*border:1px solid #052a4a;
    box-shadow: #046198 0 0 0.1rem;
    background: rgba(5,18,39,0.5);
    transition: height .3s linear;
    overflow: hidden;*/
    .rank-title {

      height: 0.6rem;
      line-height: 0.6rem;
      color: #dddee0;
      font-size: 0.18rem;
      text-align: center;
    }
    .show-button {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.16rem;
      color: #034058;
      text-align: center;
      cursor: pointer;
      .icon-xiangxia {
        display: block;
      }
    }
    .show-button:hover {
      color: #0174af;
    }

  }

  .Businesecharts-box {
    height:calc(100% - 0.5rem);
    width:100%;
  }

  .rankingEchart-box {
    width: 4rem;
    height: 3.6rem;
  }

  .big-window-cont {
    width: 100%;
    height: 97%;
    display: flex;
  .flow-E-business-wrapper {
      height:100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .map-echarts-wrapper {
        width: 100%;
        flex: 1;
        position: relative;
        z-index: 0;
      }
    }
  }
</style>
