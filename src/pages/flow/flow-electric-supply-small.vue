<template>
  <div class="electric-small-wrapper">
    <rankingEchart :rankingEchart="rankingEchart"></rankingEchart>
  </div>
</template>

<script>
  import rankingEchart from 'pages/flow/echarts/flow-ranking';
  import {rightBarMixin} from 'assets/js/common.js'

  export default {
    name: 'electric-small',
    data() {
      return {
        rankingEchart: {
          id: "electric-ranking-small",
          yAxisData: [],
          yNumber: [],
          data: [],
          option: {
            title: {
              text: '主产地配送排行（吨）',
              textStyle: {
                fontSize: 14,
                color: '#fff',
              },
              top: '0',
              left: 'center'
            },
            grid: {
              left: '15%',
              top: '12%',
              right: '12%',
              bottom: '5%'
            },
            yAxis: [{
              axisLabel: {
                interval: 0,
                align: 'right',
                textStyle: {
                  fontSize: 12,
                },
                formatter:function (params) {
                  let h = params.length;
                  if(h>4){
                    return params.slice(0,4) + '...'
                  }else{
                    return params;
                  }
                }
              }
            }, {
              axisLabel: {
                show: false
              },
            }],
            series: [{
              barWidth: 4,
            }, {
              barWidth: 4,
              label: {
                normal: {
                  textStyle: {
                    fontSize: '0.07rem',
                  }
                }
              },
            }]
          }
        }
      }
    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart() {
        this.$xhr.get('apple/circulation/getDsFeaturesOrder', {
          params: {
            timeType: 'month',
            saleType: 1,
            date: '',
            appleType:'全部'
          }
        }).then((res) => {
          this.rankingEchart.yAxisData = res.data.xdata,
            this.rankingEchart.data = res.data.ydata
          this.rankingEchart.yNumber = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        })
      },
    },
    components: {
      rankingEchart
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .electric-small-wrapper {
    padding: 0 0.2rem;
    height: 100%;
  }

</style>
