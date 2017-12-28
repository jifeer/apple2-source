<template>
  <div class="clearfix">
    <div class="canvasDiv left">
      <div class="canvasDivLeft-main">
        <canvas id="myCanvasLeft"></canvas>
      </div>
      <div class="gradientLineLeft"></div>
    </div>
    <div class="canvasDiv right">
      <div class="gradientLineRight"></div>
      <div class="canvasDivRight-main">
        <canvas id="myCanvasRight"></canvas>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {resizeMixin} from 'assets/js/common'
  import LibraryWave from "../js/library-example.min.js"
  export default {
    name: 'leftWater',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        canWidth: 0,
        timerLeft: null,
        timerRight: null,
        timer: 0
      }
    },
    mounted(){
      this.getCanvasWidth()
      // 异步执行的
      this.waveCanvas()
    },

    methods: {
      waveCanvas(){
        this.$xhr.get("apple/index/getIndexStatistics")
          .then((res) => {
            var SWlefter = LibraryWave.waveLeft;

            this.SWleft = new SWlefter({
              dom: 'myCanvasLeft',
              width: this.canWidth,
              height: 30,
              value1: res.data.productData,   //总产量值
              valuemax1: 6000,  //总产量最大值
              years: res.data.requestYear,
              percent: res.data.productRateData
            });
            this.SWleft.setSpeed(0.1);
            this.SWleft.setNoise(0.8)
            this.SWleft.start();

            var SWrighter = LibraryWave.waveRight;
            this.SWright = new SWrighter({
              dom: 'myCanvasRight',
              width: this.canWidth,
              height: 30,
              value2: res.data.consumeData,   //总产量值
              valuemax2: 6000,  //总产量最大值
              years: res.data.requestYear,
              percent: res.data.consumeRateData
            });
            this.SWright.setSpeed(0.1);
            this.SWright.setNoise(0.8)
            this.SWright.start();
          })
      },

      // 获取canvas的宽度
      getCanvasWidth() {
        this.canWidth = document.getElementsByClassName('canvasDivLeft-main')[0].offsetWidth
      },
      // wave自适应
      _windowResizeHandler() {
        var wrapper = document.getElementsByClassName('canvasDivLeft-main')[0].offsetWidth
        var canLeft = document.getElementById('myCanvasLeft')
        var canRight = document.getElementById('myCanvasRight')
        canLeft.style.width = wrapper + 'px'
        canRight.style.width = wrapper + 'px'
      },
      // 销毁something
      _destroyEchart() {
        // 停止循环
        this.SWleft.stop()
        this.SWright.stop()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .canvasDiv canvas {
    display: block;
  }

  .waveMain {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-content: center;
  }

  .canvasDiv {
    width: calc(50% - 1px);
    height: 145px;
    /*width:100%;*/
    /*height: 100%;*/
    position: relative;
  }

  .gradientLineLeft {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 145px;
    float: right;
    background-image: -webkit-linear-gradient(to bottom, rgba(3, 201, 227, 0), rgba(3, 201, 227, 0.6), rgba(3, 201, 227, 0.6), rgba(3, 201, 227, 0.8), rgba(3, 201, 227, 1));
    background-image: linear-gradient(to bottom, rgba(3, 201, 227, 0), rgba(3, 201, 227, 0.6), rgba(3, 201, 227, 0.6), rgba(3, 201, 227, 0.8), rgba(3, 201, 227, 1));
  }

  .canvasDivLeft-main {
    width: 100%;
    height: 145px;
    position: relative;
    /*background: -webkit-linear-gradient(right top, rgba(7, 170, 224, 0.2), rgba(7, 170, 224, 0.2), rgba(15, 44, 120, 0));*/
    /*background: linear-gradient(right top, rgba(2, 206, 239, 0.3), rgba(2, 206, 239, 0.2), rgba(2, 206, 239, 0));*/
  }

  .gradientLineRight {
    width: 1px;
    height: 145px;
    float: left;
    background-image: -webkit-linear-gradient(to bottom, rgba(184, 248, 71, 0), rgba(184, 248, 71, 0.6), rgba(184, 248, 71, 0.6), rgba(184, 248, 71, 0.8), rgba(184, 248, 71, 1));
    background-image: linear-gradient(to bottom, rgba(184, 248, 71, 0), rgba(184, 248, 71, 0.6), rgba(184, 248, 71, 0.6), rgba(184, 248, 71, 0.8), rgba(184, 248, 71, 1));
  }

  .canvasDivRight-main {
    width: 100%;
    height: 145px;
    position: relative;
    /*background: -webkit-linear-gradient(left top, rgba(93, 186, 135, 0.6), rgba(93, 186, 135, 0.3), rgba(93, 186, 135, 0));*/
    /*background: linear-gradient(left top, rgba(93, 186, 135, 0.6), rgba(93, 186, 135, 0.3), rgba(93, 186, 135, 0));*/
    .value-main {
      top: 40% !important;
    }
  }

  #myCanvasRight {
    position: absolute;
    top: 0;
    left: 5px;
    background-image: url('../../../assets/img/right.png');
    background-size: 100% 100%;
  }

  #myCanvasLeft {
    position: absolute;
    right: 3px;
    background-image: url('../../../assets/img/left.png');
    background-size: 100% 100%;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

</style>
