<template>
  <div ref="costStructure" class="costStructure-wrapper">

  </div>
</template>

<script>
  import {extend, $, resizeMixin} from 'assets/js/common'
  export default{
    name: "costStructure",
    mixins: [resizeMixin],
    data(){
      return {
        option: null
      }
    },
    props: {
      csPieData: {
        type: Object,
        default: ()=>{

        }
      },
      aa: {
        type: Boolean,
        default: true
      },
      pieTitleInfo: {
        type: Object,
        default: ()=>{

        }
      }
    },

    watch: {
      csPieData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.costStructure)
      this.initOption()
    },

    computed: {

    },

    methods: {
      initOption(){
        if (Object.keys(this.csPieData).length) {
          this.option = {
            tooltip: {
              trigger: 'item', //图形触发，axis是类目触发
              axisPointer: {
                type: 'line',
                shadowStyle: {
                  color: 'rgba(0, 255, 102, .05)'
                }
              },
              backgroundColor: '#099d4f',
              formatter: (params) => {
                return `<div style='text-align:left'>${params.marker}${params.name}<br/>
			                	        ${params.value}${this.aa ? "元/亩" : "元/公斤"}<br/>
			                	        ${params.percent}%</div>`
              }
            },
            title: {
              text: '',
              top: "0",
              x: "center",
//              left: "50.5%",
              textStyle: {
                fontSize: 22,
                fontWeight: "normal",
                color: "#fff"
              }
            },
            grid: {
              top: "20",
              bottom: '20'
            },
            series: [
              {
                color: ['#38D16F', '#1378E2', '#E8C23D', '#00c0fe', '#fce693', '#ff5601', '#009eff'],
//					            name:'访问来源',
                type: 'pie',
                radius: ['19%', '64%'],
                center: ['50%', '55%'],
//					            avoidLabelOverlap: false,
                label: {
                  normal: {
                    formatter: '{d}%\n{b}',
                    textStyle: {
                      fontSize: 16,
                      color: '#fff'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: "#fff",
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#042546',
                    borderWidth: 2,
                  }
                },

                data: [],
              }
            ],

          };

        }
      },
      initChart(){

        //如果有新的配置项的变化 深度拷贝
        /*if (Object.keys(this.csPieData.option).length) {
          this.option = $.extend(true, this.option, this.csPieData.option)
        }*/
        // 标题
        // this.option.title.text = `${this.pieTitleInfo.year}${this.pieTitleInfo.area}苹果总成本`
        this.option.series[0].data = this.csPieData.data
        this.myChart.setOption(this.option, true);

        this.myChart.on("click", (params) => {
          this.$emit("toCostBenefit", params)
//                   	alert(params.dataIndex)
        })
      },

//          toCostBenefit(){
//          	this.$emit("")
//          },
      _windowResizeHandler(){
        this.myChart.resize()
      },
      _destroyEchart(){
        this.myChart.dispose()
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .costStructure-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
