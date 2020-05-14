import React, { Component } from 'react';
import { TimelineChart, ChartCard } from '@/components/Charts';

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ChartCard title="折线图">
        <TimelineChart height={200} data={chartData} titleMap={{ y1: '客流量', y2: '支付笔数' }} />
      </ChartCard>
    );
  }
}

export default Demo;
