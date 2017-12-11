<template>
  <div data-comp="test-component">
    <div :id="this.scorllOption.id" style="box-sizing: border-box;position: relative;" v-bind:style="{ width: scorllOption.width, height:scorllOption.height}"></div>
  </div>
</template>
<script type="text/javascript">
  import * as timeScroll from 'assets/js/timeScroll'
  import { getArrayMax, getArrayMin} from 'assets/js/common'
  export default {
    name: 'timeScroll',
    props: {
      scorllOption: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {}
    },
    mounted() {
      setTimeout(() => {
        this.initTimeScroll()
      }, 20)
    },
    methods: {
      handleTimeData(resData) {
        let res = '';
        if (resData.length > 4) //月度
        {
          res = resData.replace('-', "")
        } else {
          res = resData
        }
        return res;
      },
      getLastTime(time){
         let res = []
         let result1 = ""
         time.forEach((v,i,a)=>{
            let v1 =  v.replace('-', "")
            let v2 = parseInt(v1)
            res.push(v2)
         })
         let result = getArrayMax(res);

         if(result.toString().length > 4){ //月度
            let start = result.toString().substring(0,4);
            let end = result.toString().substring(4)
            result1 = start + '-' + end;
            return result1
         }
         else{ //年度
           return result.toString()
         }

      },
      initTimeScroll() {
        this.$xhr({
          method: 'get',
          url: this.scorllOption.url,
          data: {

          }
        }).then((res) => {
          //console.log('res: '+ JSON.stringify(this.handleTimeData(res.data.year)))
          //let timeData = this.handleTimeData(res.data);
          let timeData = this.getLastTime(res.data)

          let el = {
            width: document.getElementById(this.scorllOption.id).clientWidth,
            height: document.getElementById(this.scorllOption.id).clientHeight,
            id: this.scorllOption.id,
            handle: 8,
            init: this.scorllOption.pos || timeData,
            ticklength: 12, //刻度大小
            // data:[ //后台数据
            //     "2016-05","2016-06","2016-07","2016-08","2016-09","2016-10","2016-11","2016-12","2017-01","2017-02","2017-03","2017-04","2017-05","2017-06","2017-07","2017-08","2017-09","2017-10","2017-11","2017-12"
            // ]
            data: res.data
          };
          let scale = new timeScroll.TimeLinescale(el);
          // 实例后调用  创建滑块
          scale.createScale();
          //监听滑块鼠标抬起时触发的函数
          // scale.on("click", (d)=>{
          //     this.$emit('scorllTime',d.datas)
          // });

          if(this.scorllOption.needDefault){
            this.$emit('scorllTime', this.handleTimeData(this.getLastTime(res.data)))
          }

          scale.on((d) => {
            // console.log(d)
            this.$emit('scorllTime', this.handleTimeData(d))
          })
        }).catch((error) => {
          console.log(error)
        })

      },
    },
    computed: {

    },
    watch: {
      scorllOption: {
        handler: function (newVal) {
          this.initTimeScroll()
        },
        deep: true
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";

</style>
