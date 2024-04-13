import React from 'react'
import {$totalPrice} from '../../api/typeApi'
import './TotalPrice.scss'
import * as echarts from 'echarts';

export default function TotalPrice() {
  let refDiv = useRef()
  useEffect(()=>{
    var myChart = echarts.init(refDiv.current);
    $totalPrice().then(ret=>{
      let roomtypeNames = ret.map(r=>r.roomtypeName)
      let values = ret.map(r=>r.totalMoney)
      // echart design
      myChart.setOption({
        title: {
          text: 'Room Type Sales Revenue Statistics'
        },
        grid:{
          width:'1000px',
          top:'10%',
          left:'5%',
          right:'10%',
          bottom:'10%'
        },
        tooltip: {},
        xAxis: {
          data: roomtypeNames
        },
        yAxis: {},
        series: [
          {
            name: 'Sales Revenue',
            type: 'bar',
            data: values
          }
        ]
      });
    })
    
  },[])
  return (
    <div className='charts' ref={refDiv}></div>
  )
}