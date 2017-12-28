<template>
  <div class="trade-big5-wrapper">
    <div class="trade-big5-top">
      <div class="big-filter">
        <selectDiy :data="selectData" @change="_changeAppleType" class="marginRight"></selectDiy>
        <selectArea :url="areaUrl" @change="_changeArea" class="marginRight" num="4"></selectArea>
        <selectTime @chooseTime="_chooseTime" url="apple/trade/scale/getTime" defaultTimeType="年度" :timeTypeData="timeTypeData" :areaId="area"></selectTime>
        <explain>数据起始于1990年，级别为全球、各国（贸易量排名前十的国家），来源于联合国商品贸易统计数据库。</explain>
      </div>
      <tradeBig5top :data="echartsData1" v-if="echartsData1.length"></tradeBig5top>
    </div>
    <div class="trade-big5-bt">
      <div class="big-filter">
        <explain>某国国际市场占有率=某国出口额/全球出口额；数据起始于1990年，来源于联合国商品贸易统计数据库。</explain>
      </div>
      <tradeBig5bt :data="echartsData2" v-if="echartsData2.length"></tradeBig5bt>
    </div>
  </div>
</template>
<script>
  import selectDiy from 'components/selectDiy/selectDiy'
  import explain from 'components/explain/explain'
  import selectArea from 'components/selectArea/selectArea';
  import selectTime from 'components/selectTime/selectTime';

  import tradeBig5top from './big/trade-big5-chart.vue';
  import tradeBig5bt from './big/trade-big5-chart2.vue';

  import { rightBarMixin } from 'assets/js/common.js'
  export default {
    name: 'trade-big5',
    data() {
      return {
        title: '2016年中国鲜苹果出口前三国家为孟加拉国、印度、泰国，第一进口来源为美国。',
        timeType: 'year',
        selectData: ['鲜苹果', '苹果干', '苹果汁'],
        timeTypeData: [],
        rankingEchartToggle: false,
        btnData: ['出口', '进口'],
        //btnData2:['月度','年度'],
        echartsData1: [],
        echartsData2: [],
        appleType: '',
        time: '',
        area: ''
      }
    },
    mounted() {
      // this.getData()
    },
    computed: {
      ApiParams() {
        return {
          TIME_ID: this.time,
          AREA: this.area,
          PRODUCT: this.appleType
        }
      },
      areaUrl() {
        return `apple/trade/internationalStatus/getArea?product=${this.appleType}`
      }
    },
    methods: {
      // 鲜苹果下拉
      _changeAppleType(val) {
        this.appleType = val
      },
      //月度、年度按钮切换
      _chooseTime(val) {
        this.time = val.time
      },
      // 地区下拉
      _changeArea(val) {
        this.area = val
       // alert(val)
      },

      getData() {
        this.$xhr.get('apple/trade/internationalStatus', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          this.echartsData1 = res.data.slice(0)
          this.echartsData2 = res.data.slice(0)
        })
      }
    },
    components: {
      selectDiy,
      selectTime,
      selectArea,
      explain,
      tradeBig5top,
      tradeBig5bt,
    },
    watch: {
      ApiParams(val) {
        if (val.TIME_ID && val.AREA && val.PRODUCT) {
          this.getData()
          this.$emit('bigSenvenTitle', val)
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .trade-big5-wrapper {
    height: 100%;
    width: 100%;
    padding: 0 1px;
    box-sizing: border-box;
    .trade-big5-top {
      background-color: #0a1c34;
    }
    .trade-big5-top,
    .trade-big5-bt {
      height: 45%;
      width: 100%;
      /*border: 1px solid red;*/
      .big-filter {
        flex: 0 0 auto;
        padding: 0 .4rem;
        @include flex(flex-end);
        height: 0.5rem;
        .big-time {
          font-size: 14px;
          color: #006DAE;
          padding: 0 30px;
        }
        .marginRight {
          margin-right: 0.4rem;
        }
      }
    }
  }

</style>
