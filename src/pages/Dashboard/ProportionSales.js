/* eslint-disable */
import React, { memo } from 'react';
import { Card, Radio } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { Pie } from '@/components/Charts';
import Yuan from '@/utils/Yuan';

const ProportionSales = memo(
  ({ dropdownGroup, salesType, loading, salesPieData, handleChangeSalesType }) => (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="权益类别销量占比"
      bodyStyle={{ padding: 24 }}
      extra={
        <div className={styles.salesCardExtra}>
          {/* {dropdownGroup} */}
          <div className={styles.salesTypeRadio}>
            <Radio.Group value={salesType} onChange={handleChangeSalesType}>
              <Radio.Button value="all">
                <FormattedMessage id="app.analysis.channel.all" defaultMessage="ALL" />
              </Radio.Button>
              <Radio.Button value="online">BOSS</Radio.Button>
              <Radio.Button value="stores">权益商城</Radio.Button>
              <Radio.Button value="stores2">异业触点</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
      style={{ marginTop: 24 }}
    >
      <h4 style={{ marginTop: 10, marginBottom: 32 }}>
        <FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />
      </h4>
      <Pie
        hasLegend
        subTitle={<FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />}
        total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
        data={salesPieData}
        valueFormat={value => <Yuan>{value}</Yuan>}
        height={270}
        lineWidth={4}
        style={{ padding: '8px 0' }}
      />
    </Card>
  )
);

export default ProportionSales;
