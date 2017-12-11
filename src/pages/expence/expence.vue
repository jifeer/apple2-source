<template>
  <div class="product-wrapper">
    <leftBar></leftBar>
    <div class="cont">
      <div class="cont-top cont-item">
        <h3 class="body-header">{{bdArea}}苹果消费</h3>
        <div class="body-filter">
          <selectTime class="selectTime" :timeTypeData="timeTypeData" @chooseTime="_bdChooseTime" url="apple/consume/status/consumeTotalTimes" defaultTimeType="年度"></selectTime>
          <selectDiy @change="_bdChangeDiy" url="apple/consume/status/getArea?requestNum=20" defaultOption="中国"></selectDiy>
          <explain>中国消费量=产量-净出口-损耗，净出口量=鲜苹果出口量-鲜苹果进口量+苹果汁出口量*8，损耗=产量*8%；数据来源农业部。全球消费数据来源FAO，*年份表示预测数据</explain>
        </div>
        <div class="body-cont">
          <div class="bar">
            <body-bar :flag="flag" @toBodyPie="fromBodyBar" :data="echartsDataLeft" v-if="Object.keys(echartsDataLeft).length" class="bar-chart"></body-bar>
          </div>
          <div class="pie">
            <body-pie :data="echartsDataRight" v-if="Object.keys(echartsDataRight).length" class="pie"></body-pie>
          </div>
        </div>
      </div>
      <div class="cont-bt cont-item">
        <p class="trade-bottom-title"></p>
        <div class="body-filter">
          <selectBtn :btnData="btnData" :btnIndex.sync="btnIndex" @changeBtn="_changeBtn"></selectBtn>
          <explain>数据来源于FAO，起始于1993年，级别为全球、各国。</explain>
        </div>
        <div class="body-cont">
          <body-consumption-person :data="ApiDataDown" :selectType="selectType" v-if="Object.keys(ApiDataDown).length"></body-consumption-person>
        </div>
      </div>
      <div class="small-window-wrapper">
        <smallWindow class="window1" :isShow="window1" whichWindow="window1" @closeWindow="closeWindow" @openBigWindow="openBigWindow" title="全国鲜苹果消费产地来源偏好">
          <small-bar-one :data="smallBar1Data" v-if="smallBar1Data.length"></small-bar-one>
        </smallWindow>
        <smallWindow class="window2" @closeWindow="closeWindow" :isShow="window2" whichWindow="window2" title="全国鲜苹果消费产品偏好" @openBigWindow="openBigWindow">
          <small-pie :data="small2PieData" v-if="small2PieData.length"></small-pie>
        </smallWindow>
        <smallWindow class="window3" @closeWindow="closeWindow" :isShow="window3" whichWindow="window3" title="苹果国内消费需求影响因素" @openBigWindow="openBigWindow">
          <small-bar-two :data="largeBar5Data" v-if="Object.keys(largeBar5Data).length"></small-bar-two>
        </smallWindow>
      </div>
    </div>
    <div class="right-bar-wrapper">
      <ul>
        <li :class="{'active':active1}" @click="showSmall('window1')"><i class="iconfont icon-chandi"></i></li>
        <li :class="{'active':active2}" @click="showSmall('window2')"><i class="iconfont icon-shangpinzhonglei"></i></li>
        <li :class="{'active':active3}" @click="showSmall('window3')"><i class="iconfont icon-gongqiu"></i></li>
      </ul>
    </div>
    <bigWindow title="全国鲜苹果消费产地来源偏好" :isShow="bigwindow1" whichWindow="bigwindow1" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <div class="big-one bigpop">
        <h3 class="desc">
          <span>{{big1Title}}</span>
        </h3>
        <div class="big-filter">
          <selectBtn :btnData="monthOrYear" @changeBtn="_big1ChooseTime" :btnIndex.sync="bigBtn1" class="marginRight"></selectBtn>
          <explain>数据来源于电商平台（天猫、淘宝），起始于2017年5月，级别为全国、省级。</explain>
        </div>
        <big-bar-one class="echart" :data="largeBar1Data" v-if="largeBar1Data.length"></big-bar-one>
        <div class="timeScroll-wrapper">
          <timeScroll :scorllOption="scorllOption1" @scorllTime="_scorllTime"></timeScroll>
        </div>
      </div>
    </bigWindow>
    <bigWindow title="全国鲜苹果消费产品偏好" :isShow="bigwindow2" whichWindow="bigwindow2" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <div class="big-two bigpop">
        <h3 class="desc">
          <span>{{big2Title}}</span>
        </h3>
        <div class="big-filter">
          <selectDiy @change="_big2ChangeDiy" url="apple/consume/feature/getCity"></selectDiy>
          <selectBtn :btnData="monthOrYear" @changeBtn="_big2ChooseTime" :btnIndex.sync="bigBtn2" class="marginRight"></selectBtn>
          <explain>数据来源于电商平台（天猫、淘宝），起始于2017年5月，级别为全国、省级。</explain>
        </div>
        <div class="charts-container">
          <big-pie class="echart" title="0" :key="0" :data="ApiBig2Pie"></big-pie>
          <big-pie class="echart" title="1" :key="1" :data="ApiBig3Pie"></big-pie>
          <big-pie class="echart" title="2" :key="2" :data="ApiBig4Pie"></big-pie>
        </div>
        <div class="timeScroll-wrapper">
          <timeScroll :scorllOption="scorllOption2" @scorllTime="_scorllTime2"></timeScroll>
        </div>
      </div>
    </bigWindow>
    <bigWindow title="苹果国内消费需求影响因素" :isShow="bigwindow3" whichWindow="bigwindow3" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <div class="big-three bigpop">
        <div class="item item-top">
          <div class="big-filter">
            <explain>模型使用双对数多元线性回归（即固定弹性模型），回归系数即为苹果消费需求量对该变量弹性。弹性系数表示自变量变化1%导致国内消费需求量变化Y%。</explain>
          </div>
          <big-bar-two class="echart" :data="largeBar5Data" v-if="Object.keys(largeBar5Data).length"></big-bar-two>
        </div>
        <div class="item item-bt">
          <h3 class="desc">
            <!--<span>2004年度后苹果消费需求增速小于收入增速</span>-->
            <span>{{big3Title}}</span>
          </h3>
          <div class="big-filter">
            <selectDiy :data="selectData" @change="_queryType" :btnIndex.sync="selectIndex"></selectDiy>
          </div>
          <big-line class="echart" :data="largeLine6Data" v-if="Object.keys(largeLine6Data).length"></big-line>
        </div>
      </div>
    </bigWindow>
  </div>
</template>
<script>
  import selectBtn from 'components/selectBtn/selectBtn'
  import Explain from 'components/explain/explain'
  import SelectTree from 'components/selectTree/selectTree'
  import selectArea from 'components/selectArea/selectArea';
  import selectTime from 'components/selectTime/selectTime'
  import selectDiy from 'components/selectDiy/selectDiy'
  import timeScroll from 'components/timeScroll/timeScroll'

  import { rightBarMixin } from 'assets/js/common.js'
  import BodyConsumptionPerson from './echarts/body/consumptionPerson'
  import BodyBar from './echarts/body/bar'
  import BodyPie from './echarts/body/pie'
  import SmallBarOne from './echarts/small/bar-one'
  import SmallBarTwo from './echarts/small/bar-two'
  import SmallPie from './echarts/small/pie'
  import BigBarOne from './echarts/big/bar-one'
  import BigBarTwo from './echarts/big/bar-two'
  import BigPie from './echarts/big/pie'
  import BigLine from './echarts/big/line'

  export default {
    mixins: [rightBarMixin],
    name: 'expence',
    data() {
      return {
        ymData: ['月度', '年度'],

        scorllOption1: { //时间轴
          width: '100%',
          height: '40px',
          id: 'big-one',
          needDefault: true,
          url: ''
        },
        scorllOption2: {
          width: '100%',
          height: '40px',
          id: 'big-two',
          needDefault: true,
          url: ''
        },

        bigBtn1: 0,
        bigBtn2: 0,
        btnIndex: 1, // selectBtn 组件
        btnIndexbig2: 1, // 大弹窗
        btnData: [{ // selectBtn 组件
          name: '消费总量',
          value: 0
        }, {
          name: '鲜食消费',
          value: 1
        }, {
          name: '加工消费',
          value: 2
        }],

        bdTime: '', //主图时间
        pieTime: '', // 饼图时间
        bdArea: '', //主图地区
        selectType: '', //主图鲜食消费

        big1Time: '', //大弹窗1时间
        scorllTime: '', // 弹窗1时间轴 的时间
        sdApple: '', //山东苹果占比

        big2Area: '', //大弹窗2地区
        big2Time: '', //大弹窗2时间
        scorllTime2: '', // 弹窗2时间轴 的时间

        topGrade: '', //最受欢迎公斤
        topDiameter: '', //最受欢迎果径
        topWeight: '', //最受欢迎单件重量

        queryType: '', //大弹窗3折线弹性参数

        ApiDataDown: {},
        ApiBig2Pie: [], // 大弹窗2 饼图1的数据
        ApiBig3Pie: [], // 大弹窗2 饼图2的数据
        ApiBig4Pie: [], // 大弹窗2 饼图3的数据
        ApiSmall2Pie: [], // 小弹窗2 的数据
        flag: [
          [0, 3],
          [3, 5],
          [5, 6],
          [6, 13]
        ],
        echartsDataLeft: {},
        echartsDataRight: {},
        smallBar1Data: {},
        small2PieData: {},

        smallPie2Data: {},
        largeBar1Data: {},
        largeBar5Data: {},
        largeLine6Data: {},
        timeTypeData1: ['年度'],
        timeTypeData: [],
        monthOrYear: [{ name: '月度', value: 'month' }, { name: '年度', value: 'year' }],
        //areaId: '370000',

        selectIndex: 1,
        selectData: [{
          name: '需求价格弹性',
          value: 0
        }, {
          name: '需求收入弹性',
          value: 1
        }, {
          name: '需求交叉价格弹性',
          value: 2
        }],
      }
    },
    mounted() {
      //this.getEchartsDataLeft();
      //this.getEchartsDataDown();
      //this.getsmallPie2Data();
      //this.getlargeBar1Data();
      this.getlargeBar5Data();
      this.getBig1Time();
      this.getBig2Time()
      //this.getlargeLine6Data();
    },
    computed: {
      //大弹窗1的标题
      big1Title() {
        let bigTimeType1 = this.big1Time === 'year' ? '年' : '月';
        let time1 = '';
        if (this.big1Time === 'month') {
          time1 = this.scorllTime.slice(0, 4) + '年' + this.scorllTime.slice(4)
        } else {
          time1 = this.scorllTime
        }
        return `${time1}${bigTimeType1}山东苹果销量占电商总量的${this.sdApple}%`
      },
      //大弹窗2的标题
      big2Title() {
        let bigTimeType2 = this.big2Time === 'year' ? '年' : '月';
        let time2 = '';
        if (this.big2Time === 'month') {
          time2 = this.scorllTime2.slice(0, 4) + '年' + this.scorllTime2.slice(4)
        } else {
          time2 = this.scorllTime2
        }
        return `${time2}${bigTimeType2}价格${this.topGrade}元/公斤、果径${this.topDiameter}mm、包装重量${this.topWeight}公斤的苹果最受消费者欢迎`
      },
      //大弹窗3的标题
      big3Title() {
        //console.log(typeof this.queryType);
        if (this.queryType === '0') {
          return '2004年度后苹果消费需求增速小于收入增速'
        } else if (this.queryType === '1') {
          return '需求价格弹性多为负值，表明价格上涨需求下降'
        } else {
          return '替代品价格对苹果需求量有正向影响'
        }
      },
      //主图1参数
      echartsDataLeftParms() {
        return {
          area: this.bdArea,
          years: this.bdTime
        }
      },
      echartsDataRightParms() {
        return {
          area: this.bdArea,
          year: this.pieTime
        }
      },
      //主图3参数
      ApiDataDownParms() {
        return {
          area: this.bdArea,
          years: this.bdTime,
          type: this.selectType,
        }
      },
      //小弹窗1参数
      smallBar1DataParms() {
        return {
          TIME_TYPE: this.big1Time,
          TIME_ID: this.scorllTime,
        }
      },
      //大弹窗1参数
      largeBar1DataParms() {
        return {
          TIME_TYPE: this.big1Time,
          TIME_ID: this.scorllTime,
        }
      },
      //小弹窗2饼图参数
      small2PieDataParms() {
        return {
          TIME_ID: this.scorllTime2,
          AREA_NAME: '全国',
          TIME_TYPE: this.big2Time
          //TIME_ID: '201701,201702,201703,201704,201705,201706,201707,201708,201709,201710,201711,201712'
        }
      },
      //大弹窗2饼图参数
      ApiBig2PieParms() {
        return {
          TIME_ID: this.scorllTime2,
          AREA_NAME: this.big2Area,
          TIME_TYPE: this.big2Time
          // TIME_ID: '201701,201702,201703,201704,201705,201706,201707,201708,201709,201710,201711,201712'
        }
      },
      //地区与  年度/月度  滚动轴参数
      scorllParms() {
        return {
          TIME_TYPE: this.big2Time,
          AREA_NAME: this.big2Area,
        }
      },
      //弹窗3折线图参数
      largeLine6DataParms() {
        return {
          queryType: this.queryType,
          //queryType: '0'
        }
      }
    },
    methods: {
      // 主图时间参数 捕获
      _bdChooseTime(bdTime) {
        this.bdTime = bdTime.time
        let arr = bdTime.time.split(',')
        // this.pieTime = (arr[arr.length - 1]).toString()
      },
      //主图地区参数 捕获
      _bdChangeDiy(area) {
        this.bdArea = area
      },
      // 消费总量、鲜食消费、加工消费 参数捕获
      _changeBtn(val) {
        this.selectType = val
        //console.log(val)
      },
      // 大弹窗1时间参数 捕获
      _big1ChooseTime(big1Time) {
        this.big1Time = big1Time;
        this.scorllOption1.url = `apple/consume/feature/getRegionTime?TIME_TYPE=${big1Time}`;
        //console.log(this.scorllOption);
        //console.log(big1Time)
      },
      //大弹窗2地区参数 捕获
      _big2ChangeDiy(value) {
        this.big2Area = value
      },
      //大窗口2时间 类型 月度年度参数 捕获
      _big2ChooseTime(big2Time) {
        this.big2Time = big2Time;
      },
      //时间轴
      _scorllTime(time) {
        this.scorllTime = time
        //console.log(time)
      },
      //大窗口3折线图参数 捕获
      _queryType(item) {
        this.queryType = item.value.toString();
        //console.log(this.queryType)
      },
      _scorllTime2(time2) {
        this.scorllTime2 = time2
        //console.log(this.scorllTime2)
      },
      //获取主页面顶部折柱图数据
      getEchartsDataLeft() {
        this.$xhr.get('apple/consume/status/consumeTotals', {
          params: {
            ...this.echartsDataLeftParms
          }
        }).then((res) => {
          this.echartsDataLeft = res.data
          let lastYear = res.data.year[res.data.year.length - 1]
          this.pieTime = lastYear.toString()
          //console.log(this.echartsDataLeft.totalData)
        })
      },
      // 获取主体页面 饼图数据
      getEchartsDataRight() {
        // this.echartsDataRight.data = [{name:'加工消费',value:'3500'},{name:'鲜食消费',value:'1600'}];
        let me = this;
        //console.log(me.pieTime)
        this.$xhr.get('apple/consume/status/consumeYearStructure', {
          params: {
            ...this.echartsDataRightParms
          }
        }).then((res) => {
          this.echartsDataRight = res.data
        })
      },
      //获取主页面底部折线图数据
      getEchartsDataDown() {
        this.$xhr.get('apple/consume/status/perCapitaConsumer', {
          params: {
            ...this.ApiDataDownParms
          }
        }).then((res) => {
          this.ApiDataDown = res.data;
          //console.log(this.ApiDataDown);
        })
      },
      //获取小窗1数据
      getBig1Time() {
        this.$xhr.get('apple/consume/feature/getRegionTime', {
          params: {
            TIME_TYPE: 'month'
          }
        }).then((res) => {
          this.scorllTime = res.data[res.data.length - 1].replace('-', '')
          // 获取时间后 调取柱图数据
          this.getsmallBar1Data()
        })
      },
      getsmallBar1Data() {
        this.$xhr.get('/apple/consume/feature/getVarietyPreferences', {
          params: {
            ...this.smallBar1DataParms
          }
        }).then((res) => {
          this.smallBar1Data = res.data
        })
      },
      //获取大窗1数据
      getlargeBar1Data() {
        this.$xhr.get('/apple/consume/feature/getVarietyPreferences', {
          params: {
            ...this.largeBar1DataParms
          }
        }).then((res) => {
          this.largeBar1Data = res.data;

          //山东苹果占比
          let sdWeight = '';
          let qgWeight = '';
          for (let i = 0; i < this.largeBar1Data.length; i++) {
            //console.log(this.largeBar1Data[i].province)
            if (this.largeBar1Data[i].province == '全国') {
              qgWeight = this.largeBar1Data[i].weight
            } else if (this.largeBar1Data[i].province == '山东') {
              sdWeight = this.largeBar1Data[i].weight
            }
          }
          this.sdApple = (sdWeight / qgWeight).toFixed(2) * 100
          //console.log(this.sdApple)
        })
      },
      // 小弹窗2 饼图的数据获取
      getBig2Time() {
        this.$xhr.get('apple/consume/feature/getRegionTime', {
          params: {
            TIME_TYPE: 'month'
          }
        }).then((res) => {
          this.scorllTime2 = res.data[res.data.length - 1].replace('-', '')
          // 获取时间后 调取饼图数据
          this.getsmall2PieData()
        })
      },
      getsmall2PieData() {
        this.$xhr.get('apple/consume/feature/getPriceGradePreferences', {
          params: {
            //AREA_NAME: '全国',
            // TIME_ID: this.big2Time
            //TIME_ID: '201701,201702,201703,201704,201705,201706,201707,201708,201709,201710,201711,201712'
            ...this.small2PieDataParms
          }
        }).then((res) => {
          this.small2PieData = res.data.sort(function(a, b) {
            return b.value - a.value
          })
          //console.log(this.ApiSmall2Pie)
        })
      },
      // 大弹窗2 饼图1的数据获取
      getlargePie2Data() {
        this.$xhr.get('apple/consume/feature/getPriceGradePreferences', {
          params: {
            ...this.ApiBig2PieParms
          }
        }).then((res) => {
          this.ApiBig2Pie = res.data.sort(function(a, b) {
            return b.value - a.value
          });
          //最受欢迎公斤
          this.topGrade = this.ApiBig2Pie[0].name;
          //console.log(this.ApiBig2Pie[0].name)
        })
      },
      //大弹窗2 饼图2的数据获取
      getlargePie3Data() {
        this.$xhr.get('apple/consume/feature/getFruitDiameterPreference', {
          params: {
            ...this.ApiBig2PieParms
          }
        }).then((res) => {
          this.ApiBig3Pie = res.data.sort(function(a, b) {
            return b.value - a.value
          });
          //最受欢迎果径
          this.topDiameter = this.ApiBig3Pie[0].name
        })
      },
      //大弹窗2 饼图3的数据获取
      getlargePie4Data() {
        this.$xhr.get('apple/consume/feature/getSinglePieceWeight', {
          params: {
            ...this.ApiBig2PieParms
          }
        }).then((res) => {
          this.ApiBig4Pie = res.data.sort(function(a, b) {
            return b.value - a.value
          });
          //最受欢迎单件重量
          this.topWeight = this.ApiBig4Pie[0].name
        })
      },
      //获取大窗3柱状图数据
      getlargeBar5Data() {
        this.$xhr.get('apple/consume/waring/influenceFactors', {
          params: {}
        }).then((res) => {
          this.largeBar5Data = res.data;
        })
      },
      //获取大窗3折线图数据
      getlargeLine6Data() {
        this.$xhr.get('apple/consume/waring/singleInfluenceFactor', {
          params: {
            //queryType: '0'
            ...this.largeLine6DataParms
          }
        }).then((res) => {
          this.largeLine6Data = res.data
          //console.log(this.largeLine6Data.time)
        })
      },

      //接受柱图传来的数据
      fromBodyBar(params) {
        //console.log(params);
        this.pieTime = params.name;
        //console.log(this.pieTime)
      }
    },
    components: {
      selectDiy,
      SelectTree,
      selectBtn,
      selectArea,
      selectTime,
      Explain,
      timeScroll,
      BodyConsumptionPerson,
      BodyBar,
      BodyPie,
      SmallBarOne,
      SmallBarTwo,
      SmallPie,
      BigBarOne,
      BigBarTwo,
      BigPie,
      BigLine,
    },
    watch: {
      echartsDataLeftParms(newVal) {
        //console.log(newVal)
        if (newVal.area && newVal.years) {
          this.getEchartsDataLeft()
          //this.getEchartsDataRight()
        }
      },
      echartsDataRightParms(newVal) {
        if (newVal.area && newVal.year) {
          this.getEchartsDataRight()
        }
      },
      ApiDataDownParms(newVal) {
        if (newVal.area && newVal.years && newVal.type) {
          this.getEchartsDataDown()
        }
        //console.log(newVal)
      },
      smallBar1DataParms(newVal) {
        let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
        let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
        if (flag1 || flag2) {
          this.getsmallBar1Data()
        }
      },
      largeBar1DataParms(newVal) {
        let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
        let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
        if (flag1 || flag2) {
          this.getlargeBar1Data()
        }
      },
      largeLine6DataParms(newVal) {
        if (newVal.queryType) {
          this.getlargeLine6Data()
        }
      },
      small2PieDataParms(newVal) {
        let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
        let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
        //console.log(newVal)
        if ((flag1 && newVal.AREA_NAME) || (flag2 && newVal.AREA_NAME)) {
          this.getsmall2PieData()
        }
      },
      ApiBig2PieParms(newVal) {
        //console.log(newVal)
        let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
        let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
        if ((flag1 && newVal.AREA_NAME) || (flag2 && newVal.AREA_NAME)) {
          this.getlargePie2Data();
          this.getlargePie3Data();
          this.getlargePie4Data();
        }
      },
      scorllParms(newVal) {
        //console.log(newVal)
        if (newVal.TIME_TYPE && newVal.AREA_NAME) {
          this.scorllOption2.url = `apple/consume/feature/getDiameterTime?TIME_TYPE=${encodeURI(newVal.TIME_TYPE)}&AREA_NAME=${encodeURI(newVal.AREA_NAME)}`;
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";

  .cont {
    @include flex(space-between, center, column);
    width: 80%;
    margin: 0 auto;
    padding-bottom: 0.5rem;
    text-align: center;
    color: $cl-main;
    .cont-item {
      @include flex(flex-start, center, column);
      /*border: 1px solid red;*/
      flex: 1 1 1px;
      width: 100%;
      &:last-child {
        margin-bottom: 0;
      }
      .body-header {
        @include flex(center);
        flex: 0 0 0.5rem;
        width: 100%;
        font-size: 0.34rem;
      }
      .trade-bottom-title {
        font-size: 0.26rem;
        color: #fff;
        line-height: 0.54rem;
        height: 0.54rem;
        text-align: center;
      }
      .body-cont {
        flex: 1;
        width: 100%;
      }
      .body-filter {
        flex: 0 0 0.2rem;
        width: 100%;
        color: #fff;
        font-size: 0.18rem;
        .price-title-info {
          width: 3.06rem;
          margin: 0 auto;
          text-align: center;
          padding-top: 0.4rem;
          display: flex;
          justify-content: center;
          p {
            width: 4rem;
          }
        }
      }
    }
    h2 {
      font-size: 0.32rem;
    }
  } // cont-top 样式
  .cont-top {
    .body-cont {
      @include flex(space-between);
    }
    .body-filter {
      @include flex(flex-end);
      margin-top: 0.3rem;
      margin-bottom: 0.2rem;
      /*.selectTime-wrapper .selectTime {*/
      /*border: 0;*/
      /*}*/
      >* {
        margin-left: 0.2rem;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .bar {
      flex: 7 7 7px;
      height: 100%;
      >div {
        height: 100%;
      }
    }
    .pie {
      flex: 3 3 3px;
      height: 100%;
      >div {
        height: 100%;
      }
    }
  }

  .cont-bt {
    .body-header {
      color: #fff;
      font-size: 0.26rem;
    }
    .body-filter {
      @include flex(flex-end);
      >* {
        margin-left: 0.4rem;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .big-three {
    .desc {
      flex: 0 0 auto;
      font-size: 0.26rem;
      padding: 0.15rem 0 0.24rem;
      text-align: center;
    }
  }

  .big-one,
  .big-two {
    @include flex(flex-start, center, column);
    height: 100%;
    >* {
      width: 100%;
      padding-bottom: 0.5rem;
    }
    .desc {
      flex: 0 0 auto;
      font-size: 0.26rem;
      padding: 0.15rem 0 0.24rem;
      // border-bottom: 1px solid #054672;
    }
    .big-filter {
      flex: 0 0 auto;
      @include flex(flex-end);
      height: 0.65rem;
      margin-bottom: 0.4rem;
      padding-bottom: 0;
      .big-time {
        font-size: 14px;
        color: #006DAE;
        padding: 0 30px;
      }
      >* {
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .echart {
      flex: 1;
      @include flex(center);
    }
    .charts-container {
      flex: 1;
      @include flex(space-around);
      .echart {
        flex: 1 1 1px;
        height: 100%;
      }
    }
  }

  .big-one,
  .big-two,
  .big-three {
    height: 100%;
    padding: 0 0.5rem; // background: rgba(255, 0, 0, .3);
  }

  .big-three {
    @include flex(flex-start, center, column);
    height: 100%;
    .item {
      flex: 1 1 1px;
      width: 100%;
    }
    .item-top {
      @include flex(flex-start, flex-start, column);
      /*background: #091B35;*/
      >* {
        width: 100%;
      }
      .big-filter {
        @include flex(flex-end);
        flex: 0 0 auto;
      }
    }
    .item-bt {
      @include flex(flex-start, flex-start, column);
      >* {
        width: 100%;
      }
      .big-filter {
        @include flex(flex-end);
        flex: 0 0 auto;
        .marginRight {
          margin-right: 0.4rem;
        }
      }
      .echart {
        @include flex(center, center);
        flex: 1;
      }
    }
  }

</style>
