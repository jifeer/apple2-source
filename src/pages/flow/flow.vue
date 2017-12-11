<template>
  <div class="product-wrapper">
    <leftBar></leftBar>
    <div class="cont">
      <div class="flow-title-info">
        <h2>{{myowndata}}</h2>
      </div>
      <div class="selectWrapper">
        <p>
          <selectBtn :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="changeBtn"></selectBtn>
        </p>
        <div class="textinfo">
          <explain :eText="eText"></explain>
        </div>
      </div>
      <div class="map-echarts-wrapper">
        <div class="Mapecharts-box">
          <Mapecharts :echartsData="echartsData" :auxiliary="auxiliary" :flag.sync="flag" @changeProvince="changeProvince" :flowType="marketclass"></Mapecharts>
          <div class="timeScroll-wrapper">
            <timeScroll :scorllOption="scorllOption" @scorllTime="scorllTime"></timeScroll>
          </div>
        </div>
        <div class="rank-echarts-wrapper">
          <div class="rank-title">{{ranktitleName}}</div>
          <div class="rank-box" v-if="rankingEchartToggle">
            <rankingEchart :rankingEchart="rankingEchart"></rankingEchart>
          </div>
          <div class="show-button" :class="{'active':isHide}" @click="hideRankecharts">
            <i class="iconfont  icon-xiangxia"></i>
          </div>
        </div>
      </div>
      <div class="small-window-wrapper">
        <smallWindow class="window1" :isShow="window1" whichWindow="window1" @closeWindow="closeWindow" @openBigWindow="openBigWindow" title="">
          <SalesTosm ref="small1"></SalesTosm>
        </smallWindow>
        <smallWindow class="window2" @closeWindow="closeWindow" :isShow="window2" whichWindow="window2" title="" @openBigWindow="openBigWindow">
          <flowEbusinessSM></flowEbusinessSM>
        </smallWindow>
        <smallWindow class="window3" @closeWindow="closeWindow" :isShow="window3" whichWindow="window3" title="全国鲜苹果电商销量" @openBigWindow="openBigWindow">
          <EBsalesSmall></EBsalesSmall>
        </smallWindow>
        <smallWindow class="window4" @closeWindow="closeWindow" :isShow="window4" whichWindow="window4" title="全国鲜苹果电商渠道销售特点" @openBigWindow="openBigWindow">
          <flowWlectricSupplySmall></flowWlectricSupplySmall>
        </smallWindow>
      </div>
    </div>
    <div class="right-bar-wrapper">
      <ul>
        <li :class="{'active':active1}" @click="showSmall('window1')"><i class="iconfont icon-xianlu"></i></li>
        <li :class="{'active':active2}" @click="showSmall('window2')"><i class="iconfont icon-dingwei"></i></li>
        <li :class="{'active':active3}" @click="showSmall('window3')"><i class="iconfont icon-qushitu"></i></li>
        <li :class="{'active':active4}" @click="showSmall('window4')"><i class="iconfont icon-tezhengxuanze-"></i></li>
      </ul>
    </div>
    <bigWindow title="" :isShow="bigwindow1" whichWindow="bigwindow1" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <SalesTo ref="big1"></SalesTo>
    </bigWindow>
    <bigWindow  :title="eBusinesstitle" :isShow="bigwindow2" whichWindow="bigwindow2" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <flowEbusiness ref="big2" @eBusinessName="eBusinessName"></flowEbusiness>
    </bigWindow>
    <bigWindow title="全国鲜苹果电商销量" :isShow="bigwindow3" whichWindow="bigwindow3" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <EBsales ref="big3"></EBsales>
    </bigWindow>
    <bigWindow title="全国鲜苹果电商销售特点" :isShow="bigwindow4" whichWindow="bigwindow4" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <flowElectricSupply ref="big4"></flowElectricSupply>
    </bigWindow>
  </div>
</template>
<script>
  import smallModule1 from 'pages/flow/flow-small1.vue'
  import Mapecharts from 'pages/flow/echarts/flow-index.vue'
  import rankingEchart from 'pages/flow/echarts/flow-ranking.vue'
  import EBsales from 'pages/flow/flow-electric-sales.vue'
  import EBsalesSmall from 'pages/flow/flow-electric-sales-small.vue'
  import flowBig1 from 'pages/flow/flow-big1.vue'
  import selectBtn from 'components/selectBtn/selectBtn'
  import flowEbusiness from './flow-E-business'
  import SalesTo from 'pages/flow/flow-SalesTo.vue'
  import timeScroll from 'components/timeScroll/timeScroll'
  import SalesTosm from 'pages/flow/flow-SalesTosm.vue'
  import flowEbusinessSM from 'pages/flow/flow-E-businessSM.vue'
  import flowElectricSupply from './flow-electric-supply'
  import flowWlectricSupplySmall from './flow-electric-supply-small.vue';
  import {rightBarMixin} from 'assets/js/common.js'
  import explain from 'components/explain/explain'

  export default {
    mixins: [rightBarMixin],
    data() {
      return {
        flag: true,
        auxiliary: null,
        btnIndex: 0,
        isHide: false,
        marketclass: 1,
        rankName: '',
        ranktitleName: '',
        eBusinesstitle:'',
        area: '',
        marketName: '去向',
        scorllOption: {
          width: '14rem', //宽
          height: '100px', //高
          needDefault: true, //是否需要默认的时间来渲染图表
          id: 'flowIndex', //随便写ID  保证同一个页面ID不一样就可以
          url: 'apple/circulation/getTimes?marketclass=1&areas=全国'
        },
        screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
        eText: '数据来源于农业部，主产区数据起始于2016年1月，主销区数据起始于2008年1月，级别为全国、省级。',
        echartsData: {
          id: "mapChart",
          xdata: [],
          data: [],
          option: {}

        },
        rankingEchart: {
          id: "rankingEchart",
          yAxisData: [],
          yNumber: [],
          data: [],
          option: {}
        },
        rankingEchartToggle: false,
        date: '',
        myowndata: '',
        btnData: ['主产区', '主销区']

      }
    },
    computed: {
      flowDataParms() {
        return {
          areas: this.area,
          marketclass: this.marketclass,
          date: this.date,
        }
      }
    },
    mounted() {
      this.myowndata = '2017年10月富士苹果流向分析'
      this.ranktitleName = '陕西富士苹果去向排名(吨)'
      //this.getFlowdata()
    },
    methods: {
      getFlowdata() {
        this.$xhr.get('apple/circulation/getCriculationDetect', {
          params: {
            ...this.flowDataParms
          }
        }).then((res) => {
          let dataArr = [];
          //console.log(res)
          if (res.data.data.length > 0) {
            res.data.data.forEach(function (val, index, arr) {
              dataArr.push(...val.data);
            })
            this.auxiliary = res.data.bgColorData
            this.echartsData.data = [{
              name: this.area,
              data: dataArr
            }]
            this.rankingEchart.yAxisData = res.data.rankname
            this.rankingEchart.data = res.data.rankdata

            //处理标题部分
            this.myowndata = res.data.requestMonth + this.area + '富士苹果流向分析'

          }
        })
      },
      scorllTime(time) {
        this.date = time;
      },
      eBusinessName(name) {
        this.eBusinesstitle = name + '全国鲜苹果电商网店分布'
      },
      changeProvince(provinceName) {
        this.area = provinceName;
        //判断主销区的北京单位用%其它用吨
        let unit = this.area  == '北京' && this.marketclass == 2 ? '%' : '吨'
        this.ranktitleName = this.area + '苹果' + this.marketName + '排名('+ unit + ')'
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
        this.area = '全国';
        switch (val) {
          case '主销区':
            this.marketclass = 2;
            this.marketName = '来源';
            this.flag = false;
            //this.echartsData.option.lineStyle.normal.type = 'solid';
            this.ranktitleName = '浙江富士苹果来源排名(吨)'
            break;
          case '主产区':
            this.marketclass = 1;
            this.flag = true;
            this.marketName = '去向';
            //this.echartsData.option.lineStyle.normal.type = 'dashed';
            this.ranktitleName = '陕西富士苹果去向排名(吨)'
            break;
          default:
        }

      }
    },
    components: {
      smallModule1,
      Mapecharts,
      rankingEchart,
      EBsales,
      EBsalesSmall,
      flowElectricSupply,
      flowWlectricSupplySmall,
      flowBig1,
      selectBtn,
      timeScroll,
      flowEbusiness,
      SalesTo,
      SalesTosm,
      flowEbusinessSM,
      explain
    },
    watch: {
      flowDataParms(newVal) {
        if (newVal.marketclass && newVal.areas && newVal.date) {
          this.getFlowdata()
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";

  .cont {
    text-align: center;
    color: $cl-main;
  }

  .selectWrapper {
    display: flex;
    justify-content: flex-end;
    p {
      width: 3rem;
      text-align: right;
      margin-right: 0.2rem;
    }
    .textinfo {
      * {
        text-align: justify !important;
      }
    }
  }

  .flow-title-info {
    display: flex;
    justify-content: center;
    h2 {
      font-size: $size*34rem;
      color: #00B064;
      flex: 2;
    }
  }

  .map-echarts-wrapper {
    width: 80%;
    margin: 0 auto;
  }

  .rank-echarts-wrapper {
    position: absolute;
    top: 2.6rem;
    right: 2rem;
    width: 3.13rem;
    .rank-title {
      height: 0.6rem;
      line-height: 0.6rem;
      color: #dddee0;
      font-size: 0.18rem;
      text-align: center;
    }
    .rank-box {
      width: 3.18rem;
      height: 3.15rem;
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

  .map-echarts-wrapper {
    width: 100%;
    height: 100%;
  }

  .Mapecharts-box {
    height: calc(100% - 1rem);
  }

  .mapChart-wrapper {
    height: 100%;
  }

  .mapChart-wrapper > div {
    height: 100%;
  }

</style>
