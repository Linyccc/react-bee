import React, { Component } from 'react';
import { WaterWave, ChartCard } from '@/components/Charts';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ChartCard title="水波图">
        <WaterWave height={161} title="补贴资金剩余" percent={34} />
      </ChartCard>
    );
  }
}

export default Demo;
