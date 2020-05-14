/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, TreeSelect, Form, message } from 'antd';
import classNames from 'classnames';
import omit from 'lodash/omit';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import head from 'lodash/head';
import last from 'lodash/last';
import ComboCascader from '../ComboCascader';
import './index.less';

function getUniqueID(prefix) {
  return `${prefix}_${Math.floor(Math.random() * new Date().getTime())}`;
}

/**
 * [label:'',value:'',filedname:'',children:[]]
 * 把treeData中每个node的label换成title，同时给每个节点追加key
 * 返回一个新的数组
 *
 */
const _serializeTreeData = function(list) {
  const result = [];
  list.map(function(item, i) {
    const hasChild = !!(item.children && item.children.length > 0);
    const tmp = {
      title: item.label,
      key: getUniqueID('tree'),
      ...omit(item, ['label']),
    };
    if (hasChild) {
      tmp.children = serializeTreeData(item.children);
    }
    result.push(tmp);
  });
  return result;
};

/**
 * 根据NodeID查找当前节点以及父节点
 * @param {array} treeData
 * @param {string} value
 * @return {object}  {node:{},parentNode:{}}  没找到节点时返回null,如{node:{},parentNode:null}
 */
const _queryNode = function queryNode(tree, value) {
  const node = null;
  const parentNode = null;

  const find = (array, value) => {
    const stack = [];
    let going = true;

    const walker = (array, value) => {
      array.forEach(item => {
        if (!going) return;
        stack.push(item);
        if (item.value === value) {
          going = false;
        } else if (item.children) {
          walker(item.children, value);
        } else {
          stack.pop();
        }
      });
      if (going) stack.pop();
    };

    walker(array, value);

    return stack;
  };
  const data = find(tree, value);
  return {
    node: last(data) || null,
    parentNode: head(data) || null,
  };
};

/**
 *
 * 对treeData中指定的node 追加children节点
 */
const insertNode = function(tree, key, value, children) {
  const result = [];
  tree.map(function(item, i) {
    if (item[key] == value) {
      item.children = children;
    } else if (item.children && item.children.length > 0) {
      item.children = insertNode(item.children, key, value, children);
    }
    result.push(item);
  });

  return result;
};

let serializeTreeData = memoizeOne(_serializeTreeData, isEqual);
const queryNode = memoizeOne(_queryNode, isEqual);

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      cleanAreaType: props.options.areaType || [],
      areaType: serializeTreeData(props.options.areaType || []), // 传给tree-select的数据，由props.areaType转换过的
      area: props.defaultAreaValue || '', // 选中的区域
      selectedItem: [], // 选中的choice
      inputValue: '', // 输入框的值，模糊查询的关键字
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.options, prevState.options)) {
      return {
        ...prevState,
        options: nextProps.options,
        areaType: serializeTreeData(nextProps.options.areaType),
        cleanAreaType: nextProps.options.areaType,
        defaultInputValue: nextProps.defaultInputValue,
      };
    }
    // 返回 null 表示不更新，此函数最后一定需要返回值
    return null;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  clear() {
    this.refs.comboCascader.reset();
    if (!this.state.hideArea) {
      this.setState({ area: '' });
      this.props.form.setFieldsValue({ area: '' });
    }
  }

  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children.length) {
        resolve();
        return;
      }
      this.props
        .loadData(queryNode(this.state.cleanAreaType, treeNode.props.value))
        .then(result => {
          let { areaType, cleanAreaType } = this.state;
          cleanAreaType = insertNode(
            cleanAreaType,
            'value',
            treeNode.props.value,
            result.resultObject
          );
          areaType = insertNode(
            areaType,
            'key',
            treeNode.props.eventKey,
            serializeTreeData(result.resultObject)
          );
          this.setState({
            areaType,
            cleanAreaType,
          });
          resolve();
        });
    });

  value = () => {
    return {
      ...this.refs.comboCascader.value(),
      area: !this.state.hideArea
        ? omit(queryNode(this.state.cleanAreaType, this.state.area).node, 'children')
        : null,
    };
  };

  valid = () => {
    let result = false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        result = this.value();
      } else {
        message.error(`${this.state.treePlaceholder}不能为空`);
      }
    });
    return result;
  };

  render() {
    const {
      options,
      treePlaceholder,
      inputPlaceholder,
      size,
      style,
      className,
      hideArea,
      hideChoice,
      areaType,
      limit,
      defaultAreaValue,
      defaultInputValue,
      required,
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const areaAttrs = {
      rules: [{ required, message: `不能为空` }],
    };
    defaultAreaValue != '' && Object.assign(areaAttrs, { initialValue: [`${defaultAreaValue}`] });

    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          const { onSearch } = this.props;
          this.props.form.validateFields((err, values) => {
            if (!err) {
              onSearch && onSearch(this.value(), e);
            } else {
              message.error(`${this.state.treePlaceholder}不能为空`);
            }
          });
        }}
        className={classNames('cube-SearchFilter', 'cube-form-tooltip', className)}
        style={style}
      >
        {!hideArea ? (
          <div className="area-wrapper table-cell">
            <Form.Item>
              {getFieldDecorator('area', areaAttrs)(
                <TreeSelect
                  style={{ width: 120 }}
                  showSearch
                  treeNodeFilterProp="title"
                  placeholder={treePlaceholder}
                  size={size}
                  allowClear
                  suffixIcon={<Icon type="down" />}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={areaType}
                  loadData={this.props.loadData && !this.props.hideArea ? this.onLoadData : null}
                  onChange={(value, title, extra) => {
                    this.setState({
                      area: value,
                    });
                  }}
                />
              )}
            </Form.Item>
          </div>
        ) : null}
        <div className="input-wrapper">
          <ComboCascader
            options={options.choiceType || []}
            size={size}
            multiple
            hideChoice={hideChoice}
            limit={limit}
            ref="comboCascader"
            defaultInputValue={defaultInputValue}
            placeholder={inputPlaceholder}
            onChange={data => {
              this.setState({ selectedItem: data.selectedItem, inputValue: data.inputValue });
            }}
          />
        </div>
        <div className="button-wrapper" ref={el => (this._button = el)}>
          <Form.Item>
            <Button type="primary" size={size} htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </div>
        <div className="button-wrapper">
          <Button size={size} onClick={() => this.clear()}>
            重置
          </Button>
        </div>
      </Form>
    );
  }
}

SearchFilter.defaultProps = {
  size: 'default',
  inputPlaceholder: '请选择',
  treePlaceholder: '客户归属地',
  defaultAreaValue: '',
  defaultInputValue: '',
  label: '选项',
  className: '',
  hideArea: false,
  hideChoice: false,
  limit: true,
  required: false,
  style: {},
  options: {},
};

SearchFilter.propTypes = {
  size: PropTypes.oneOf(['large', 'small', 'default']),
  className: PropTypes.string,
  style: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  treePlaceholder: PropTypes.string,
  label: PropTypes.string,
  hideArea: PropTypes.bool,
  hideChoice: PropTypes.bool,
  limit: PropTypes.bool,
  required: PropTypes.bool,
  defaultAreaValue: PropTypes.string,
  defaultInputValue: PropTypes.string,
  options: PropTypes.object,
  onSearch: PropTypes.func,
};

export default Form.create()(SearchFilter);
