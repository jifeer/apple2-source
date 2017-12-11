<template>
  <div ref="supplypie" class="supplypie-wrapper">

  </div>
</template>

<script>
  import {extend, $, resizeMixin} from 'assets/js/common'

  export default {
    name: 'pieChart',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      }
    },
    props: {
      supplypie: {
        type: Object,
        default: null
      },

    },
    watch: {
      supplypie: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    data() {
      return {};
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.supplypie)
    },
    methods: {
      initChart() {
        if (Object.keys(this.supplypie).length) {
          let option = {
            title: {
              text: '',
              textStyle: {
                color: '#fff',
              },
              top: '20',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}:<br/> {c}吨<br> {d}%"
            },
            color: ['rgba(255, 211, 76, .9)', 'rgba(64, 176, 252, .9)'],
            series: [
              {
                name: '电商渠道销售',
                type: 'pie',
                radius: ['35%', '55%'],
                tooltip: {
                  backgroundColor: '#099d4f'
                },
                grid: {
                  left: 80,
                  top: 60,
                  bottom: 20
                },
                label: {
                  normal: {
                    formatter: '{d}% {b}',
                    textStyle: {
                      color: '#fff',
                      fontSize:'16'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: '#fff'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#071429',
                    borderWidth: 2
                  }
                },
                data: this.supplypie.data
              }
            ]
          };


          this.myChart.off('click');
          this.myChart.on('click', (params) => {
            // console.log(params.name)
            this.$emit('changePie', params.name)

          })
          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.supplypie.option).length) {
            option = $.extend(true, option, this.supplypie.option)
          }
          this.myChart.setOption(option);

        }
      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      },

//          getWidhtHeight() {
//              let width = this.width
//              let height = this.height
//              if(width.indexOf('%')){
//                  this.width = document.getElementById(this.supplypie.id).clientWidth + 'px'
//              };
//              if(height.indexOf('%')){
//                  this.height = document.getElementById(this.supplypie.id).clientHeight + 'px'
//              }
//          },
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .supplypie-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
