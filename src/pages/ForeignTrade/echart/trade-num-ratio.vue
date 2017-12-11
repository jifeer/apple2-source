<template>
  <div :id="bottomPieData.id" >

  </div>
</template>
<script>
  import {$} from 'assets/js/common'

  export default {
    name: 'bottomPie',
    data(){
      return {
        myChart:null
      }
    },
    props: {
      bottomPieData: {
        type: Object,
        default: null
      },
      height:{
        type:String,
        default: '4.6rem'
      },
      width: {
        type:String,
        default: ''
      }

    },
    watch:{
      bottomPieData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
      let id = this.bottomPieData.id
      this.myChart = this.$echarts.init(document.getElementById(id))
      window.addEventListener("resize",  ()=> {
        this.myChart.resize();
      });
      this.initChart()
    },
    computed: {

    },
    methods: {
      initChart(){
        if (Object.keys(this.bottomPieData).length) {
          let option = {
            grid: {
              left: '4%',
              right: '0.6rem',
              bottom: '15%',
              top: '22%',
              containLabel: true
            },
            tooltip : {
              show: false
            },
            color:['#38d16f', '#1bab51', '#04933e', '#0064cc', '#1378e2','#32a1ec','#e8c23d','#e87b20'],
            series: [
              {
                name:'贸易量占比',
                type:'pie',
                radius: ['20%', '65%'],
                center: ['50%', '50%'],
                data:this.bottomPieData.data,
                itemStyle:{
                  emphasis:{
                    border: 4,
                    borderColor:'#06142d'
                  }
                },
                label: {
                  normal: {
                    position: 'outside',
                    show: true,
                    formatter: "{d}%\n{b}",
                    textStyle: {
                      color: "#fff",
                      fontSize: 16
                    }
                  }
                },
                labelLine: {
                  normal: {
                    length:10,
                    length2:30,
                    lineStyle: {
                      color: "#fff"
                    }
                  }
                }
              }
            ]
          };

          //如果有新的配置项的变化 深度拷贝
          if(Object.keys(this.bottomPieData.option).length){
            option = $.extend(true,option,this.bottomPieData.option)
          }
          this.myChart.setOption(option);

        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
</style>
