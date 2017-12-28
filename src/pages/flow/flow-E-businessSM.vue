<template>
  <div class="flow-E-business-wrapper">
    <h3 class="small-title">全国鲜苹果电商网店分布</h3>
    <div class="map-echarts-wrapper">
      <Businesecharts :echartsData="echartsData"></Businesecharts>
    </div>
  </div>
</template>

<script>

  import Businesecharts from 'pages/flow/echarts/flow-busines-echarts.vue'
  import {geoCoordMap,geoCoordMaps} from 'assets/js/common'

  export default {
    data() {
      return {
        date: '',
        echartsData: {
          id: "businesmapSM",
          xdata: [],
          data: [],
          option: {
          },
          series: [{
            symbolSize: function (val) {
              return Math.max(val[2] / 300, 8);
            }
          }]

        },
        symbolSize: function (val) {
          return Math.max(val[2] / 30, 8);
        }
      }
    },
    mounted() {
      this.renderChart()
    },
    computed: {
      flowSalesParms() {
        return {
          date: this.date,
        }
      }
    },
    watch: {
      flowSalesParms(newVal) {
        this.renderChart()
      }
    },
    methods: {
      renderChart() {

        this.$xhr.get('apple/circulation/getDsNumberAys', {
          params: {
            ...this.flowSalesParms
          }
        }).then((res) => {
          let objdata = [];
          res.data.mapData.forEach(function (name, idx) {
            let vname = name.name;
            //let vcoord = name.coord;
            let vval = name.value;
            //obj[vname] = vcoord;
            objdata.push({'name': vname, 'value': vval})
          })

          let convertData = function (data) {
            let res = [];
            for (let i = 0; i < data.length; i++) {
              let geoCoord = geoCoordMaps[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                });
              }
            }
            return res;
          };

          let convertedData = [
            convertData(objdata),
            convertData(objdata.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 6))
          ];
          this.echartsData.series = convertedData[0]

        })
      }
    },
    components: {
      Businesecharts
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  h3.small-title{
    margin-bottom:0;
  }
  .flow-E-business-wrapper{
    height:100%;
    .map-echarts-wrapper{
      height:100%;
    }
  }

</style>
