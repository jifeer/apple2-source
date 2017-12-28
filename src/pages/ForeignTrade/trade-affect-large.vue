<template>
  <div class="trade-big7-wrapper">
    <div class="trade-big7-top">
      <div class="big-filter">
        <explain>模型使用双对数多元线性回归（即固定弹性模型），回归系数即为苹果需求量对该变量弹性。弹性系数表示自变量变化1%导致苹果出口量（折算鲜苹果）变化Y%。其中，主要目标国为美国、俄罗斯、日本、荷兰、德国、加拿大、澳大利亚。</explain>
      </div>
      <tradeBig7top :data="echartsData1" v-if="echartsData1Flag"></tradeBig7top>
    </div>
    <div class="trade-big7-bt">
      <div class="big-filter down">
        <div class="title">{{downTitle}}</div>
        <selectDiy :data="selectData" @change="_changeFactors" class="marginRight radioDiy"></selectDiy>
      </div>
      <tradeBig7bt :data="echartsData2" v-if="echartsData2Flag"></tradeBig7bt>
    </div>
  </div>
</template>
<script>
  import tradeBig7top from './big/trade-big7-chart.vue';
  import tradeBig7bt from './big/trade-big7-chart2.vue';

  import explain from 'components/explain/explain'
  import selectDiy from 'components/selectDiy/selectDiy'

  import { rightBarMixin } from 'assets/js/common.js'
  export default {
    name: 'trade-small1',
    data() {
      return {
        selectData: ['主要目标国苹果产量变化率', '国内苹果产量变化率', '人民币对美元汇率变化率', '鲜苹果出口价格变化率', '苹果汁出口价格变化率'],
        ExplainText: '解释说明解释说明解释说明',
        rankingEchart: {
          id: "rankingEchart",
          yAxisData: [],
          yNumber: [],
          data: [],
          option: {}
        },
        rankingEchartToggle: false,
        btnData: ['出口', '进口'],
        btnData2: ['月度', '年度'],

        factors: '',            // 图表2 的参数
        echartsData1: {},
        echartsData1Flag: false,    // 图表一数据过来时的 flag
        echartsData2: {},
        echartsData2Flag: false     // 图表二 数据过来时的 flag
      }
    },
    mounted() {
      this.getEchartData1()
      this.getEchartData2()
    },
    computed: {
      downTitle() {
        switch(this.factors) {
          case '主要目标国苹果产量变化率':
            return '苹果贸易量与主要目标国苹果产量的相关性不明显'
            break
          case '鲜苹果出口价格变化率':
            return '苹果贸易量与鲜苹果出口价格呈正相关'
            break
          case '苹果汁出口价格变化率':
            return '苹果贸易量与苹果汁出口价格的相关性不明显'
            break
          case '国内苹果产量变化率':
            return '苹果贸易量与国内苹果产量呈负相关'
            break
          case '人民币对美元汇率变化率':
            return '苹果贸易量与人民币对美元汇率呈弱正相关'
            break
          default:
            return '苹果贸易量与国内苹果产量呈负相关'
        }
      }
    },
    methods: {
      // 下拉参数捕获
      _changeFactors(val) {
        this.factors = val
      },

      getEchartData1() {
        this.$xhr.get('apple/trade/influenceFactorsAnalysis').then((res) => {
          this.echartsData1 = res.data
          this.echartsData1Flag = true
        })
      },
      getEchartData2() {
        this.echartsData2.xdata = ['2002', '2004', '2006', '2008', '2010', '2012', '2014', '2016'];
        this.echartsData2.data1 = [-2, 3, 1, 3, 4, 1.5, 1.6, 0]
        this.echartsData2.data2 = [3, 0, 2, 1, -2, 1, 0.5, 3]
        this.$xhr.get('apple/trade/fiveBig', {
          params: {
            FACTORS: this.factors
          }
        }).then((res) => {
          this.echartsData2 = res.data
          this.echartsData2Flag = true
        })
      }
    },
    components: {
      tradeBig7top,
      tradeBig7bt,
      explain,
      selectDiy
    },
    watch: {
      factors(val) {
        if (val) {
          this.getEchartData2()
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .trade-big7-wrapper {
    height: 100%;
    width: 100%;
    padding: 0 1px;
    box-sizing: border-box;
    .trade-big7-top {
      background: #091B35;
    }
    .trade-big7-top,
    .trade-big7-bt {
      .big-filter {
        flex: 0 0 auto;
        @include flex(flex-end);
        position: relative;
        top: 15px;
        height: 0.6rem;
        padding: 0 .4rem;
        .marginRight {
          margin-right: 0.4rem;
        }
      }
      height: 45%;
      width: 100%;
    }
  }

  .radioDiy {
    width: 2.7rem;
  }

  .down {
    justify-content: space-between !important;
    font-size: 0.22rem;
  }
</style>
