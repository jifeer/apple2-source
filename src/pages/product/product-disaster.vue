<template>
  <div class="product-disaster-wrapper big-wrapper">
    <div class="true-title"><p>{{params.time}}年{{params.area}}省气象灾害监测</p></div>
    <!--<div class="bigW-intro"></div>-->
    <div class="bigW-option">
      <selectTimeSingle @chooseTime="_chooseTime" url="apple/production/WeatherTime"></selectTimeSingle>
      <selectDiy :data="selectData" @change="_changeArea"></selectDiy>
      <p>
        <selectBtn :btnIndex.sync='btnIndex' :btnData="btnData" @changeBtn="_changeBtn"></selectBtn>
      </p>
      <explain :eText="eText"></explain>
    </div>
    <disasterMap ref="disasterMap" :echartsData="echartsData" :width="width" :height="height"></disasterMap>
  </div>
</template>

<script>
  import selectTimeSingle from 'components/selectTime/selectTimeSingle';
  import selectBtn from 'components/selectBtn/selectBtn';
  import selectDiy from 'components/selectDiy/selectDiy';
  import explain from 'components/explain/explain';
  import disasterMap from 'pages/product/echarts/product-map-province';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'disaster',
    data() {
      return {
        btnData: ['花期和幼果期', '果实膨大期', '果实成熟期'],
        btnIndex: 0,
        eText: `低温指数：该时期日均温最低5天的温度平均值的倒数；干旱指数：该时期无降水天数除以该时期降水量；连阴雨指数：该时期连续三天及以上降水天数除以该时期无降水天数。`,
        timeTypeData: [],
        areaId: '370000',
        selectData: ['山东', '河北', '山西', '辽宁', '河南', '陕西', '甘肃'],
        echartsData: {
          data: {},
          province: '',
        },
        width: '100%',
        height: '100%',

        // 请求需要的参数
        params: {
          // 时间段 2002,2003,2004,2005,2005,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016
          time: '',
          // 地区 陕西，山东
          area: '',
          // 数据类型 果实成熟期、花期和幼果期、果实膨大期
          type: ''
        },
        nameMap: {
          河北: 130000,
          山西: 140000,
          辽宁: 210000,
          山东: 370000,
          河南: 410000,
          陕西: 610000,
          甘肃: 620000,
        },
      }
    },
    created() {
//      this.getMockData()
//      this.getJSON()
    },
    mounted(){
//      this.getChartData()
    },

    computed: {
      apiParams() {
        return {
          TIME_ID: this.params.time,
          AREA_NAME: this.params.area,
          factor: this.params.type,
        }
      },
    },

    watch: {
      apiParams(newVal, oldVal) {
        if (newVal.TIME_ID && newVal.AREA_NAME && newVal.factor) {
          this.getChartData()
        }
        if (newVal.AREA_NAME && newVal.AREA_NAME !== oldVal.AREA_NAME) {
//          this.getJSON()
        }
      },

    },

    methods: {
      //切换灾害类型
      _changeBtn(name){
        this.params.type = name
      },

      // 切换省份
      _changeArea(val) {
        this.params.area = val
//        this.echartsData.province = val
      },

      // 选择时间
      _chooseTime(val) {
        this.params.time = val
//        this.params.time = '2010'
      },

      //get data from server
      getChartData() {
        this.$xhr.get('apple/production/disasterMonitor', {
          params: {
            ...this.apiParams
          }
        })
          .then((res) => {
            this.echartsData.data = res.data
            // 在这里把省份传进去，是为了防止自组件watch的时候渲染了两次
            this.echartsData.province = this.params.area
          })
          .catch((err) => {
            console.log(err)
          })
      },

      // 获取地图名称
      getJSON() {
        this.$xhr.get(`./static/json/${this.nameMap[this.params.area]}.json`)
          .then((res) => {
            // console.log(res)
            /*let newdata = []
            res.features.forEach((item, index) => {
              newdata.push({
                name: item.properties.name,
                coord: item.properties.cp
              })
            })*/
          })
      }

    },
    components: {
      selectTimeSingle,
      selectBtn,
      selectDiy,
      explain,
      disasterMap
    }

  };
</script>

<style lang="scss">
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .product-disaster-wrapper {
    height: calc(100% - 0.5rem);
    .true-title {
      width: calc(100% - 3.4rem);
      height: 0.9rem;
      position: absolute;
      top: 0;
      left: 1.7rem;
      p {
        width: 100%;
        height: 100%;
        line-height: 0.9rem;
        font-size: 0.36rem;
        font-weight: bold;
        text-align: center;
      }
    }
    .bigW-intro {
      height: 0 !important;
    }
    .bigW-option {
      .selectBtn-wrapper {
        .selectBtn:first-child {
          width: 1.3rem;
        }
      }
      .select-wrapper {
        margin-right: 0.2rem;
        /*.arrow-cont {
          li {
            height: 0.36rem !important;
          }
        }*/
      }
      p {
        margin-right: 0.2rem;
      }
    }

  }

</style>
