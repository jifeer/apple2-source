<template>
  <div class='chart_main'>
			<div class="chart_bg">								
				<span id="speedometer_f"></span>
				<span id="speedometer_m"></span>
				<span id="speedometer_b"></span>
				<div class='frontChart'></div>
				<div class='lastChart'></div>
				<div class="middleChart"></div>
				<img src="../../../assets/img/dashBoardBg.png" class="posi-sty"/>
			</div>
		</div>
</template>

<script type="text/javascript">

	  import liquidfill from "../js/echarts-liquidfill.js"
    import {d3} from "../js/d3.v3.min.js"
    import {iopctrl} from "../js/iopctrl.js"
    import {libMain} from "../js/main.min.js"
export default {     
  name: 'component_name',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted(){
  	setTimeout(()=>{
  		this.initdashBoard()
  		
  	},300)
  },
  methods:{
     initdashBoard(){
     	
     	this.$xhr.get('/apple/index/dashboard')
     	 .then((res)=>{
//   	 	  alert(res.data.dashboardData[0].max-res.data.dashboardData[2].seriesData)
//   	   console.log(res.data)
     	//图一
			var waterChart = libMain.CreateWaterChart;
			var createChart = new waterChart();
      createChart.init({
				name: '月均价',
				width: 134,
				height: 134,
				dom: 'frontChart',
				valBigData: res.data.dashboardData[0].max-0,
				seriesData: res.data.dashboardData[0].seriesData-0
			});
      var ticks = libMain.TickVals;
      var tickVals = new ticks();
      tickVals.init({
				domId:'speedometer_f',
				min:res.data.dashboardData[0].min-0,
//      min:0,
				max:res.data.dashboardData[0].max-0,
				width:132,
				height:132,
				section1:res.data.dashboardData[0].section1-0,
				section2:res.data.dashboardData[0].section2-0,
				val:res.data.dashboardData[0].seriesData
			});
			//中间图
      var waterChart = libMain.CreateWaterChart;
      var createChart = new waterChart();
			createChart.init({
				name: '日均价',
				width: 150,
				height: 150,
				dom: 'middleChart',
				valBigData: res.data.dashboardData[1].max-0,
				seriesData: res.data.dashboardData[1].seriesData-0,
				date:res.data.dashboardData[1].date
			});
      var ticks = libMain.TickVals;
      var tickVals = new ticks();
			tickVals.init({
				domId:'speedometer_m',
				min:res.data.dashboardData[1].min-0,
				max:res.data.dashboardData[1].max-0,
				width:213,
				height:211,
				pathx:107,
				pathy:110,
        section1:res.data.dashboardData[0].section1-0,
        section2:res.data.dashboardData[0].section2-0,
				val:res.data.dashboardData[1].seriesData,
				innerRadius:33
			});
			//图三
      var waterChart = libMain.CreateWaterChart;
      var createChart = new waterChart();
			createChart.init({
				name: '年均价',
				width: 134,
				height: 134,
				dom: 'lastChart',
				valBigData: res.data.dashboardData[2].max*1,
				seriesData: res.data.dashboardData[2].seriesData*1
			});
      var ticks = libMain.TickVals;
      var tickVals = new ticks();
			tickVals.init({
				domId:'speedometer_b',
				min:res.data.dashboardData[2].min-0,
				max:res.data.dashboardData[2].max-0,
				width:132,
				height:132,
        section1:res.data.dashboardData[2].section1,
        section2:res.data.dashboardData[2].section2,
				val:res.data.dashboardData[2].seriesData
			});
	})
  	}
  },
}
</script>

<style lang="scss" >
.chart_main {
	width: 100%;
	height: 100%;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-content: center;
}

.chart_bg {
	position: relative;
}

.chart_txt {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 38px;
	left: 0;
	text-align: center;
	color: #fff;
	z-index: 10;
}

.unitBox{
	position:relative;
	top:30px;
	left:0px;
}
.unitBox>span {
	font-size: 14px;
	position: absolute;
	top: 37px;
	left: 44px;
}

.chart_txt>p {
	font-size: 16px;
	margin-top: 75px !important;
}
 .middleChart .chart_txt p:nth-child(2){
	font-size: 16px;
	margin-top: 110px !important;
}
 .middleChart .chart_txt p:nth-child(3){
	font-size: 16px;
	margin-top: 10px !important;
}
.posi-sty {
	position: relative;
	top:-72px;
/*	z-index: 999;*/
}

#speedometer_f {
	position: absolute;
	top: 145px;
	left: 103px;
	z-index: 9;
}

#speedometer_m {
	position: absolute;
	top: 96px;
	left: 223px;
	z-index: 8;
}

#speedometer_b {
	position: absolute;
	top: 145px;
	left: 427px;
	z-index: 9;
}


/*d3样式*/

.unselectable {
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}


/* css formats for the gauge */

.gauge .domain {
	stroke-width: 2px;
	stroke: #35c5ed;
}

.gauge .tick line {
	stroke: #FFFFFF;
	stroke-width: 2px;
}

.gauge line {
	stroke: #FFFFFF;
}

.gauge .arc,
.gauge .cursor {
	opacity: 0;
}

.gauge .major {
	fill: #FFFFFF;
	font-size: 12px;
	font-weight: normal;
}
</style>
