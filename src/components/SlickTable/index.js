import React, { PureComponent, Fragment } from 'react';
import { Table } from 'antd';
import { FormattedMessage } from 'umi/locale';
import isArray from 'lodash/isArray';
import classNames from 'classnames';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class SlickTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (isArray(nextProps.selectedRows) && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data = {}, rowKey, className, rowSelection, extra = null, ...rest } = this.props;
    const { list = [], pagination } = data;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return (
          <Fragment>
            <FormattedMessage id="component.slickTable.total" />
            &nbsp;
            {total}&nbsp;
            <FormattedMessage id="component.slickTable.records" />
          </Fragment>
        );
      },
      ...pagination,
    };

    const newRowSelection =
      rest.pick === undefined
        ? null
        : {
            selectedRowKeys,
            type: rest.pick,
            onChange: this.handleRowSelectChange,
            fixed: true,
            columnWidth: 40,
            getCheckboxProps: record => ({
              disabled: record.disabled,
            }),
            ...rowSelection,
          };

    return (
      <div className={styles.wrapper}>
        <Table
          rowKey={rowKey || 'key'}
          bordered
          size="middle"
          rowSelection={newRowSelection}
          // title={title}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          scroll={{ x: 'max-content' }}
          className={classNames('slick-table', className || '')}
          {...rest}
        />
        <div className='slick-table-extra'>
          {extra !== null ? (
            <div className="margin-right" style={{ display: 'inline-block' }}>
              {extra}
            </div>
          ) : null}
          {selectedRowKeys.length > 0 ? (
            <>
              <span className={styles.records}>
                <FormattedMessage id="component.slickTable.selected" />
              </span>
              <span className="text-info bold " style={{ margin: '0 4px' }}>
                {selectedRowKeys.length}
              </span>
              <span className={styles.records}>
                <FormattedMessage id="component.slickTable.item" />
              </span>
              {needTotalList.map(item => (
                <span className="margin-left" key={item.dataIndex}>
                  {item.title}
                  <FormattedMessage id="component.slickTable.total" />
                  &nbsp;
                  <span style={{ fontWeight: 600 }}>
                    {item.render ? item.render(item.total) : item.total}
                  </span>
                </span>
              ))}
              <a onClick={this.cleanSelectedKeys} className="margin-left text-danger">
                <FormattedMessage id="component.slickTable.clear" />
              </a>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SlickTable;
