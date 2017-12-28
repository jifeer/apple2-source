<template>
  <div class="product-historical-wrapper big-wrapper trade-large-wrapper">
    <div class="bigW-option">
      <selectDiy :data="selectData" @change="_changeAppleType" class="marginRight"></selectDiy>
      <selectArea url="apple/trade/history/getArea" @change="_changeArea" class="marginRight" num="2"></selectArea>
      <selectBtn :btnData="btnData" :btnIndex.sync="btnIndex" @changeBtn="_changeExport" class="marginRight"></selectBtn>
      <selectTime @chooseTime="_chooseTime" url="apple/trade/history/getTime" :timeTypeData="timeTypeData" defaultTimeType="年度" :areaId="area"  class="marginRight"></selectTime>
      <explain>月度年度数据起始于1994年，来源于联合国商品贸易统计数据库；</explain>
    </div>
    <div class="large-chart">
      <tradeVolumeChart :data="echartsData" v-if="echartsData.length && time.length" class="world-chart" :time="time" :timeType="timeType"></tradeVolumeChart>
    </div>
  </div>
</template>
<script>
  import selectTime from 'components/selectTime/selectTime'
  import selectDiy from 'components/selectDiy/selectDiy'
  import selectArea from 'components/selectArea/selectArea'
  import selectBtn from 'components/selectBtn/selectBtn'
  import explain from 'components/explain/explain'
  import tradeVolumeChart from './big/trade-volume-bigl-chart'

  import { rightBarMixin } from 'assets/js/common.js'
  import { resizeMixin, $ } from 'assets/js/common'
  import { dataZoom, tooltipStyle, axisLabel } from 'assets/js/echarts-style'

  export default {
    name: 'trade-small1',
    data() {
      return {
        btnIndex: 0,
        title: '',
        timeTypeData: ['月度', '年度'],
        selectData: ['鲜苹果', '苹果干', '苹果汁'],
        btnData: ['出口', '进口'],

        appleType: '', // 苹果类型
        time: '', // 时间参数
        timeType: '', // 月度 年度
        export: '', // 出口 进口
        area: '', // 地区
        echartsData: []
      }
    },
    mounted() {},
    computed: {
      ApiParams() {
        return {
          TIME_ID: this.time,
          NAME: this.export,
          AREA: this.area,
          PRODUCT: this.appleType
        }
      }
    },
    methods: {
      // 时间参数捕获
      _chooseTime(time) {
        this.time = time.time
        this.timeType = time.timeType
      },
      // 进出口按钮切换
      _changeExport(val) {
        this.export = val
      },
      //地区-下拉框改变
      _changeArea(area) {
        this.area = area
        //alert(area)
      },
      //自定义-下拉框改变
      _changeAppleType(val) {
        this.appleType = val
      },
      getData() {
        this.$xhr.get('apple/trade/history', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          this.echartsData = res.data
        })
      }
    },
    components: {
      selectDiy,
      selectTime,
      selectArea,
      selectBtn,
      explain,
      tradeVolumeChart
    },
    watch: {
      ApiParams(val) {
        if (val['TIME_ID'] && val['NAME'] && val['AREA'] && val['PRODUCT']) {
          this.$emit('bigSixTitle', val)
          this.getData()
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";
  .large-chart-wrapper {
    width: 100%;
    height: 100%;
  }

  .trade-large-wrapper {
    display: flex;
    height: calc(100% - 0.5rem);
    flex-flow: column nowrap;
  }

  .marginRight {
    margin-right: 0.4rem;
  }

  .large-chart {
    position: relative;
    flex: 1;
    display: flex;
    margin-top: 0.2rem;
    justify-content: space-between;
  }

  .large-chart-left {
    display: flex;
    flex: 1;
  }

  .world-chart {
    flex: 1;
  }

  .rank-echarts-wrapper {
    position: absolute;
    top: 0;
    right: 0.2rem;
    width: 3.13rem;
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
    }
    .show-button:hover {
      color: #0174af;
    }
  }

  .big-wrapper {
    padding-bottom: 0.7rem;
    height: 100%;
    box-sizing: border-box;
  }
</style>
