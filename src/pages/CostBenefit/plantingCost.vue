<template>
  <div>
  	<div class="product-historical-wrapper big-wrapper">
    <div class="bigW-intro">2017年分地区看，山东地区每亩总成本最高，达到<span>11597.9</span>元</div>
    <div class="bigW-option">
      <selectTime :timeType="timeType"></selectTime>
      <selectDiy class="select-province-wrapper" :selectData="selectData" ></selectDiy>
      <selectDiy class="select-cost-wrapper" :selectData="selectDatab" ></selectDiy>
      <explain :eText="eText"></explain>
    </div>
    
  	<div class="pcchart-box">
  		<PCchart :cbchartData="cbchartData"></PCchart>
  	</div>
  </div>
  </div>
</template>

<script type="text/javascript">
  import PCchart from "./echarts/PCchart.vue"
  import selectTime from 'components/selectTime/selectTime';
  import selectDiy from 'components/selectDiy/selectDiy';
  import explain from 'components/explain/explain';
export default {
  name: 'plantingCost',
  
  data() {
    return {
    	myowndata:"我国苹果种植成本收益评估",
		timeType:"day",
		btnData:["单位面积","单位产品"],
		eText:"室内场地上看到今年家里水泥厂初生牛犊坤彩科技奴隶少女成立三年内",
		selectData:[
			  {value:"1",name:"北京"},
			  {value:"2",name:"天津"},
			  {value:"3",name:"上海"},
			  {value:"4",name:"河北"},
			  {value:"5",name:"宁夏回族自治区"},
			  {value:"6",name:"新疆"},
			  {value:"7",name:"云南"},
			  {value:"8",name:"福建"},
			],
			selectDatab:[
			  {value:"1",name:"土地成本"},
			  {value:"2",name:"人工成本"},
			  {value:"3",name:"劳动日工价"},

			],
        cbchartData:{
			xdata : [],
            dataa : [],
            datab : [],
            datac : [],
            option:{
            	dataZoom:[{
            		show:true,
            		left:160,
            		right:50
            	}],
            },
		},
    }
  },
  mounted(){
  	this.renderChart()
  },
  methods:{
	        changeBtn(name){
	            console.log(name)
	        },
	        myownEvent(){
	            this.changeBar()
	        },
	        renderChart(){
	            setTimeout( ()=> {
	                this.cbchartData.xdata =  [2011,2012,2013,2014,2015,2016,2017];
	                this.cbchartData.dataa =  [9402, 5402, 6402, 5402, 7402, 14402, 11402];
	                this.cbchartData.datab =  [9802, 4402, 7402, 5402, 6402, 12402, 14102];
	                this.cbchartData.datac =  [10402, 3402, 6402, 5402, 8402, 11402, 11402];

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
  	selectTime,
  	selectDiy,
  	explain,
  }
}
</script>

<style lang="scss" scoped>
	@import "./../../assets/css/_variable.scss";
	@import "./../../assets/css/_mixin.scss";
	.pcchart-box{
		width: 13.3rem;
		height: 4.5rem;
	}
	.bigW-option{
		color:#0164A0;
		
	}
	.bigW-intro{
		span{
			color:#00B060
		}
	}
			.select-wrapper{
		margin-right: 0.4rem;

	}
	.select-cost-wrapper{
		width: 1.6rem !important;
	}
</style>
