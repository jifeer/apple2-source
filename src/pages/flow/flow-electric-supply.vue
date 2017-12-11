<template>
  <div class="flow-electric-supply-wrapper big-wrapper">
    <div class="bigW-intro">
      <h2>{{title}}</h2>
      <div class="bigW-option">
        <selectTime @chooseTime="_chooseTime" :timeTypeData="timeTypeData" defaultTimeType="月度" url="apple/circulation/getDsChannelDropTime"></selectTime>
        <explain :eText="eText"></explain>
      </div>
    </div>
    <div class="bigW-chart">
      <div class="chart-left">
        <supplyPie :supplypie="supplypie" @changePie='_changePie'></supplyPie>
      </div>
      <div class="chart-right">
        <rankingEchart :rankingEchart="rankingEchart"></rankingEchart>
      </div>
    </div>
    <div class="timeScroll-wrapper" v-show='isShow'>
      <timeScroll :scorllOption="scorllOption" @scorllTime="scorllTime"></timeScroll>
    </div>
  </div>
</template>

<script>
  import selectTime from 'components/selectTime/selectTime';
  import explain from 'components/explain/explain';
  import rankingEchart from 'pages/flow/echarts/flow-ranking';
  import supplyPie from 'pages/flow/echarts/flow-supplypie';
  import timeScroll from 'components/timeScroll/timeScroll'

  export default {
    data() {
      return {
        timeTypeData: ['月度', '年度'],
        eText: '数据来源于电商平台（天猫、淘宝），起始于2017年5月，级别为全国、市级。',
        btnIndex: 0,
        timeType: 'month',
        years: '',
        title: '',
        date: '',
        isShow: true,
        saleType: 1,
        rankName: '产地配送',
        scorllOption: {
          width: '100%', //宽
          height: '100px', //高
          id: 'flowIndexs',  //随便写ID  保证同一个页面ID不一样就可以
          url: 'apple/circulation/getDsFeaturesTime?year='
        },
        rankingEchart: {
          id: "electric-ranking",
          yAxisData: [],
          yNumber: [],
          data: [],
          option: {
            title: {
              text: '产地配送排行（吨）',
              textStyle: {
                color: '#fff',
              },
              left: 'center',
              top: '20',

            },
            grid: {
              left: 130,
              top: 60,
              bottom: 20
            },
          }
        },
        supplypie: {
          id: "electric-pie",
          yAxisData: [],
          yNumber: [],
          data: [],
          option: {
            title: {
              text: '电商产地、销地配送量占比',
            },
          }
        }
      }
    },

    computed: {
      supplyPieParms() {
        return {
          timeType: this.timeType,
          date: this.years ? this.years : this.date,
        }
      },
      FeaturesOrderParms() {
        return {
          timeType: this.timeType,
          date: this.years ? this.years : this.date,
          saleType: this.saleType
        }
      }
    },
    watch: {
      supplyPieParms(newVal) {
        if (newVal.timeType && newVal.date) {

          this.supplyPie()
          this.supplyTitle()
        }
      },
      FeaturesOrderParms(newVal) {
        if (newVal.timeType && newVal.date && newVal.saleType) {
          this.renderChart()

        }
      }
    },
    mounted() {
      this.renderChart()
      this.supplyPie()//饼图
      this.supplyTitle()
    },
    methods: {

      /*饼图点击*/
      _changePie(name) {
//      console.log(name)
        name == '产地配送' ? this.saleType = 1 : this.saleType = 2;
        this.rankName = name;
      },
      _chooseTime(val) {
        if (val.timeType == 'year') {
          this.isShow = false;
          this.years = val.time
        } else {
          this.isShow = true;
          this.years = ''
        }
//      console.log(this.date)
//      console.log(this.years)
        this.timeType = val.timeType
      },
      scorllTime(time) {
        this.date = time;
      },
      supplyPie() {

        this.$xhr.get('apple/circulation/getDsFeaturesAys', {
          params: {
            ...this.supplyPieParms
          }
        }).then((res) => {
          this.supplypie.data = res.data.dSData.data
//        console.log(res)
        })


      },
      supplyTitle() {

        this.$xhr.get('apple/circulation/getDsZbByYearTitle', {
          params: {
            ...this.supplyPieParms
          }
        }).then((res) => {
          this.title = res.data.showTime + '苹果电商销量产地配送占比' + res.data.showValue

        })


      },
      renderChart() {
        this.$xhr.get('apple/circulation/getDsFeaturesOrder', {
          params: {
            ...this.FeaturesOrderParms
          }
        }).then((res) => {
          this.rankingEchart.yAxisData = res.data.xdata,
            this.rankingEchart.option.title.text = this.rankName + '排行（吨）'
          //this.rankingEchart.yNumber = [10,9,8,7,6,5,4,3,2,1];
          this.rankingEchart.data = res.data.ydata
        })

      }
    },
    components: {
      selectTime,
      explain,
      supplyPie,
      timeScroll,
      rankingEchart
    }

  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
.bigW-intro{
  display: flex;
  justify-content:space-between;
}
  .timeScroll-wrapper {
    margin-top: 30px;
  }

  .selectTime-wrapper {
    width: 4.6rem
  }

  .flow-electric-supply-wrapper {
    height: 100%;
    padding-bottom: 0;
    box-sizing: border-box;
  }

  .bigW-chart {
    width: 100%;
    height: calc(100% - 2.16rem);
    font-size: 0;
    display: flex;
    .chart-left {
      flex: 1;
    }
  ;
    .chart-right {
      flex: 1;
    }
  }


</style>
