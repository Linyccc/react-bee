/* eslint-disable */
import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Avatar, Steps, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import numeral from 'numeral';
import avatar from '@/assets/user-head.png';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));
const MemberData = React.lazy(() => import('./MemberData'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));
const OfflineData = React.lazy(() => import('./OfflineData'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>欢迎admin ，祝你开心每一天！</div>
          <div>工号：100000 | xxxx有限公司 - 客户服务部</div>
        </div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>缺货预警</p>
          <p className={styles.warning}>{numeral(18).format('0,0')}</p>
        </div>
        <div className={styles.statItem}>
          <p>失效预警</p>
          <p className={styles.danger}>{numeral(34).format('0,0')}</p>
        </div>
        <div className={styles.statItem}>
          <p>权益数量</p>
          <p>{numeral(56).format('0,0')}</p>
        </div>
        <div className={styles.statItem}>
          <p>用户数量</p>
          <p>{numeral(8846).format('0,0')}</p>
        </div>
        <div className={styles.statItem}>
          <p>商户数量</p>
          <p>{numeral(2233).format('0,0')}</p>
        </div>
      </div>
    );
    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    return (
      <PageHeaderWrapper loading={loading} content={pageHeaderContent} extraContent={extraContent}>
        <GridContent>
          <Suspense>
            <Card
              title="权益注册管理流程"
              bordered={false}
              style={{ marginBottom: 24 }}
              loading={loading}
            >
              <Steps progressDot current={1} className="margin-top">
                <Steps.Step title="创建商户" />
                <Steps.Step title="引入资源" />
                <Steps.Step title="资源入库" />
                <Steps.Step title="创建单权益" />
                <Steps.Step title="创建权益包" />
                <Steps.Step title="权益审核" />
                <Steps.Step title="权益上下架" />
              </Steps>
            </Card>
          </Suspense>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={visitData} />
          </Suspense>
          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <MemberData
                    loading={loading}
                    offlineChartData={offlineChartData}
                    dropdownGroup={dropdownGroup}
                  />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <ProportionSales
                    dropdownGroup={dropdownGroup}
                    salesType={salesType}
                    loading={loading}
                    salesPieData={salesPieData}
                    handleChangeSalesType={this.handleChangeSalesType}
                  />
                </Suspense>
              </Col>
            </Row>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Analysis;
