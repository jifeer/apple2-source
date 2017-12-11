<template>
  <div class="product-historical-wrapper">
    <div class="chart-up">
      <div class="chart-option">
        <!--<div class="title-info"> <span>2002-2016</span>年， <span>全球</span>苹果产量年平均增长率 <span class="title-num">{{titleInfoUp.value}}</span>%</div>-->
        <div class="center-assist"></div>
        <!--时间选择组件-->
        <selectTime @chooseTime="_chooseTime" url="apple/production/getAllHistoryTime" defaultTimeType="年度"
                    :timeTypeData="timeTypeData" :areaId="areaId"></selectTime>
        <!--地区选择组件-->
        <selectArea ref="selectAreas" :url="setAreaUrl" @change="_changeArea"></selectArea>
        <!--条件切换组件-->
        <p>
          <selectBtn :btnIndex.sync='btnIndex' :btnData="btnData" @changeBtn="_changeBtn"></selectBtn>
        </p>
        <explain :eText="eTextUp"></explain>
      </div>
      <div class="chart-wrapper">
        <productHistorcal ref="WproductHistorcal" :echartsData="echartsDataUp" :axisData="axisData" :width="width"
                          :height="height"></productHistorcal>
      </div>
    </div>
    <div class="chart-down">
      <!--<div class="chart-option">
        <div class="title-info"> <span>2016</span>年，<span>全球</span>苹果园占果园面积 <span class="title-num">20.04</span>%，产量占 <span class="title-num">19.61</span>%</div>
        <div class="center-assist"></div>
        <selectTime :timeType="timeType"></selectTime>
        <explain :eText="eTextDown"></explain>
      </div>-->
      <div class="chart-wrapper">
        <productAreaProportionFull ref="WproductAreaProportionFull" :echartsData="echartsDataDown" :width="width"
                                   :height="height"></productAreaProportionFull>
      </div>
    </div>

  </div>
</template>

<script>
  import selectTime from 'components/selectTime/selectTime';
  import selectBtn from 'components/selectBtn/selectBtn';
  import explain from 'components/explain/explain';
  import selectArea from 'components/selectArea/selectAreaSingle';

  import productHistorcal from './echarts/product-historical-big.vue';
  import productAreaProportionFull from './echarts/product-area-full.vue';

  import {rightBarMixin} from 'assets/js/common.js'

  export default {
    name: 'line',
    data() {
      return {
        btnData: ['种植面积', '产量', '单产'],
        btnIndex: 1,
        eTextUp: '数据来源于FAO，起始于1990年，级别为全球、各国。',
        echartsDataUp: {
          data: {},
        },
        echartsDataDown: {
          data: {},
          isXian: false,
        },
        width: '100%',
        height: '100%',
        timeTypeData: [],
        areaId: '370000',

        // 上大图 轴线&legend 需要的数据 通过后台数据动态修改
        axisData: {
          yAxisNameL: '产量（万吨）',
          yAxisNameR: '变化率（%）',
          type: '产量',
          isXian: false,
        },

        params: {
          // 时间段 2002,2003,2004,2005,2005,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016
          time: '',
          // 地区 全球，中国
          area: '',
          // 数据类型 种植面积/产量/单产  default:112716
          type: ''
        },

        // 这是动态获取排名前10的地区列表的参数 临时保存数据
        getAreaTime: '',
        getAreaType: '',

        // 定义一个data来保存时间改变以后的时间 地区返回成功了才使用这个时间
        timeCache: '',

        setAreaUrl: `apple/production/allDq?TIME_ID=2014&type=112716`

      }
    },
    mounted(){
//      this.renderChart()
    },

    computed: {
      apiUpParams() {
        return {
          AREA_NAME: this.params.area,
          TIME_ID: this.params.time,
          type: this.params.type
        }
      },
      apiDownParams() {
        return {
          AREA_NAME: this.params.area,
          TIME_ID: this.params.time
        }
      },

      // 如果需要联动，打开下面的注释
      /*setAreaUrl() {
        if (this.getAreaTime && this.getAreaType) {
          return `apple/production/allDq?TIME_ID=${this.getAreaTime}&type=${this.getAreaType}`
        }
      }*/
    },

    watch: {
      apiUpParams(newVal) {
        if (newVal.AREA_NAME && newVal.TIME_ID && newVal.type) {
          this.getUpChartData()
        }
      },

      apiDownParams(newVal) {
        if (newVal.AREA_NAME && newVal.TIME_ID) {
          this.getDownChartData()
        }
      }
    },

    methods: {
      // 改变数据 类型
      _changeBtn(name){
        if (name === '种植面积') {
          this.params.type = '121689'
          // 如果需要联动，注释掉上面一行，打开下面一行
//          this.getAreaType = '121689'
          this.axisData.yAxisNameL = '面积（万亩）'
          this.axisData.type = '种植面积'
        } else if (name === '产量') {
          this.params.type = '112716'
          // 如果需要联动，注释掉上面一行，打开下面一行
          // this.getAreaType = '112716'
          this.axisData.yAxisNameL = '产量（万吨）'
          this.axisData.type = '产量'
        } else if (name === '单产') {
          this.params.type = '单产'
          // 如果需要联动，注释掉上面一行，打开下面一行
//          this.getAreaType = '单产'
          this.axisData.yAxisNameL = '单产（公斤/亩）'
          this.axisData.type = '单产'
        }
      },

      // 修改日期 拼接成字符串
      _chooseTime(time) {
        // 如果需要联动，注释掉上面一行，打开下面一行
        /*let year = time.time.split(',')
        // I've got mad!!! 的到最后一年，是为了联动
        if(this.getAreaTime === year[year.length - 1]){
            this.$refs.selectAreas._getSelectArea()
        } else {
          this.getAreaTime = year[year.length - 1]
        }*/

        this.params.time = time.time
        // 如果需要联动，注释掉上面一行，打开下面一行
//        this.timeCache = time.time
      },

      // 改变地区
      _changeArea(area) {
        // 如果需要联动，打开下面注释
        // 为什么要这样，因为只有地区改变了其它的参数才能改变，要不然地区的数据是不准确的！
        // this.params.type = this.getAreaType
        // this.params.time = this.timeCache

        // 处理返回的地区数据 如果是数组就拼串
        if (Array.isArray(area)) {
          this.area = ''
          let newArr = []
          for (let i = 0; i < area.length; i++) {
            newArr.push(area[i])
          }
          this.params.area = newArr.join()
        } else {
          this.params.area = area
        }

      },

      // 请求上图的数据
      getUpChartData() {
        // 发送ajax请求数据
        this.$xhr.get(`apple/production/changeQq`, {
          params: {
            ...this.apiUpParams
          }
        })
          .then((res) => {
            this.echartsDataUp.data = res.data
//            this.titleInfoUp.value = res.data['全球'].titleValue.toFixed(2)
          })
          .catch((err) => {
            console.log(err)

          })
      },

      // 请求下图的数据
      getDownChartData() {
        this.$xhr.get(`apple/production/AllAcc`, {
          params: {
            ...this.apiDownParams
          }
        })
          .then((res) => {
            this.echartsDataDown.data = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      },

    },
    components: {
      selectTime,
      selectBtn,
      explain,
      selectArea,
      productHistorcal,
      productAreaProportionFull
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .product-historical-wrapper {
    /*height:calc(100% - 0.2rem);*/
    height: 100%;
    .chart-up{
      height:55%;
      background-color: #0a1c34;
      .chart-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 18%;
        padding: 0 .5rem;
        .title-info {
          align-self: center;
          font-size: 26px;
          .title-num {
            color: #00af67;
          }
        }
        .center-assist {
          flex: 1;

        }
        .select-wrapper {
          width: 1.5rem;
          margin-right: 0.2rem;
        }
        p {
          margin-right: 0.2rem;
        }
      }
      .chart-wrapper {
        height: 82%;
        padding: 0 .5rem;
      }
    }
    .chart-down {
      height: 45%;
      background-color: transparent;
      .chart-wrapper {
        box-sizing: border-box;
        padding: 0.2rem 0.5rem 0;
        height: 100%;
      }
    }
  }

</style>
