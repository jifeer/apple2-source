<template>
  <div class="price-conduction-wrapper">
    <div class="bigW-intro">
      <!--<h2></h2>-->
      <div class="bigW-option">
        <selectBtn :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="changeBtn"></selectBtn>
        <explain :eText="eText"></explain>
      </div>
    </div>
    <div class="map-echarts-wrapper">
      <Mapecharts :echartsData="echartsData" :auxiliary="auxiliary" :flag.sync="flag" @changeProvince="changeProvince" :flowType="marketclass"></Mapecharts>
      <div class="rank-echarts-wrapper">
        <div class="rank-title">{{rankName}}</div>
        <rankingEchart :rankingEchart="rankingEchart" v-if="rankingEchartToggle"></rankingEchart>
        <div class="show-button" :class="{'active':isHide}" @click="hideRankecharts">
          <i class="iconfont  icon-xiangxia"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Mapecharts from 'pages/price/echarts/price-conduction-echarts.vue'
  import rankingEchart from './echarts/rankingBar.vue'
  import selectBtn from 'components/selectBtn/selectBtn';
  import explain from 'components/explain/explain';
  import {rightBarMixin, geoCoordMap} from 'assets/js/common'

  export default {
    mixins: [rightBarMixin],
    data() {
      return {
        flag: true,
        auxiliary: null,
        btnIndex: 0,
        isHide: true,
        marketclass: 'p2s',
        area: '山东',
        screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
        eText: '以近五年各个产地和销地的价格序列构造向量自回归（VAR）模型，用方差分解确定产地价格对销地价格的影响。贡献度表示产地A对销地B价格波动的影响程度是X%。',
        echartsData: {
          id: "mapChart",
          xdata: [],
          data: [],
          option: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            }
          }

        },
        rankingEchart: {
          id: "rankingEchart",
          yAxisData: [],
          yNumber: [],
          data: [],
          option: {}
        },
        rankingEchartToggle: true,
        btnData: ['主产区', '主销区']
      }
    },
    computed: {
      conductionDataParms() {
        return {
          area: this.area,
          type: this.marketclass
        }
      },
      rankName() {
        //标题处理部分
        return this.marketclass == 'p2s' ? this.area + '对其他地区苹果价格的影响程度排名（%）' : this.area + '受其他地区苹果价格的影响程度排名（%）'
      }
    },
    mounted() {
      this.getConductiondata()
    },
    methods: {
      getConductiondata() {
        this.$xhr.get('apple/price/conduction/getPriceContribute', {
          params: {
            ...this.conductionDataParms
          }
        }).then((res) => {

          let dataArr = [];
          if (res.data.data.length > 0) {
            res.data.data.forEach(function (val, index, arr) {
              dataArr.push(val);
            })
            this.auxiliary = res.data.areas
            this.echartsData.data = [{
              name: this.area,
              data: dataArr
            }]
            this.rankingEchart.yAxisData = res.data.rankName.reverse()
            this.rankingEchart.data = res.data.rankData.reverse()
          }
        })
      },
      changeProvince(provinceName) {
        this.area = provinceName;
      },
      hideRankecharts() {
        this.rankingEchartToggle = !this.rankingEchartToggle
        if (this.rankingEchartToggle) {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '3.74rem'
          this.isHide = true;
        } else {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '1.0rem'
          this.isHide = false;
        }
      },
      changeBtn(val) {
        switch (val) {
          case '主销区':
            this.area = '北京';
            this.marketclass = 's2p';
            this.flag = false;
            this.echartsData.option.lineStyle.normal.type = 'solid';
            break;
          case '主产区':
            this.area = '山东';
            this.marketclass = 'p2s';
            this.flag = true;
            this.echartsData.option.lineStyle.normal.type = 'dashed';
            break;
          default:
        }
      }
    },
    components: {
      Mapecharts,
      rankingEchart,
      selectBtn,
      explain
    },
    watch: {
      conductionDataParms(newVal) {
        if (newVal.type && newVal.area)
          this.getConductiondata()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .price-conduction-wrapper {
    height: 100%;
  }

  .bigW-intro {
    margin: 0 auto;
    padding: 0 0.4rem;
  }

  .map-echarts-wrapper {
    width: 100%;
    height: calc(100% - 1rem);
    margin: 0 auto;
    position: relative;
  }

  ;
  .bigW-option {
    display: flex;
    padding-top: 0.18rem;
    justify-content: flex-end;
  }

  .bigW-option > div {
    margin-right: 0.2rem;
  }

  .selectBtn-wrapper {
    width: 2.2rem;
  }

  .rank-echarts-wrapper {
    position: absolute;
    right: 0.4rem;
    top: 0.5rem;
    width: 3.8rem;
    height: 3.2rem;
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
      &.active {
        i {
          transform: rotate(180deg);
        }
      }
      i {
        display: inline-block;
        transition: all .5s ease;
      }
    }
    .show-button:hover {
      color: #0174af;
    }

  }

  .rank-echarts-wrapper > div {
    width: 100%;
  }
</style>
