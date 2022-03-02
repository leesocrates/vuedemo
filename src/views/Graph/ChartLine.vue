<template>
  <div class="page-line-chart">
    <h4>{{title}}</h4>
    <VeLine :data="chartData" :extend="chartExtend"></VeLine>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import Api from '@/api/apis'

export default {
  name: 'ChartLine',
  data () {
    return {
      title: '应用帧率图',
      chartData: {
        columns: [],
        rows: []
      },
      chartExtend: {
        yAxis: {
          show: true,
          name: '帧率',
          nameLocation: 'end',
          position: 'left'
        },
        xAxis: {
          show: true,
          name: '时间',
          nameLocation: 'middle',
          position: 'left'
        }
      }
    }
  },
  components: {
    VeLine
  },
  mounted () {
    Api.getFsData()
      .then(response => {
        if (response.data != null && response.data.hits != null && response.data.hits.hits != null) {
          this.chartData.columns = ['日期', '帧率']
          response.data.hits.hits.forEach((element, index) => {
            this.chartData.rows.push({ '日期': element['_source'].createDate + '_' + index, '帧率': element['_source'].fs })
          })
        }
      })
      .catch(response => {

      })
  }
}
</script>
