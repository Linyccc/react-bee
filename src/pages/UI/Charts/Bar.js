import React, { Component } from 'react';
import { Bar, ChartCard } from '@/components/Charts';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ChartCard title="柱状图">
        <Bar height={200} title="销售额趋势" data={salesData} />
      </ChartCard>
    );
  }
}

export default Demo;
