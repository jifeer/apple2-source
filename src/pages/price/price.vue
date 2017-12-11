<template>
  <div class="product-wrapper">
    <leftBar></leftBar>
    <div class="cont">
      <div class="price-title-info">
        <h2>{{titleDate}}</h2>
      </div>
      <div class="selectWrapper">
        <p>
          <selectBtn :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="changeBtn"></selectBtn>
        </p>
        <explain :eText="eText" class="help-text"></explain>
      </div>
      <div class="map-echarts-wrapper">
        <div class="Mapecharts-box">
          <Mapecharts :echartsData="echartsData" @changeProvince="changeProvince" class="map-echarts"></Mapecharts>
        </div>
        <div class="rank-echarts-wrapper">
          <div class="rank-title">批发价格排名(元/公斤)</div>
          <rankingEchart :rankingEchart="rankingEchart" v-if="rankingEchartToggle"></rankingEchart>
          <div class="show-button" :class="{'active':isHide}" @click="hideRankecharts">
            <i class="iconfont  icon-xiangxia"></i>
          </div>
        </div>
      </div>
      <div class="small-window-wrapper">
        <smallWindow class="window1" :isShow="window1" whichWindow="window1" @closeWindow="closeWindow" @openBigWindow="openBigWindow" title="山东富士苹果批发价格走势">
          <riseFallsmall ref="small1"></riseFallsmall>
        </smallWindow>
        <smallWindow class="window2" @closeWindow="closeWindow" :isShow="window2" whichWindow="window2" title="全国富士苹果价格季节性规律" @openBigWindow="openBigWindow">
          <seasonalLawSmall ref="small2"></seasonalLawSmall>
        </smallWindow>
        <smallWindow class="window3" @closeWindow="closeWindow" :isShow="window3" whichWindow="window3" title="全国富士苹果批发价格地区性传导机制" @openBigWindow="openBigWindow">
          <conductionEchart ref="small3"></conductionEchart>
        </smallWindow>
        <smallWindow class="window4" @closeWindow="closeWindow" :isShow="window4" whichWindow="window4" title="全国富士苹果批发价格时滞性" @openBigWindow="openBigWindow">
          <delaySmall></delaySmall>
        </smallWindow>
        <smallWindow class="window5" @closeWindow="closeWindow" :isShow="window5" whichWindow="window5" title="全国鲜苹果各环节价格比较" @openBigWindow="openBigWindow">
          <trendSmall></trendSmall>
        </smallWindow>
        <smallWindow class="window6" @closeWindow="closeWindow" :isShow="window6" whichWindow="window6" title="全国富士苹果批发价格影响因素" @openBigWindow="openBigWindow">
          <elementSmall></elementSmall>
        </smallWindow>
        <smallWindow class="window7" @closeWindow="closeWindow" :isShow="window7" whichWindow="window7" title="全国富士苹果批发价格预测及涨跌预警" @openBigWindow="openBigWindow">
          <Warningsmall></Warningsmall>
        </smallWindow>
      </div>
    </div>
    <div class="right-bar-wrapper">
      <ul>
        <li :class="{'active':active1}" @click="showSmall('window1')"><i class="iconfont icon-xiaoliang"></i></li>
        <li :class="{'active':active2}" @click="showSmall('window2')"><i class="iconfont icon-diqiu1"></i></li>
        <li :class="{'active':active3}" @click="showSmall('window3')"><i class="iconfont icon-ditu"></i></li>
        <li :class="{'active':active4}" @click="showSmall('window4')"><i class="iconfont icon-jiazai"></i></li>
        <li :class="{'active':active5}" @click="showSmall('window5')"><i class="iconfont icon-jiage1"></i></li>
        <li :class="{'active':active6}" @click="showSmall('window6')"><i class="iconfont icon-gongqiu"></i></li>
        <li :class="{'active':active7}" @click="showSmall('window7')"><i class="iconfont icon-tongji"></i></li>
      </ul>
    </div>
    <bigWindow :title="selectName" :isShow="bigwindow1" whichWindow="bigwindow1" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <riseFallbig @changeName="changeName" ref="big1"></riseFallbig>
    </bigWindow>
    <bigWindow title="全国富士苹果价格季节性规律" :isShow="bigwindow2" whichWindow="bigwindow2" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <seasonalLawBig ref="big2"></seasonalLawBig>
    </bigWindow>
    <bigWindow title="全国富士苹果批发价格地区性传导机制" :isShow="bigwindow3" whichWindow="bigwindow3" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <conductionEchartBig ref="big3"></conductionEchartBig>
    </bigWindow>
    <bigWindow title="全国富士苹果批发价格时滞性" :isShow="bigwindow4" whichWindow="bigwindow4" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <delayBig></delayBig>
    </bigWindow>
    <bigWindow title="全国鲜苹果各环节价格趋势比较" :isShow="bigwindow5" whichWindow="bigwindow5" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <trendBig></trendBig>
    </bigWindow>
    <bigWindow title="全国富士苹果批发价格影响因素" :isShow="bigwindow6" whichWindow="bigwindow6" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <elementBig></elementBig>
    </bigWindow>
    <bigWindow title="全国富士苹果批发价格预测及涨跌预警" :isShow="bigwindow7" whichWindow="bigwindow7" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <Warningbig></Warningbig>
    </bigWindow>
  </div>
</template>
<script>
  import selectBtn from 'components/selectBtn/selectBtn'
  import explain from 'components/explain/explain';

  import { rightBarMixin } from 'assets/js/common.js'

  import Mapecharts from 'pages/price/echarts/price-index.vue'
  import rankingEchart from './echarts/rankingBar.vue'
  import priceRiseFallbig from 'pages/price/price-riseFall-big.vue'
  import conductionEchart from 'pages/price/price-conduction-small.vue'
  import conductionEchartBig from 'pages/price/price-conduction-big.vue'
  import seasonalLawSmall from 'pages/price/price-seasonal-small.vue'
  import seasonalLawBig from 'pages/price/price-seasonal-big.vue'
  import riseFallsmall from 'pages/price/price-riseFall-small.vue'
  import riseFallbig from 'pages/price/price-riseFall-big.vue'
  import Warningsmall from './price-warning-small.vue'
  import Warningbig from './price-warning-big.vue'
  import elementSmall from './price-element-small.vue'
  import elementBig from './price-element-big.vue'
  import delaySmall from './price-delay-small.vue'
  import delayBig from './price-delay-big.vue'
  import trendSmall from './price-trend-small.vue'
  import trendBig from './price-trend-big.vue'

  import { convertData, geoCoordMap, provinceList } from 'assets/js/common'
  //import axios from 'axios';
  export default {
    mixins: [rightBarMixin],
    name: 'price',
    data() {
      return {
        btnData: ['日度', '周度', '月度', '年度'],
        eText: '数据来源于农业部。',
        isHide: false,
        proviceName: '山东',
        selectName: '',
        btnIndex: 3,
        echartsData: {
          data: [],
          option: {}
        },
        rankingEchart: {
          yAxisData: [],
          data: [],
          option: {}

        },
        rankingEchartToggle: false,
        isShowArea: '',
        titleDate: '',
        TIME_ID: 'year'
      }
    },
    computed: {
      priceMonitorParms() {
        return {
          TIME_ID: this.TIME_ID
        }
      }
    },
    mounted() {
      this.getMonitordata()
    },
    methods: {
      changeBtn(name) {
        let _timeType = ''
        switch (name) {
          case '年度':
            _timeType = "year"
            break;
          case "月度":
            _timeType = "month"
            break;
          case '周度':
            _timeType = "week"
            break;
          case '日度':
            _timeType = "day"
            break;
          default:
            'year'
        }
        this.TIME_ID = _timeType;
      },
      changeName(name) {
        this.selectName = name + '富士苹果批发价格走势及涨跌情况'
      },
      /*rankingBar() {
        this.rankingEchart.yAxisData = ['山东', '陕西', '山西', '河北', '河南', '浙江', '江苏', '甘肃', '湖北', '湖南'];
        this.rankingEchart.data = [200, 189, 155, 132, 166, 178, 198, 132, 145, 152];
        //this.rankingEchart.yNumber = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      },*/
      //处理地图和排名的方法
      getMonitordata() {
        //`/apple/production/ranking?TIME_ID=${time}&type=${type}`
        this.$xhr.get('apple/price/monitor/getRealTime', {
          params: {
            ...this.priceMonitorParms
          }
        }).then((res) => {
          //console.log(res);
          if (res.data.data.lenght < 1) {
            return false;
          } else {
            //地图需要的数据
            this.echartsData.data = res.data.data
            //排名需要的数据
            this.rankingEchart.yAxisData = res.data.rank.name.reverse()
            this.rankingEchart.data = res.data.rank.value.reverse()
            //console.log(res.data.titleDate)
            /**** 处理日期的格式 ****/
            let date = (res.data.titleDate.date).replace(/-0/g, '-');
            if (this.TIME_ID == 'day') {
              let newDate = date.split('-');
              this.titleDate = newDate[0] + '年' + newDate[1] + '月' + newDate[2] + '日' + '全国富士苹果批发价格实时监测'
            } else if (this.TIME_ID == 'month') {
              let newDate = date.split(',');
              let newDate1 = newDate[0].split('-');
              let newDate2 = newDate[1].split('-');
              let newTitleDate = newDate1[0] + '年' + newDate1[1] + '月' + newDate1[2] + '日' + '-' + newDate2[1] + '月' + newDate2[2] + '日' + '全国富士苹果批发价格实时监测';
              this.titleDate = newTitleDate
            } else {
              let newDate = date.split(',');
              let newDate1 = newDate[0].split('-');
              let newDate2 = newDate[1].split('-');
              let newTitleDate = newDate1[0] + '年' + newDate1[1] + '月' + newDate1[2] + '日' + '-' + newDate2[1] + '月' + newDate2[2] + '日';
              this.titleDate = newTitleDate + '全国富士苹果批发价格实时监测'
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      /*      renderMap() {
       let data = [
       {name: "上海", value: 102.76},
       {name: "甘肃", value: 14.29},
       {name: "贵州", value: 6.12},
       {name: "海南", value: 3.4},
       {name: "安徽", value: 92.96},
       {name: "江苏", value: 239.27},
       {name: "浙江", value: 74.79},
       {name: "新疆", value: 37.38},
       {name: "广东", value: 77.64},
       {name: "福建", value: 62.54},
       {name: "广西", value: 3.36},
       {name: "河南", value: 202.06},
       {name: "湖北", value: 40.31},
       {name: "湖南", value: 11.19},
       {name: "江西", value: 37.55},
       {name: "北京", value: 57.34},
       {name: "吉林", value: 20.89},
       {name: "辽宁", value: 67.42},
       {name: "黑龙江", value: 21.21},
       {name: "山东", value: 326.43},
       {name: "山西", value: 77.75},
       {name: "河北", value: 114.15},
       {name: "陕西", value: 55.26},
       {name: "四川", value: 48.64}
       ]
       this.echartsData.data = data



       },*/
      hideRankecharts() {
        //console.log(this.screenWidth)
        this.rankingEchartToggle = !this.rankingEchartToggle
        if (this.rankingEchartToggle) {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '3.74rem'
          this.isHide = true;
        } else {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '1.0rem'
          this.isHide = false;
        }
      },
      changeProvince(param) {
        //console.log(param)
        this.isShowArea = '>' + param
        /* let SDdata = [
           {name: "青岛", value: 37.55},
           {name: "济南", value: 57.34},
           {name: "淄博", value: 20.89},
           {name: "辽宁", value: 67.42},
           {name: "日照", value: 21.21}
         ]
         this.echartsData.data = SDdata*/
        //地图下钻的数据处理
        /*this.$xhr.get('apple/price/monitor/province', {
          params: {
            TIME_ID: this.TIME_ID,
            //AREA_ID: this.param
          }
        }).then((res) => {
          console.log(res);
          if (res.data.data.lenght < 1) {
            return false;
          } else {
            //地图需要的数据
            this.echartsData.data = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })*/

      },
      showChianMap() {
        this.echartsData.option.series[0].map = 'china'
      }
    },
    components: {
      selectBtn,
      explain,
      Mapecharts,
      rankingEchart,
      priceRiseFallbig,
      conductionEchart,
      conductionEchartBig,
      Warningsmall,
      Warningbig,
      elementSmall,
      elementBig,
      seasonalLawSmall,
      seasonalLawBig,
      riseFallsmall,
      riseFallbig,
      delaySmall,
      delayBig,
      trendSmall,
      trendBig
    },
    watch: {
      priceMonitorParms(newVal) {
        if (newVal.TIME_ID) {
          this.getMonitordata()
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .cont {
    text-align: center;
    color: $cl-main;
  }

  .selectWrapper {
    margin-top: 0.3rem;
    display: flex;
    justify-content: flex-end;
    p {
      margin-right: 0.2rem;
    }
    .help-text {
      color: #fff;
      margin-right: 0;
    }
  }

  .price-title-info {
    h2 {
      font-size: 0.34rem;
      color: #00B064;
    }
    width: 100%;
    text-align: tenter;
    display: flex;
    justify-content: center;
  }

  .map-echarts-wrapper {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
  }

  .rank-echarts-wrapper {
    position: absolute;
    top: 2.5rem;
    right: 1.8rem;
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

  .title-list {
    height: 0.5rem;
    display: flex;
    text-align: start;
    padding-top: 0.2rem;
    box-sizing: border-box;
    .map-title {
      font-size: 0.24rem;
      color: #fff;
      font-weight: normal;
      flex: 1;
      text-align: center;
    }
    .map-list {
      flex: 1;
      text-align: left;
      cursor: pointer;
      height: 0.4rem;
      left: 0.4rem;
      z-index: 0;
      color: #40b0fc;

      span:not(:first-child):hover {
        color: #00B064;
      }
    }
  }

  .Mapecharts-box {
    position: relative;
    height: calc(100% - 0.23rem);
  }

  .Mapecharts-box .map-echarts {
    height: 100%;
    width: 100%;
  }

</style>
