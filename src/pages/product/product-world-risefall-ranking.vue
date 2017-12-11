<template>
  <div class="product-risefall-wrapper big-wrapper">
    <div class="true-title"><p>{{params.time}}年全球苹果{{titleType}}增减幅排名</p></div>
    <!--<div class="bigW-intro"></div>-->
    <div class="bigW-option">
      <p>
        <selectBtn :btnIndex.sync='btnIndex' :btnData="btnData" @changeBtn="_changeBtn"></selectBtn>
      </p>
      <explain :eText="eText"></explain>
    </div>
    <div class="chart">
      <riseFall ref="riseFall" :echartsData="echartsData" :width="width" :height="height"></riseFall>
    </div>
    <!--事件轴组件-->
    <div class="timeScroll-wrapper">
      <timeScroll :scorllOption="scorllOption" @scorllTime="_scorllTime"></timeScroll>
    </div>
  </div>
</template>

<script>
  import selectBtn from 'components/selectBtn/selectBtn';
  import explain from 'components/explain/explain';
  import riseFall from 'pages/product/echarts/product-risefall-big';
  import timeScroll from 'components/timeScroll/timeScroll'
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'line',
    data() {
      return {
        btnData: ['种植面积', '产量', '单产'],
        btnIndex: 0,
        eText: '数据来源于FAO，起始于1990年，级别为全球、各国。',
        echartsData: {
          xdata: [],
          data: [],
        },
        width: '100%',
        height: '100%',
        titleType: '种植面积',
        params: {
          // 时间 2002,2003,2004,2005,2005,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016
          time: '',
          // 数据类型 种植面积/产量/单产  default:112716
          type: ''
        },
        // 时间轴配置选项
        scorllOption: {
          width: '14rem',
          height: '35px',
          needDefault: true,
          id: 'worldrisefallscorll',
          url: 'apple/production/AllDqZF'
        }
      }
    },
    mounted(){
//      this.renderChart()
    },

    computed:{
      apiParams() {
        return {
          TIME_ID: this.params.time,
          type: this.params.type
        }
      },
    },

    watch: {
      apiParams(newVal) {
        if(newVal.TIME_ID && newVal.type){
          this.getChartData()
        }
      },
    },

    methods: {

      // 改变数据 类型
      _changeBtn(name){
        if(name === '种植面积'){
          this.params.type = '121689'
          this.titleType = '种植面积'
        } else if(name === '产量'){
          this.params.type = '112716'
          this.titleType = '产量'
        } else if(name === '单产'){
          this.params.type = '单产'
          this.titleType = '单产'
        }
      },

      // 时间轴切换事件事件
      _scorllTime(time){
//        console.log(time)
        this.params.time = time
      },

      // get data from server
      getChartData() {
        // 发送ajax请求数据
        this.$xhr.get(`apple/production/AllpAs`, {
          params: {
            ...this.apiParams
          }
        })
          .then((res) => {
            this.echartsData.data = res.data.data
            this.echartsData.xdata = res.data.xdata
          })
          .catch((err) => {
            console.log(err)

          })
      },

      /*renderChart(){
        //  在这里修改数据
        let data1 = [{name: '巴勒斯坦', value: 0},
          {name: '乌克兰', value: 0},
          {name: '美国', value: 0},
          {name: '尼泊尔', value: 0},
          {name: '伊朗', value: 0},

        ]
        let data2 = [
          {name: '土耳其', value: 0},
          {name: '波兰', value: 0},
          {name: '俄罗斯', value: 0},
          {name: '印度', value: 0},
          {name: '中国', value: 0},
        ]
        for (let i = 0; i < data1.length; i++) {
          data1[i].value = Math.round(Math.random() * 100)
        }
        for (let i = 0; i < data2.length; i++) {
          data2[i].value = Math.round(Math.random() * 100)
        }
        function sortRise(a, b) {
          return a.value - b.value
        }

        function sortFall(a, b) {
          return b.value - a.value
        }

        data2.sort(sortRise);
        data1.sort(sortFall);
        let newData = data1.concat(data2);
        newData.forEach((val, index) => {
          this.echartsData.xdata.push(val.name);
          this.echartsData.data.push(val.value);
        });
      },*/

    },
    components: {
      selectBtn,
      explain,
      riseFall,
      timeScroll
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .product-risefall-wrapper {
    height: calc(100% - 0.5rem);
    .true-title {
      width: calc(100% - 3.4rem);
      height: 0.9rem;
      position: absolute;
      top:0;
      left: 1.7rem;
      p {
        width: 100%;
        height:100%;
        line-height: 0.9rem;
        font-size: 0.36rem;
        font-weight: bold;
        text-align: center;
      }
    }
    .chart {
      width: 100%;
      padding-top: 0.15rem;
      height: calc(100% - 1.05rem);
    }
    .timeScroll-wrapper {
      width:100%;
      height: 40px;
    }
    .bigW-intro {
      height: 0;
    }
    .bigW-option {
      p {
        margin-right: 0.2rem;
      }
    }
  }

</style>
