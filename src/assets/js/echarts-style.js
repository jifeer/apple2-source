import { $, datazoom } from 'assets/js/common'
import deepcopy from 'deepcopy'

export const dataZoom = datazoom

export const tooltipStyle = {
  // trigger: 'axis',
  axisPointer: {
    type: 'shadow',
    shadowStyle: {
      color: 'rgba(0,46, 115, 0.3)'
    }
  },
  /*axisPointer: {
    type: 'line',
    lineStyle: {
      color: 'rgb(216, 115, 24)',
      type: 'dotted',
      width: 2
    }
  },*/
  textStyle: {
    align: 'left',
    color: '#fff',
    fontSize: '16'
  },
  backgroundColor: 'rgba(9, 157, 79, 0.9)',
  borderWidth: '1',
  borderColor: '#5cc1ff',
  extraCssText: 'box-shadow: 0 0 10px rgba(10, 242, 120, 0.7);'
}

// x轴 y轴字体样式大小 距离设置
export const axisLabel = {
  textStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'lighter'
  },
  margin: 18,
  formatter:(params)=>{
		return params
	}
}

// 图例设置
export const legend = {
  textStyle: {
    color: '#fff',
    fontSize: 18
  }
}

export class MarkArea {
  constructor({ option, flag, itemStyle }) {
    this.option = deepcopy(option)
    this.flag = flag
    this.itemStyle = itemStyle

    // 直接运行
    // this.run()
  }

  proItemStyle() {
    if (this.itemStyle.isDiy) {
      let itemStyleArr = new Array()
      let i = 0
      while (i < this.flag.length) {
        let num = i % 2 === 0 ? 1 : 0
        let style = this.itemStyle.diyStyle[num].join(',')
        itemStyleArr.push([{
          itemStyle: {
            normal: {
              color: `rgba(${style})`
            }
          }
        }, {
          // nothing
        }])
        i++
      }
      return itemStyleArr
    } else {
      let itemStyleArr = new Array()
      let i = 0
      while (i < this.flag.length) {
        let style = this.itemStyle.fixStyle.join(',')
        let percent = 0.4 - (0.1 * i)
        itemStyleArr.push([{
          itemStyle: {
            normal: {
              color: `rgba(${style},${percent})`
            }
          }
        }, {
          // nothing
        }])
        i++
      }
      return itemStyleArr
    }
  }

  addXAxis() {
    const flag = this.option.xAxis instanceof Array
    if (!flag) {
      console.error('the type of xAxis must be an Array!')
      return
    }
    let len = this.option.xAxis[0].data.length
    let i = 0
    let data = new Array(len + 1)
    // while (i <= len) {
    //   data[i] = i
    //   i++
    // }
    return {
      data,
      boundaryGap: false,
      show: false
    }
  }

  handleMarkArea() { // 拼接 样式 与 数据
    // 生成样式
    let baseMarkare = this.proItemStyle()
    // 填充数据
    baseMarkare.forEach((item, index) => {
      item[0].coord = [this.flag[index][0]]
      item[1].coord = [this.flag[index][1]]
    })

    // 拼接 series 数据当中的 markarea
    let markare = {
      xAxisIndex: 1,
      name: '销量',
      type: 'bar',
      data: [0],
      markArea: {
        silent: true,
        data: baseMarkare
      }
    }
    return markare
  }

  run() {
    // 生成 markare 的 x轴
    this.option.xAxis.push(this.addXAxis())
    this.option.series.push(this.handleMarkArea())
    return this.option
  }
}

export let obj = {
  name: 'cs',
  height: 187
}
