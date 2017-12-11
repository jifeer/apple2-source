<template>
  <div class="product-area-wrapper big-wrapper">
    <div class="bigW-intro">2014年全球苹果园占果园种植面积比重8.6%，产量占12.3%</div>
    <div class="bigW-option">
      <selectTime :timeType="timeType"></selectTime>
      <!--<selectDiy :selectData="selectData"></selectDiy>-->
      <!--<explain :eText="eText"></explain>-->
    </div>
    <productAreaProportionFull ref="productAreaFull" :echartsData="echartsData" :width="width" :height="height"></productAreaProportionFull>
  </div>
</template>

<script>
  import selectTime from 'components/selectTime/selectTime';
//  import explain from 'components/explain/explain';
//  import selectDiy from 'components/selectDiy/selectDiy';

  import productAreaProportionFull from './echarts/product-area-full.vue';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'proportion',
    data() {
      return {
        eText: '发打的费打发的发了，<br /> &nbsp;&nbsp;&nbsp;&nbsp;发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，发打的费打发的发了，',
        selectData: [
          {value: 'diqu', name: '地区'},
          {value: 'jinan', name: '济南市'}
        ],
        echartsData: {
          data1: [],
          data2: [],
          option: {
            legend: {
              itemWidth: 25,
              itemHeight: 14,
            },
            xAxis: [{
              axisLabel: {
                textStyle: {
                  fontSize: 14,
                }
              }
            }],
            yAxis: [{
              axisLabel: {
                textStyle: {
                  fontSize: 14,
                }
              }
            }, {
              axisLabel: {
                textStyle: {
                  fontSize: 14,
                }
              },
              axisLine: {
                show: false
              }
            }],
            series: [{
              barWidth: 10,

            }],
            dataZoom: [{
              height: 10,
              left: '4%',
              right: '4%',
              bottom: 10,
            }]
          }
        },
        width: '100%',
        height: '80%',
        timeType: 'year'
      }
    },
    mounted(){
      this.renderChart()
    },

    methods: {
      changeBtn(name){
        let _timeType = ""
        if (name == "年度")
          _timeType = "year"
        if (name == "月度")
          _timeType = "month"
        if (name == "周度")
          _timeType = "week"
        if (name == "日度")
          _timeType = "day"

        this.timeType = _timeType;

      },
      myownEvent(){
        this.changeBar()
      },
      renderChart(){
        //  在这里修改数据
        this.echartsData.data1 = [];
        this.echartsData.data2 = [];
        this.echartsData.xdata = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        for (let i = 1; i < this.echartsData.xdata.length + 1; i++) {
          this.echartsData.data1.push(Math.round(Math.random() * 100));
          this.echartsData.data2.push(Math.round(Math.random() * 100));
        }

      },
      changeBar(){
        // 在这里发送请求
      },


    },
    components: {
      selectTime,
//      explain,
//      selectDiy,
      productAreaProportionFull

    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .product-area-wrapper {
    /*box-sizing: border-box;*/
    height: calc(100% - 0.5rem);
  }

</style>
