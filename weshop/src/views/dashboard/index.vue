<template>
  <div class="container-fluid">

    <div class="row" style="margin: 0 auto;width:50%">

      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>图一</h4>
          </div>
          <div id="report1" class="card-body" style="width:800px; height:600px;"/>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>图二</h4>
          </div>
          <div id="report2" class="card-body" style="width:800px; height:600px;"/>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
// import * as echarts from 'echarts'

export default({
  name: 'Report',
  mounted: function() {
    console.log('***************')
    this.readReport()
  },
  methods:
    {
      readReport: function() {
        this.showReport1()
        this.showReport2()
        console.log('获取产品列表')
        var that = this
        axios.get(that.GLOBAL.API_ROOT + '/api/get_month_sale_list', { params: {

        }}).then(
          function(response) {
            const saleList = response.data
            const datalist = []
            saleList.forEach(element => {
              const data = { name: element.sale_month,
                value: element.sale_money }
              datalist.push(data)
            })
            console.log(datalist)
            that.showReport1(datalist)
          },
          function(err) {
            console.log(err)
          }
        )
      },

      showReport1: function(datalist) {
        const myChart = this.$echarts.init(document.getElementById('report1'))
        const option = {
          title: {
            text: '不同商品日销售量走势折线图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: datalist
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['06/13', '06/14', '06/15', '06/17', '06/18', '06/19', '06/20']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '数码',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '学习',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '生活',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '服装',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '美妆',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            },
            {
              name: '其他',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
        myChart.setOption(option)
      },

      showReport2: function() {
        var app = {}

        // var chartDom = document.getElementById('main');
        // var myChart = echarts.init(chartDom);
        // var option;

        var posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ]

        app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function(map, pos) {
              map[pos] = pos
              return map
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        }

        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function() {
            var labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            }
            myChart.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            })
          }
        }

        var labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
            }
          }
        }
        const myChart = this.$echarts.init(document.getElementById('report2'))
        const option = {
          title: {
            text: '不同商品日销售量对比柱状图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['其他', '美妆', '服装', '生活']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['2012', '2013', '2014', '2015', '2016']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '其他',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390]
            },
            {
              name: '美妆',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290]
            },
            {
              name: '服装',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190]
            },
            {
              name: '生活',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [98, 77, 101, 99, 40]
            }
          ]
        }

        myChart.setOption(option)
      }
    }
})
</script>

