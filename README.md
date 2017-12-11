### 一、 组件的引入
1. 组件的引入 需要使用大驼峰形式， 如：  
`import SelectArea from 'dir'`
而当在 `<template></template>` 模板当中使用的时候 将驼峰式 转换为短线线的形式。 如  
`<select-area></select-area>`

### 二、 selectDiy 组件使用
```
<select-diy class="select-province-wrapper" :selectData="selectData" v-if="selectData.length"></select-diy>
```
* 示例组件 `src\pages\CostBenefit\laborCost.vue`
* 如果是 动态传输过来的 data, 则需要加上 `v-if="selectData.length"` 做判断
* selectDiy 组件可接受两种数据格式。组件内部已做判断 无需关心
```
["全国", "山东省", "河南省", "江苏省", "陕西省", "山西省", "四川省"]

[
    {
      "areaId": "110000",
      "areaName": "北京市"
    },
    {
      "areaId": "120000",
      "areaName": "天津市"
    }
]

```
* 添加自定义事件 `@change="changeArea"`。 `changeArea` 将会输出具体的选取地点。之后可在其中进行 echats 图表数据的获取。 继而通过 echats组件 当中的 `watch` 勾子进行 echats 图表的 渲染。
```
changeArea(area) {
  console.log(area)
}
```

二、 selectArea组件 
* 示例组件 `src\pages\test\test.vue`

如果地区是单选请用 selectDiy组件
此组件只做多选下拉框 
<selectArea url="apple/price/warning/getCity" @change="_changeArea"></selectArea>
默认最多选择3个

请求的数据有2种数据格式
[{name:'',value:''},{}]  这种自动返回value值

['北京','天津','文字']  这种自动返回文字









三、selectBtn 组件

```
<selectBtn :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="changeBtn" ></selectBtn>
```

此组件现在可以传入一个默认的选中索引 不传是0
因为有的要求默认选中年份，


四、timeScroll组件
此组件是可视化提供拖动时间轴组件  列子  `src\pages\test\test.vue`
注意 ： 我们不再关心后台传入的时间是升序还是降序了  我统一处理成取数组中最新的日期
```
<div class="timeScroll-wrapper" >
      <timeScroll :scorllOption="scorllOption" @scorllTime="scorllTime"></timeScroll>
    </div>
```
data中定义scorllOption
```
scorllOption:{
          width:'15rem', //宽
          height:'100px', //高
          id:'a1',  //随便写ID  保证同一个页面ID不一样就可以
          needDefault: true //是否需要默认的时间来渲染图表
          url:'/apple/trade/countryFlow/getTimes?TIME_TYPE=year'
}
```

