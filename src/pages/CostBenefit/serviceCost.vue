<template>
  <div>
    <div class="serviceCost-wrapper big-wrapper">
      <!--<div class="bigW-intro"></div>-->
      <div class="bigW-option">
        <selectTime class="selectTime" @chooseTime="_chooseTime" url="apple/income/getTime?timeType=1"
                    defaultTimeType="年度"></selectTime>
        <selectArea class="selectArea" @change="_changeArea" url="apple/income/getArea"></selectArea>
        <selectTree @change="_treeAsync" url="apple/income/getCostSelectData?costType=101007"></selectTree>
        <selectBtn class="selectBtn" :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="_changeBtn"></selectBtn>
        <explain :eText="eText"></explain>
      </div>

      <div class="SCchart-box">
        <SCchart :item="item" :SCchartData="SCchartData"></SCchart>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import SCchart from "./echarts/SCchart.vue"
  import selectArea from 'components/selectArea/selectArea';
  import selectBtn from 'components/selectBtn/selectBtn';
  import selectTime from 'components/selectTime/selectTime';
  import selectTree from 'components/selectTree/selectTree';
  import explain from 'components/explain/explain';
  export default {
    name: 'serviceCost',

    data() {
      return {
        myowndata: "我国苹果种植成本收益评估",
        btnIndex: 0,
        timeType: "year",
        eText: "数据来源于农业部，起始于1998年。级别为全国、省级。",
//		  selectData: [{
//        label: '物质与服务费用',
//        children: [
//          {
//          	label: '化肥费',
//          },
//          {
//          	label: '农药费',
//          },
//          {
//          	label: '农药肥费',
//          },
//          {
//          	label: '工具材料费',
//          },
//          {
//          	label: '租赁作业费',
//          },
//          {
//          	label: '销售费',
//          },
//          {
//          	label: '管理费',
//          },
//
//        ],
//      }],
        SCchartData: {
          data: [],
          timeData: [],
          option: {
            yAxis: {
              name: '元/亩             ',
            }
          },
        },
        btnData: [{                             // selectBtn 组件
          name: '单位面积',
          value: 0
        }, {
          name: '单位产品',
          value: 1
        }],
        area: "",
        time: "",
        type: 101002,
        itemId: null,
        i: 1,
        item: null,
      }
    },
    mounted(){
//	this.getSChartData()
    },
    computed: {
      ApiSChartParms() {
        return {
          area: this.area,
          time: this.time,
          type: this.type,
          itemId: this.itemId,
        }
      },
    },
    methods: {
      _chooseTime(time){
        this.time = time.time
//	          alert(this.time)
      },
      _changeBtn(val){
        if (val == 0) {
          this.type = 101002
          this.SCchartData.option.yAxis.name = '元/亩          '
          this.item = true
        }
        else {
          this.type = 101018
          this.SCchartData.option.yAxis.name = '元/公斤 '
          this.item = false
        }
      },
      _changeArea(area){
        if (this.i == 1) {
          area = [101, 116, 128]
          this.i++
        }
        this.area = area.toString()
      },
      _treeAsync(val){
        let string = val.toString()
        if (string.indexOf("102022") != -1 && string.indexOf("102004") != -1 && string.indexOf("102006") != -1 && string.indexOf("102005") != -1 && string.indexOf("102015") != -1 && string.indexOf("102008") != -1 && string.indexOf("102024") != -1) {
          this.itemId = "101007"
        } else {
          this.itemId = val.toString()
        }
      },
      //获取数据
      getSChartData(){
        this.$xhr.get('apple/income/getMaterialServiceData', {
          params: {
            ...this.ApiSChartParms
          }
        }).then((res) => {
          this.SCchartData.data = res.data.data
          this.SCchartData.timeData = res.data.time
//     	  	  console.log(res)

        })
      },

    },
    watch: {
      ApiSChartParms(newVal){
        if (newVal.area && newVal.time && newVal.type && newVal.itemId) {
          this.getSChartData()
        }
      }
    },

    components: {
      SCchart,
      selectTime,
      selectArea,
      selectBtn,
      explain,
      selectTree,
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  /*.SCchart-box{
    width: 13.3rem;
  }*/
  .bigW-option {
    color: #0164A0;
    padding-top: 0.2rem;
  }

  .bigW-intro {
    height: 0;
    span {
      color: #00B060
    }
  }

  .select-wrapper {
    margin-right: 0.2rem;
  }

  .select-cost-wrapper {
    width: 1.6rem !important;
  }

  .big-window-cont {
    display: flex;
    & > div {
      flex: 1;
      height: 100%;
      display: flex;
      .serviceCost-wrapper {
        flex: 1;
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        .SCchart-box {
          height: calc(100% - 0.8rem);
          padding-top: 0.3rem;
          width: 100%;
        }
      }
    }
  }

  .selectBtn {
    margin-right: 0.2rem;
  }
</style>
