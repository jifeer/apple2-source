<template>
  <div ref="costDetails" class="costDetails-wrapper">

  </div>
</template>

<script>
  import {extend, $, resizeMixin} from 'assets/js/common'

  export default {
    name: "costDetails",
    mixins: [resizeMixin],
    data() {
      return {
        option: null,
        isShow: true,
      }
    },
    props: {
      cdPieData: {
        type: Object,
        default: () => {

        }
      },
      units: {
        type: Boolean,
        default: true
      },
      pieTitleInfo: {
        type: Object,
        default: () => {

        }
      }
    },

    watch: {
      cdPieData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.costDetails)
      this.initOption()
    },

    methods: {
      initOption() {
        if (Object.keys(this.cdPieData).length) {
          this.option = {
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
//			                	console.log(params)
                return "<div style='text-align:left'>" + `${params.marker}${params.name}<br/>
			                	        ${params.value}${this.units == true ? "元/亩" : "元/公斤"}<br/>
			                	        ${params.percent}%` + "</div>"
              }
            },
            title: {
              text: [],
              top: "0",
              x: "center",
//              left: "34.5%",
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
                avoidLabelOverlap: false,
                itemStyle: {
                  normal: {
                    borderColor: '#042546',
                    borderWidth: 2,
                  },
                },
                data: []
              }
            ],

          };


        }
      },
      initChart() {
        //如果有新的配置项的变化 深度拷贝
        if (Object.keys(this.cdPieData.option).length) {
          this.option = $.extend(true, this.option, this.cdPieData.option)
        }
        let list = []
        let value = []
//          	this.cdPieData.data.forEach((val,index,arr)=>{
//          		value.push(val.value)
//          	})
        if (this.cdPieData.data.length) {
          for (let i = 0; i < this.cdPieData.data.length; i++) {
            value.push(this.cdPieData.data[i].value)
          }
          value.sort((a, b) => {
            return a - b
          })
//          	console.log(value)
//          	console.log("界限值"+value[7])
          this.cdPieData.data.forEach((val, index, arr) => {
//          		console.log("待定值"+val.value)
            if (value[7] && val.value * 1 < value[7] * 1) {
//          			console.log("通过值"+val.value)
              list.push({
                name: arr[index].name,
                value: arr[index].value,
                label: {
                  normal: {
                    show: false,
                    color: "#fff",
                    fontSize: 16,
                    formatter: "{d}%\n{b}"
                  },
                  emphasis: {
                    show: true
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                }
              })

            } else {
              list.push({
                name: arr[index].name,
                value: arr[index].value,
                label: {
                  normal: {
//		                        show:false,
                    color: "#fff",
                    fontSize: 16,
                    formatter: "{d}%\n{b}"
                  },
                  emphasis: {
                    show: true
                  }
                },
                labelLine: {
                  normal: {
//		                        show:false
                  },
                  emphasis: {
                    show: true
                  }
                }
              })
            }
          })
//          	console.log(list)
          this.option.series[0].data = list
        } else {
          this.option.series[0].data = []
        }

        // 标题
        // this.option.title.text = `${this.pieTitleInfo.year}${this.pieTitleInfo.area}${this.cdPieData.tdata}`

        this.myChart.setOption(this.option, true);
      },

      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .costDetails-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
