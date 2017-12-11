<template>

  <div data-comp="test-component">

    <selectTime @chooseTime="_chooseTime" url="apple/price/monitor/getTime" defaultTimeType="年度" :timeTypeData="timeTypeData" :areaId="areaId"></selectTime>

    <selectDiy @change="_changeDiy" url="apple/consume/status/getArea?requestNum=20" defaultOption="中国"></selectDiy>

    <selectArea url="apple/production/region" @change="_changeArea" num="2"></selectArea>

    <selectBtn :btnData="btnData" :btnIndex.sync="btnIndex" @changeBtn="_changeBtn"></selectBtn>
    <button @click="changeTimeScroll">click</button>

    <div class="timeScroll-wrapper"  v-if="timeScrollData == 1">
      <timeScroll v-if="Object.keys(scorllOption).length" :scorllOption="scorllOption" @scorllTime="scorllTime" :url="url"></timeScroll>
    </div>



    <div class="timeScroll-wrapper" v-if="timeScrollData == 2">
      <timeScroll :scorllOption="scorllOption2" @scorllTime="scorllTime1"></timeScroll>
    </div>

    <selectTree @change="_treeAsync" url="apple/income/getCostSelectData?costType=101007" style="margin: 0 auto; margin-left: 150px;"></selectTree>

    <selectTreeAsync @change="_treeArea" url="apple/production/dq"></selectTreeAsync>


  </div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  import { $ } from 'assets/js/common'
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import selectTime from 'components/selectTime/selectTime'
  import selectDiy from 'components/selectDiy/selectDiy'
  import selectArea from 'components/selectArea/selectArea';
  import selectBtn from 'components/selectBtn/selectBtn'
  import timeScroll from 'components/timeScroll/timeScroll'

  import selectTreeAsync from 'components/selectTreeAsync/selectTreeAsync'

  import selectTree from 'components/selectTree/selectTree'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'test',
    props: {
    },
    data() {
      return {
        url: '/apple/trade/countryFlow/getTimes?TIME_TYPE=year',
        timeTypeData: [],   // selectTime 组件
        areaId: '370000',                       // selectTime 组件

        btnIndex: 0,                            // selectBtn 组件
        // btnData: ['yeu', 'nian']             // selectBtn 组件
        btnData: [{                             // selectBtn 组件
          name: 'yuedu',
          value: 0
        }, {
          name: 'niandu',
          value: 1
        }],
        scorllOption:{
        },

        scorllOption2:{
          width:'15rem',
          height:'100px',
          id:'b1',
          needDefault:true,
          url:'/apple/trade/countryFlow/getTimes?TIME_TYPE=month'
        }
        ,
        timeScrollData:1
      }
    },
    components: {
      selectTime,
      selectDiy,
      selectArea,
      selectBtn,
      timeScroll,
      selectTreeAsync,
      selectTree
    },
    mounted() {
      this.scorllOption = {
          width:'15rem',
          height:'100px',
          id:'a1',
          needDefault:true,
          url:'/apple/trade/countryFlow/getTimes?TIME_TYPE=year'
        }
    },
    methods: {
      changeTimeScroll(){
          this.scorllOption ={
            width:'15rem',
            height:'100px',
            id:'a1',
            needDefault:true,
            url:'/apple/trade/countryFlow/getTimes?TIME_TYPE=month'
          }
      },
      scorllTime(time){
        console.log(time)
      },
      scorllTime1(time){
        console.log(time)
      },
      // 捕获时间
      _chooseTime(time) {
        console.log(time)
      },
      // 捕获diy
      _changeDiy(area) {
        console.log(area)
      },
      // 捕获参数
      _changeBtn(val) {
        console.log(val)
      },
      // 捕获地区
      _changeArea(val) {
        console.log(val)
      },

      // 异步获取数据的 selecttree      || 单选
      _treeArea(val) {
        console.log(val)
      },

      // 一次性获取数据 选中后传过来的数据  ||　多选
      _treeAsync(val) {
        console.log(val)
      }
    },
    computed: {
      parms() {
        return {
          // time: this.time,
          // ...area,
          // ...鲜苹果,
          // ...种植面积
        }
      }
    },
    watch: {
      parms(newVal) {
        this.$xhr.get('url', {
          parms: {
            // ...newVal
          }
        }).then((res) => {
          console.log(res)
        })
      }
    },

  }

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";

  .select-area {
    // width: 300px;
  }

</style>
