<template>
  <div ref="small2" class="small">pie组件</div>
</template>

<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import {resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'pie',
    mixins: [resizeMixin],
    props: {
      fWchartData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        maxTitle: null,
      }
    },

    watch: {
      fWchartData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化

      }
    },
    mounted() {
      this.chart = this.$echarts.init(this.$refs.small2)
      this.initOption()
    },
    methods: {
      initOption() {

        this.option = {
          grid: {
            left: "50",
            right: "10",
            top: '35',
            bottom: "25",
            containLabel: false
          },
          tooltip: {
            trigger: 'item', //图形触发，axis是类目周触发
            axisPointer: {
              type: 'line',
              shadowStyle: {
                color: 'rgba(0, 255, 102, .05)'
              }
            },
            backgroundColor: '#099d4f',
            formatter: (params) => {
//              	console.log(params)
              return `${params.marker}${params.name}<br/>
                	         ${params.value}吨<br/>
                	         ${params.percent}% `

            }
          },
          title: {
            text: '果径规格\n(mm)',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#fff'
            },
            x: 'center',
            y: 'center'
          },
          series: [{
//        name: '',
            type: 'pie',
            label: {
              normal: {
                show: false,
                textStyle: {
                  fontSize: 12,
                  color: '#fff'
                }
              }
            },

            labelLine: {
              normal: {
                length: 15,
                length2: 20,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
//        radius: ['27%', '62%'],
            //radius: ['29%', '68%'],
            radius: ['35%', '88%'],
            center: ['50%', '50%'],
            color: ['#1378E2', '#E8C23D', '#E87B20', '#85DF5B', '#38D16F', '#32A1EC', '#80B3FF', '#D34D40', '#FF8080'],
            data: [],

          }],
        };
      },
      initChart() {
        let aa = [];
        this.fWchartData.data.forEach((val, index, arr) => {
          aa.push(arr[index].value - 0)
        })
        let max = Math.max.apply(null, aa)
        this.fWchartData.data.forEach((val, index, arr) => {
          if (arr[index].value == max) {
            this.option.series[0].data[index] = {
              itemStyle: {
                normal: {
                  borderColor: '#05132B',
                  borderWidth: 3,
                },
              },
              radius: ['27%', '74%'],
              name: arr[index].name,
              value: arr[index].value,
            }
            this.maxTitle = arr[index].name
            this.$emit('maxTitle', this.maxTitle)
          } else {
            this.option.series[0].data[index] = {
              name: arr[index].name,
              value: arr[index].value,
            }
          }

        })
//    alert(aa)
//  	this.option.series[0].data=this.fWchartData.data

        this.chart.setOption(this.option)


      },
      // echats 图表自适应
      _windowResizeHandler() {
        this.chart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.chart.dispose()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";

  .small {
    @include flex(center, center);
    height: 100%;
  }

  .small {
    width: 100%;
    height: 100%;
  }
</style>
