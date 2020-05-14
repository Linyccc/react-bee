import React, { Component } from 'react';
import { TagCloud, ChartCard } from '@/components/Charts';

const tags = [];
for (let i = 0; i < 50; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
    value: Math.floor(Math.random() * 50) + 20,
  });
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ChartCard title="标签云">
        <TagCloud data={tags} height={200} />
      </ChartCard>
    );
  }
}

export default Demo;
