import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="权益总销量"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>126560</Yuan>}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-sales" defaultMessage="Daily Sales" />}
            value={`￥${numeral(12423).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="触点销量占比"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={<Field label="触点数量" value="60%" />}
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="资源使用率"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total="78%"
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              未使用
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              已过期
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="商城访问量"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-visits" defaultMessage="Daily Visits" />}
            value={numeral(1234).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
    {/* <Col span={6} style={{ marginBottom: 24 }}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="商城访问量"
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-visits" defaultMessage="Daily Visits" />}
            value={numeral(1234).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
    <Col span={18} style={{ marginBottom: 24 }}>
      <Row gutter={24}>
        <Col span={8} style={{ marginBottom: 24 }}>
          <ChartCard
            title="权益数量"
            avatar={<Icon type="shop" style={{ fontSize: 56, color: '#baa66e' }} />}
            action={
              <Tooltip title="指标说明">
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={() => numeral(6560).format('0,0')}
          />
        </Col>
        <Col span={8} style={{ marginBottom: 24 }}>
          <ChartCard
            title="用户数量"
            avatar={<Icon type="user" style={{ fontSize: 56, color: '#1890ff' }} />}
            action={
              <Tooltip title="指标说明">
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={() => numeral(6560).format('0,0')}
          />
        </Col>
        <Col span={8} style={{ marginBottom: 24 }}>
          <ChartCard
            title="商户数量"
            avatar={<Icon type="bank" style={{ fontSize: 56, color: '#13c2c2' }} />}
            action={
              <Tooltip title="指标说明">
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={() => numeral(6560).format('0,0')}
          />
        </Col>
        <Col span={8} style={{ marginBottom: 24 }}>
          <ChartCard
            title="缺货预警资源"
            avatar={<Icon type="warning" style={{ fontSize: 56, color: '#facc14' }} />}
            action={
              <Tooltip title="指标说明">
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={() => numeral(18).format('0,0')}
          />
        </Col>
        <Col span={8} style={{ marginBottom: 24 }}>
          <ChartCard
            title="失效预警资源"
            avatar={<Icon type="stop" style={{ fontSize: 56, color: '#f50' }} />}
            action={
              <Tooltip title="指标说明">
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={() => numeral(34).format('0,0')}
          />
        </Col>
      </Row>
    </Col> */}
  </Row>
));

export default IntroduceRow;
