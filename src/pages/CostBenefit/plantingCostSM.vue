<template>

  	<div class="plantingCostSM-box">
  		<PCchart :cbchartData="cbchartData"></PCchart>
  	</div>
  </div>
</template>

<script type="text/javascript">
  import PCchart from "./echarts/PCchart.vue"

export default {
  name: 'plantingCost',

  data() {
    return {
       cbchartData:{
					xdata : [],
	          dataa : [],
            datab : [],
            datac : [],
	          option:{
	          	yAxis:{
	                nameTextStyle: {
	                    fontSize:'12',
	                },
	                axisLabel: {    //坐标轴刻度标签的相关设置。
	                    textStyle: {
	                        fontSize: 12
	                    }
	                },
	          	},
	          	dataZoom:[{show:false}],
	          	xAxis: {
                axisLabel: {
                    fontSize:12,
                },
             },
             grid:{
             	left:"5%",
             	right:"5%",
             	width:"90%",
             	top:"22%",
             	bottom:"5%",
             	containLabel: true,
             },
             series : [
                    {
	                  symbolSize:3,
	                  lineStyle:{
                       normal: {
			                 width: 2,
					            },
                    },
						        itemStyle: {
						            normal: {
						                borderColor:"#FFF500",
						                borderWidth:1,
						            },

						        },
                 },
                    {
	                  symbolSize:3,
	                  lineStyle:{
                       normal: {
			                 width: 2,
					            },
                    },
						        itemStyle: {
						            normal: {
						                borderColor:"#FFF500",
						                borderWidth:1,
						            },
						        },
                 },
                    {
	                  symbolSize:3,
	                  lineStyle:{
                       normal: {
			                 width: 2,
					            },
                    },
						        itemStyle: {
						            normal: {
						                borderColor:"#FFF500",
						                borderWidth:1,
						            },

						        },
                 }
             ],
             legend:{show:false}
	          },
				},
    }
  },
  mounted(){
  	this.renderChart()
  },
  methods:{
	        changeBtn(name){
	        },
	        myownEvent(){
	            this.changeBar()
	        },
	        renderChart(){
	            setTimeout( ()=> {
	                this.cbchartData.xdata =  [2011,2012,2013,2014];
	                this.cbchartData.dataa =  [9402, 5402, 6402, 5402, 7402, 14402, 11402];
	                this.cbchartData.datab =  [5402, 7402, 4402, 9802, 6402, 12402, 14102];
	                this.cbchartData.datac =  [5402, 3402, 6402, 10402, 8402, 11402, 11402];
	            },200)

	        },
	        changeBar(){
	            // 在这里发送请求
	            setTimeout(() => {
	                this.cbchartData.xdata =  ['Mon', 'Tue', 'Wed']
	                this.cbchartData.data =  [10, 152, 100]
	                this.cbchartData.option = {
	                    yAxis : [
	                        {
	                            type : 'value',
	//                          name:  'tes22222222222'
	                        }
	                    ],
	                }
	            },500)
	        }


  },
  components:{
  	PCchart,

  }
}
</script>

<style lang="scss" scoped>
	@import "./../../assets/css/_variable.scss";
	@import "./../../assets/css/_mixin.scss";
	.plantingCostSM-box{
		width: 4.35rem;
		height: 1.65rem;
		margin: 0 auto;
	}
</style>
