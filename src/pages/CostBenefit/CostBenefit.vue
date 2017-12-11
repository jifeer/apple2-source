<template>
  <div class="product-wrapper">
    <leftBar></leftBar>
    <div class="cont">
      <div class="product-content">
        <h2>{{myowndata}}</h2>
        <!--<i class="iconfont icon-renyuan"></i>-->
        <div class="cbchart-wrapper big-wrapper">
          <!--<div class="bigW-intro title">2017年苹果净利润<span>6789</span>元/亩，折算每公斤<span>4.3</span>元</div>-->
          <div class="bigW-option top-title">
            <!--:timeTypeData="timeTypeData"-->
            <selectTime class="selectTime" @chooseTime="_chooseTime" url="apple/income/getTime?timeType=1" defaultTimeType="年度"></selectTime>
            <selectArea class="select" @change="_changeArea" url="apple/income/getArea"></selectArea>
            <selectBtn class="selectBtn" @changeBtn="_changeBtn" :btnIndex.sync="btnIndex" :btnData="btnData"></selectBtn>
            <explain :eText="eText"></explain>
          </div>
          <div class="cbchart-box">
            <CBchart :aa="aa" @toCostStructure="fromCBchart" :cbchartData="cbchartData"></CBchart>
          </div>
        </div>
        <div class="charts-wrapper big-wrapper">
          <!--<div class="bigW-intro bigW-center">
          	<p>{{year}}{{areas}}苹果种植成本结构分析</p>
          </div>-->
          <div class="clearfix p-content">
            <div class="help"></div>
            <div class="pie-title">{{pieTitleLeft}}</div>
            <div class="pie-title">{{pieTitleRight}}</div>
            <p>
              <explain :eText="eText2"></explain>
            </p>
          </div>
          <div class="clearfix charts-content">
            <div class="charts-box costStructure">
              <costStructure :aa="aa" @toCostBenefit="fromCostStructure" :csPieData="csPieData" :pieTitleInfo="pieTitleInfo"></costStructure>
            </div>
            <div class="charts-box costDetails">
              <costDetails :aa="aa" :cdPieData="cdPieData" :pieTitleInfo="pieTitleInfo"></costDetails>
            </div>
          </div>
        </div>
      </div>
      <div class="small-window-wrapper">
        <smallWindow class="window1" :isShow="window1" whichWindow="window1" @closeWindow="closeWindow" @openBigWindow="openBigWindow" title="我国苹果主产区人工成本变化趋势">
          <!--<plantingCostSM></plantingCostSM>-->
          <laborCostSM></laborCostSM>
        </smallWindow>
        <smallWindow class="window2" @closeWindow="closeWindow" :isShow="window2" whichWindow="window2" title="我国苹果主产区土地成本变化趋势" @openBigWindow="openBigWindow">
          <landCostSM></landCostSM>
        </smallWindow>
        <smallWindow class="window3" @closeWindow="closeWindow" :isShow="window3" whichWindow="window3" title="我国苹果主产区物质与服务费用变化趋势" @openBigWindow="openBigWindow">
          <serviceCostSM></serviceCostSM>
        </smallWindow>
        <smallWindow class="window4" @closeWindow="closeWindow" :isShow="window4" whichWindow="window4" title="我国苹果主产区化肥用量及金额变化趋势" @openBigWindow="openBigWindow">
          <fertiliserCostSM></fertiliserCostSM>
        </smallWindow>
      </div>
    </div>
    <div class="right-bar-wrapper">
      <ul>
        <li :class="{'active':active1}" @click="showSmall('window1')"><i class="iconfont icon-gongzitiao"></i></li>
        <li :class="{'active':active2}" @click="showSmall('window2')"><i class="iconfont icon-tudi"></i></li>
        <li :class="{'active':active3}" @click="showSmall('window3')"><i class="iconfont icon-fuwufei"></i></li>
        <li :class="{'active':active4}" @click="showSmall('window4')"><i class="iconfont icon-xiaoliang"></i></li>
      </ul>
    </div>
    <bigWindow title="我国苹果主产区人工成本变化趋势" :isShow="bigwindow1" whichWindow="bigwindow1" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <!--<plantingCost></plantingCost>-->
      <laborCost></laborCost>
    </bigWindow>
    <bigWindow title="我国苹果主产区土地成本变化趋势" :isShow="bigwindow2" whichWindow="bigwindow2" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <landCost></landCost>
    </bigWindow>
    <bigWindow title="我国苹果主产区物质与服务费用变化趋势" :isShow="bigwindow3" whichWindow="bigwindow3" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <serviceCost></serviceCost>
    </bigWindow>
    <bigWindow title="我国苹果主产区化肥用量及金额变化趋势" :isShow="bigwindow4" whichWindow="bigwindow4" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <fertiliserCost></fertiliserCost>
    </bigWindow>
  </div>
</template>
<script>
  import { rightBarMixin } from 'assets/js/common.js'
  import { xhr } from 'assets/js/api.js'
  import selectTime from 'components/selectTime/selectTime';
  import selectArea from 'components/selectArea/selectArea';
  import selectBtn from 'components/selectBtn/selectBtn';
  import explain from 'components/explain/explain';
  import CBchart from './echarts/CBchart.vue'
  import costStructure from './echarts/costStructure.vue'
  import costDetails from './echarts/costDetails.vue'
  import plantingCostSM from './plantingCostSM.vue'
  import plantingCost from './plantingCost.vue'
  import laborCost from './laborCost.vue'
  import laborCostSM from './laborCostSM.vue'
  import landCost from './landCost.vue'
  import landCostSM from './landCostSM.vue'
  import serviceCost from './serviceCost.vue'
  import serviceCostSM from './serviceCostSM.vue'
  import fertiliserCost from './fertiliserCost.vue'
  import fertiliserCostSM from './fertiliserCostSM.vue'

  export default {
    name: "costBenefit",
    mixins: [rightBarMixin],
    data() {
      return {
        myowndata: "我国苹果种植成本收益",
        btnData: [{ // selectBtn 组件
          name: '单位面积',
          value: 101002
        }, {
          name: '单位产品',
          value: 101018
        }],
        btnIndex: 0,
        eText: "成本利润率=净利润/总成本。数据来源于农业部，数据始于1998年。",
        eText2: "数据来源于农业部，总成本及物质与服务费用数据始于1998年，人工和土地成本细分项数据始于2004年。",
        cbchartData: {
          data: [],
          time: [],
          option: {
            yAxis: [{ name: '元/亩                 ' }],
            dataZoom: [{
              height: 14,
              //                top:340,
              left: "4%",
              right: "3%",
              bottom: 0,
            }],
          },
        },
        csPieData: {
          xdata: [],
          data: [],
          option: {},
        },
        cdPieData: {
          xdata: [],
          data: [],
          tdata: ["人工成本"],
          option: {},
        },
        area: '',         //地区
        time: '',         //时间
        itemId: 101008,   //子成本结构id
        year: 2014,       //饼图时间初始化时间
        idData: [],       //饼图一的id
        areaId: '',       // 101
        areaIdData: [],   //地区名称对应的ID
        areaNameData: [], // 地区中文名字列表
        aa: null,
        areas: "",
        // 饼图标题时间和地区联动
        pieTitleInfo: {
          year: 2014,
          area: '全国'
        }
      }
    },
    mounted() {
//      this.getCBchartData();
//      this.getCSpieData();
//      this.getCDpieData();
    },
    computed: {
      ApiCBchartParms() {
        return {
          area: this.area,
          time: this.time,
          type: this.btnData[this.btnIndex].value
        }
      },
      ApiCSpieParms() {
        return {
          area: this.areaId,
          year: this.year,
          type: this.btnData[this.btnIndex].value
        }
      },
      ApiCDpieParms() {
        return {
          areaId: this.areaId,
          year: this.year,
          type: this.btnData[this.btnIndex].value,
          itemId: this.itemId
        }
      },
      pieTitleLeft() {
        return `${this.pieTitleInfo.year}${this.pieTitleInfo.area}苹果总成本`
      },
      pieTitleRight() {
        return `${this.pieTitleInfo.year}${this.pieTitleInfo.area}${this.cdPieData.tdata}`
      }
    },

    watch: {
      ApiCBchartParms(newVal) {
        if (newVal.area && newVal.time && newVal.type) {
          this.getCBchartData()
        }
      },
      ApiCSpieParms(newVal) {
        if (newVal.area && newVal.year && newVal.type) {
          this.getCSpieData()
        }
      },
      ApiCDpieParms(newVal) {
        if (newVal.areaId && newVal.year && newVal.type && newVal.itemId) {
          this.getCDpieData()
        }
      },
    },

    methods: {

      // 捕获时间
      _chooseTime(time) {
        this.time = time.time
      },

      // 捕获地点
      _changeArea(area) {
        this.area = area.toString()
      },

      // 单位产品和单位面积切换
      _changeBtn(val) {
        if (val == 101002) {
          this.cbchartData.option.yAxis[0].name = "元/亩            ",
            this.aa = true;
        } else {
          this.cbchartData.option.yAxis[0].name = "元/公斤            "
          this.aa = false
        }
      },

      //获取页面主体上部分折柱图数据
      getCBchartData() {
        //  在这里修改数据
        this.$xhr.get('apple/income/getTrendChange', {
          params: {
            ...this.ApiCBchartParms

          }
        }).then((res) => {
//                        console.log(res)
          this.cbchartData.data = res.data.data
          this.cbchartData.time = res.data.time
          //              console.log(this.cbchartData)
          //              console.log(res.data.data[0].totalCost)
          let areaids = [];
          let areaNames = []
          res.data.data.forEach((val, index, arr) => {
            areaids.push(arr[index].areaId)
            areaNames.push(val.name)
          })
          this.areaIdData = areaids
          this.areaNameData = areaNames
          // 地区的第一个
          this.areaId = res.data.data[0].areaId
        })
      },
      getCSpieData() {
        //  在这里修改数据
        this.$xhr.get('apple/income/costStructure', {
          params: {
            ...this.ApiCSpieParms
          }
        }).then((res) => {
          let CSdataArr = [];
          let idDatas = [];
          if(res.data.data.length){
            res.data.data.forEach(function(val, index, arr) {

              CSdataArr.push({
                name: arr[index].name.split("-")[1],
                value: arr[index].value
              });
              idDatas.push(arr[index].itemId)
            })
            this.areas = res.data.data[0].name.split("-")[0]
            this.csPieData.data = CSdataArr
            this.idData = idDatas
            // 标题信息身份
            this.pieTitleInfo.area = res.data.data[0].name.split('-')[0]
          } else {
            this.csPieData.data = []
            this.pieTitleInfo.area = ''
          }
        })
      },
      getCDpieData() {
        //  在这里修改数据
        this.$xhr.get('apple/income/subCostStructure', {
          params: {
            ...this.ApiCDpieParms
          }
        }).then((res) => {
          let CDdataArr = [];

          res.data.data.forEach(function(val, index, arr) {

            CDdataArr.push({
              name: res.data.data[index].name.split("-")[1],
              value: res.data.data[index].value
            })
          })

          //                  console.log(res)
//        var newCDdataArr = Object.keys(CDdataArr).sort((a,b){
//        	 return CDdataArr[b] - CDdataArr[a]
//        })
//debugger
//        console.log(CDdataArr)
          this.cdPieData.data = CDdataArr
          //                  console.log(this.csPieData)
        })
      },

      //接收主图一传来的数据
      fromCBchart(params) {
        // 得到年份
        this.year = params.name
        // 用于标题显示的年份
        this.pieTitleInfo.year = params.name
        // 判断点击的地区
        if (Math.floor(params.seriesIndex/3) == 0) {
          this.areaId = this.areaIdData[0]
          this.pieTitleInfo.area = this.areaNameData[0]
        } else if (Math.floor(params.seriesIndex/3) == 1) {
          this.areaId = this.areaIdData[1]
          this.pieTitleInfo.area = this.areaNameData[1]
        } else if (Math.floor(params.seriesIndex/3) == 2) {
          this.areaId = this.areaIdData[2]
          this.pieTitleInfo.area = this.areaNameData[2]
        }
      },

      //接收饼图传来的数据
      fromCostStructure(params) {
        //        console.log(params)

        this.itemId = this.idData[params.dataIndex]
        this.cdPieData.tdata = params.name;
      },

    },

    components: {
      CBchart,
      selectTime,
      selectBtn,
      selectArea,
      explain,
      costStructure,
      costDetails,
      laborCost,
      laborCostSM,
      landCost,
      landCostSM,
      serviceCost,
      serviceCostSM,
      fertiliserCost,
      fertiliserCostSM
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .product-wrapper {
    h2 {
      font-size: 0.34rem;
      text-align: center;
      color: #00B064;
    }
    .cont {
      color: #00B064;
    }
    .cbchart-wrapper,
    .charts-wrapper {
      /*padding: 0 0 0 .14rem;*/
      padding: 0;
      .bigW-intro {
        padding: 0;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.26rem;
        /*margin-left: 0.64rem;*/
        color: #fff;
        text-align: left;
        border: none;
        span {
          color: #00AE63;
        }
      }
      .title {
        height: 0.32rem;
      }
      .bigW-option {
        padding: 0;
        margin-right: 0.3rem;
        .selectTime-wrapper {
          line-height: 0.3rem;
        }
      }
    }
    .charts-wrapper {
      background: transparent;
      margin-top: 0;
      .bigW-intro {
        padding-top: 0.42rem;
        /*margin-left: -0.3rem;*/
        height: 0.64rem;
        line-height: inherit;
        font-size: 0.22rem;
      }

      .costStructure {
        /*margin-left: -0.41rem;*/
      }
      .costDetails {
        /*margin-left: -0.71rem;*/
      }

    }
  }

  .select-wrapper {
    margin-right: 0.2rem;
  }

  .product-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .top-title {
      height: 0.4rem;
    }
    .charts-wrapper{
    	display: flex;
      flex-direction: column;
      height: calc(45% - 0.3rem);
      padding-top: 0.3rem;
    }
    .cbchart-wrapper {
      padding-top: 0.3rem;
      display: flex;
      flex-direction: column;
      height: calc(55% - 0.3rem);
    }
    .cbchart-box {
      width: 100%;
      height: 88%;
      margin: 0 auto;
      /*margin-top: 0.15rem;*/
    }
    .charts-content {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .charts-box {
        width: 50%;
        height:100%;
        /*flex: 1;*/
        /*float: left;*/
      }
    }
  }

  .select {
    margin-right: 0.2rem;
  }

  .p-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.4rem !important;
    line-height: 0.4rem;
    .pie-title {
      color: #fff;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      height: 100%;
      width: 40%;
    }
    .help {
      width:10%;
      height:100%;
    }
    p {
      width: calc(10% - 0.3rem);
      height:100%;
      padding-right: 0.3rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
		.selectBtn{
			margin-right: 0.2rem;
		}
</style>
