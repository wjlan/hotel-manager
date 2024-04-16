import React, { useRef, useEffect } from 'react';
import { $totalPrice } from '../../api/typeApi';
import './TotalPrice.scss';
import * as echarts from 'echarts';

export default function TotalPrice() {
  let refDiv = useRef();

  useEffect(() => {
    var myChart = echarts.init(refDiv.current);
    $totalPrice().then((ret) => {
      let roomtypeNames = ret.map((r) => r.roomtypeName);
      let values = ret.map((r) => r.totalMoney);
      // echart design
      myChart.setOption({
        title: {
          text: 'Sales Revenue Statistics of Room Types',
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '15%', // Increase bottom padding for x-axis labels
        },
        tooltip: {},
        xAxis: {
          data: roomtypeNames,
          axisLabel: {
            interval: 0,
            rotate: 45, // Rotate x-axis labels
          },
        },
        yAxis: {},
        series: [
          {
            name: 'Sales Revenue',
            type: 'bar',
            data: values,
          },
        ],
      });
    });
  }, []);

  return <div className="charts" ref={refDiv}></div>;
}
