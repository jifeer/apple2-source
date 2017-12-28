<template>
  <div class="flow-salestosm-wrapper">
    <h3 class="small-title">{{title}}</h3>
    <div class="product-salestosm-content">
      <STDetails :echartsDatab="echartsDatab"></STDetails>
    </div>
  </div>
</template>

<script>
  import {extend} from 'assets/js/common'
  import {convertData, geoCoordMap} from 'assets/js/common'
  import STDetails from './echarts/flow-STDetails.vue'

  export default {

    name: 'product-small1',
    data() {
      return {
        areas: '陕西',
        marketclass: 1,
        year: '',
        title: '',
        echartsDatab: {
          id: "small1",
          xdata: [],
          data: [],
          option: {
            legend: {
              show: false,
            },
            grid: {
              left: "15%",
              top: "18%",
              right: '5%',
              bottom: '25%'
            },

          }
        }
      }
    },
    computed: {
      flowSalesParms() {
        return {
          areas: this.areas,
          marketclass: this.marketclass,
          year: '',
        }
      }
    },
    watch: {
      flowSalesParms(newVal) {
        this.renderChart()
      }
    },
    mounted() {
      //console.log(console.log(this.pramsData))
      this.renderChart()
    },
    methods: {
      changeBtn(name) {
      },
      myownEvent() {
        this.changeBar()
      },
      renderChart() {
        let echartsDatabArr = [];
        this.$xhr.get('apple/circulation/getQuarterAys', {
          params: {
            ...this.flowSalesParms
          }
        }).then((res) => {
          this.title = '2017年陕西省富士苹果去向'
          this.echartsDatab.xdata = res.data.rightname
          echartsDatabArr.push(res.data.rightval1, res.data.rightval2, res.data.rightval3, res.data.rightval4)
          this.echartsDatab.data = echartsDatabArr
        })
        /*  setTimeout( ()=> {
              this.echartsDatab.xdata =  ['贵州', '河南', '广西', '湖南', '浙江']
              this.echartsDatab.data =  [[41402, 40402, 31402, 21402, 11402],[41402, 40402, 31402, 21402, 11402],[41402, 40402, 31402, 21402, 11402],[41402, 40402, 31402, 21402, 11402]]

          },200)*/


      },
      changeBar() {
        // 在这里发送请求
        setTimeout(() => {
          this.echartsData.xdata = ['Mon', 'Tue', 'Wed']
          this.echartsData.data = [10, 152, 100]
          this.echartsData.option = {
            yAxis: [
              {
                type: 'value',
//                          name:  'tes22222222222'
              }
            ],
          }
        }, 500)
      }


    },
    components: {
      STDetails
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .flow-salestosm-wrapper > div {
    height: 100%;
    width: 100%;
  }

  .flow-salestosm-wrapper {
    height: 100%;
    width: 100%;
    .product-salestosm-content {
      display: flex;
      justify-content: center;
      align-items: center;

    }

  }

</style>
