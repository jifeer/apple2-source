<template>
  <div class="forecast-big-wrapper">
    <div class="forecast-wrapper">
      <div class="forecast-title">
        <div class="title-con"><!--产量和收入是影响价格的主要因素，2004年度之后影响更显著--></div>
        <div class="price-title-info">
          <explain :eText="eText"></explain>
        </div>
      </div>
      <div class="echats-box">
        <elementBar v-if="this.chartBarData.Xdata.length" :chartBar="chartBarData"></elementBar>
      </div>
    </div>
    <div class="forecast-wrapper">
      <div class="forecast-title bottom-title">
        <div class="title-con">批发价格与{{selectType}}</div>
        <selectDiy :data="selectData" @change="_changePriceType"></selectDiy>
      </div>
      <div class="echats-box">
        <elementLine v-if="this.echartsLineData.Xdata.length" :linechart="echartsLineData"></elementLine>
      </div>
    </div>
  </div>
</template>

<script>
  import {$, rightBarMixin} from 'assets/js/common.js'
  import elementBar from './echarts/price-element-bar.vue'
  import elementLine from './echarts/price-element-line.vue'
  import selectDiy from '../../components/selectDiy/selectDiy.vue'
  import SelectBtn from '../../components/selectBtn/selectBtn.vue'
  import Explain from '../../components/explain/explain.vue'

  export default {

    name: 'warning-big',
    data() {
      return {
        chooseToggle: true,
        eText: '模型使用双对数多元线性回归（即固定弹性模型），回归系数即为苹果价格对该变量弹性。弹性系数表示自变量变化1%导致价格变化Y%。数据来源于农业部。',
        selectData: ['产量变化率', '总净出口变化率', '食品类居民消费价格指数变化率', '国内生产总值变化率'],
        priceType: 1,
        chartBarData: {
          Xdata: [],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          option: {
          }
        },
        echartsLineData: {
          Xdata: [],
          yName:'',
          legendData:[],
          data1: [],
          data2: [],
          option: {
            xAxis: {
              name:'年度',
              nameTextStyle: {
                fontSize: 16,
                color: '#fff',
               padding: [150, 20, 0, 0]
              }
            },
           dataZoom: [],
            grid: {
              bottom: '15%',
              left: '3%'
            }
          }
        },
        selectType:'产量变化率'
      }
    },
    computed: {
      ApiElementParams() {
        return {}
      },
      ApiElementLineParams() {
        //console.log(this.priceType)
        return {
          queryType: this.priceType
        }
      }
    },
    mounted() {
      this.getElementData(),
        this.getElementLineData()
    },
    methods: {
      // 下拉框 参数捕获
      _changePriceType(item) {
        let lengend = ['批发价格变化率',item]
        this.echartsLineData.yName = item
        this.echartsLineData.legendData = lengend

        let _priceType = ''
        if (item == "产量变化率") {
          _priceType = 1
          this.selectType = "产量变化率"
        }
        if (item == "总净出口变化率") {
          _priceType = 2
          this.selectType = "总净出口变化率"
        }
        if (item == "食品类居民消费价格指数变化率") {
          _priceType = 3
          this.selectType = "食品类居民消费价格指数变化率"
        }
        if (item == "国内生产总值变化率") {
          _priceType = 4
          this.selectType = "国内生产总值变化率"
        }
        this.priceType = _priceType
      },
      /*getElementData() {
        //折线的数据
        this.chartBarData.Xdata = ['2006-2007年度', "2008-2019年度"]
        this.chartBarData.data1 = [5, 1]
        this.chartBarData.data2 = [2, -1]
        this.chartBarData.data3 = [4, -3]
        this.chartBarData.data4 = [-1, 4]
      }*/
      getElementData() {
        //柱图的数据
        this.$xhr.get('apple/price/influence/impact', {
          params: {
            ...this.ApiElementParams
          }
        }).then((res) => {
          //console.log(res)
          this.chartBarData.Xdata = res.data.time
          this.chartBarData.data1 = res.data.data[0].data
          this.chartBarData.data2 = res.data.data[1].data
          this.chartBarData.data3 = res.data.data[2].data
          this.chartBarData.data4 = res.data.data[3].data
        })
      },
      getElementLineData() {
        //柱图的数据
        this.$xhr.get('apple/price/influence/supplyDemandAndPrice', {
          params: {
            ...this.ApiElementLineParams
          }
        }).then((res) => {
          this.echartsLineData.Xdata = res.data.time
          this.echartsLineData.data1 = res.data.pfjgdata
          this.echartsLineData.data2 = res.data.bhldata
        })
      }
    },

    components: {
      elementBar,
      SelectBtn,
      Explain,
      selectDiy,
      elementLine
    },
    watch: {
      ApiElementParams(newVal) {
        this.getElementData()
      },
      ApiElementLineParams(newVal) {
        this.getElementLineData()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .big-window-cont {
    width: 100%;
    height: calc(100% - 0.92rem);
  }

  .selectArea-title {
    text-align: center;
  }

  .forecast-big-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.62rem 0.3rem;
    box-sizing: border-box;
  }

  .forecast-wrapper {
    flex: 1;
    .echats-box {
      height: calc(100% - 0.52rem);
    }
    .echats-box > div {
      height: 100%;
    }
  }

  .forecast-title {
    display: flex;
    font-size: 0.22rem;
    align-items: center;
    justify-content: space-between;
  }
.bottom-title{
  margin-bottom: 0.2rem;
}
  .price-title-info {
    display: flex;
    justify-content: space-between;
  }
</style>
