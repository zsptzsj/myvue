<!--
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-05 09:28:42
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-08 08:24:26
 * @FilePath: \vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--  -->
<template>
  <div>
    <el-row>
      <el-row :gutter="10" style="margin-bottom: 60px">
        <el-col :span="6">
          <el-card>
            <div style="color: #409eff">
              <i class="el-icon-money"></i> 销售总数
            </div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              <!-- <el-tag type="primary"  style="font-size: 20px;">10000000</el-tag> -->
              ￥ 100000
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><el-card
            ><div style="color: #67c23a">
              <i class="el-icon-user"></i> 用户总数
            </div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              100
            </div></el-card
          ></el-col
        >
        <el-col :span="6"
          ><el-card
            ><div style="color: #f56c6c">
              <i class="el-icon-bank-card"></i> 收益总额
            </div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              ￥ 300000
            </div></el-card
          ></el-col
        >
        <el-col :span="6"
          ><el-card
            ><div style="color: #409eff">
              <i class="el-icon-s-shop"></i> 门店数量
            </div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              100
            </div></el-card
          ></el-col
        >
      </el-row>
      <el-col :lg="12" :xs="24">
        <div id="main" style="width: 500px; height: 400px"></div>
      </el-col>
      <el-col :lg="12" :xs="24">
        <div id="pie" style="width: 500px; height: 400px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {};
  },
  mounted() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: 'Referer of a Website',
        subtext: '趋势图',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['线', '条'],
      },
      xAxis: {
        type: 'category',
        data: ['第一季度', '第二季度', '第三季度', '第四季度'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '线',
          data: [],
          type: 'line',
        },
        {
          name: '条',
          data: [],
          type: 'bar',
        },
      ],
    };

    var piechartDom = document.getElementById('pie');
    var piemyChart = echarts.init(piechartDom);

    var pieoption = {
      title: {
        text: 'Referer of a Website',
        subtext: '比例',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '星巴克',
          type: 'pie',
          radius: '50%',
          center: ['25%', '50%'],
          label: {
            show: true,
            position: 'inner',
            textStyle: {
              fontWeight: 300,
              fontSize: 16,
            },
            formatter: '{d}%',
          },
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        {
          name: '瑞星咖啡',
          type: 'pie',
          radius: '50%',
          center: ['75%', '50%'],
          label: {
            show: true,
            position: 'inner',
            textStyle: {
              fontWeight: 300,
              fontSize: 16,
            },
            formatter: '{d}%',
          },
          data: [
            { name: '第一季度', value: 5},
            { name: '第二季度', value: 22 },
            { name: '第三季度', value: 445 },
            { name: '第四季度', value: 2000000},
          ],
          emphasis: {
            itemStyle: { 
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    this.request.get('/echarts/members').then((res) => {
      // option.xAxis.data = res.x
      option.series[0].data = res.data;
      option.series[1].data = res.data;

      pieoption.series[0].data = [
        { name: '第一季度', value: res.data[0] },
        { name: '第二季度', value: res.data[1] },
        { name: '第三季度', value: res.data[2] },
        { name: '第四季度', value: res.data[3] },
      ];

      myChart.setOption(option);
      piemyChart.setOption(pieoption);
    });
  },
};
</script>

<style scoped></style>
