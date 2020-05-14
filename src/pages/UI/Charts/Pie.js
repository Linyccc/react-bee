/* eslint-disable */
import React, { Component } from 'react';
import { Pie, yuan, ChartCard } from '@/components/Charts';

const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ChartCard title="饼图">
        <Pie
          hasLegend
          title="销售额"
          subTitle="销售额"
          total={() => (
            <span
              dangerouslySetInnerHTML={{
                __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
              }}
            />
          )}
          data={salesPieData}
          valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
          height={294}
        />
      </ChartCard>
    );
  }
}

export default Demo;
