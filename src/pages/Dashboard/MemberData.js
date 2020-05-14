/* eslint-disable */
import React, { memo } from 'react';
import { Row, Col, Table, Tooltip, Card, Icon } from 'antd';
// import { FormattedMessage } from 'umi/locale';
import Trend from '@/components/Trend';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { TimelineChart, Pie, MiniArea } from '@/components/Charts';
import numeral from 'numeral';
import styles from './Analysis.less';
import NumberInfo from '@/components/NumberInfo';

const MemberData = memo(({ loading, offlineChartData, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title="全球通钻石会员发展活动实时达成情况"
    extra={dropdownGroup}
    style={{ marginTop: 24 }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={<span>今日发展会员数</span>}
          gap={8}
          total={numeral(12321).format('0,0')}
        />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo subTitle={<span>活动目标完成率</span>} total={numeral(79 / 100).format('0%')} />
      </Col>
    </Row>
    <TimelineChart
      height={270}
      data={offlineChartData}
      titleMap={{
        y1: '昨日',
        y2: '今日',
      }}
    />
  </Card>
));

export default MemberData;
