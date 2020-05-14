/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Cascader } from 'antd';
import classNames from 'classnames';
import findIndex from 'lodash/findIndex';
import omit from 'lodash/omit';
import dropRight from 'lodash/dropRight';
import delay from 'lodash/delay';
import isEqual from 'lodash/isEqual';
import hash from 'hash.js';
import './index.less';

const RCCascader = Cascader;
const getLength = function(str) {
  // /<summary>获得字符串实际长度，中文2，英文1</summary>
  // /<param name="str">要获得长度的字符串</param>
  let realLength = 0;
  const len = str.length;
  let charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
};

class ComboCascader extends React.Component {
  constructor(props) {
    super(props);
    const {
      options,
      placeholder,
      size,
      multiple,
      className,
      expandTrigger,
      style,
      limit,
      label,
      hideChoice,
      defaultInputValue,
    } = props;
    this.state = {
      size,
      className,
      style,
      multiple,
      placeholder,
      options,
      expandTrigger,
      limit,
      hideChoice,
      popupVisible: false,
      placeholderVisible: false,
      inputValue: defaultInputValue,
      selectedItem: [],
      inputWrapperWidth: 'auto',
      inputWidth: defaultInputValue != '' ? (getLength(defaultInputValue) + 1) * 8 : 10,
      label,
    };
    this.calcInputWrapperWidth = this.calcInputWrapperWidth.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.options, prevState.options)) {
      return {
        ...prevState,
        options: nextProps.options,
        inputValue: nextProps.defaultInputValue,
      };
    }
    // 返回 null 表示不更新，此函数最后一定需要返回值
    return null;
  }

  componentDidMount() {
    this.calcInputWrapperWidth();
    window.addEventListener('resize', this.calcInputWrapperWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcInputWrapperWidth);
  }

  calcInputWrapperWidth() {
    // 先隐藏，否则容器的宽度计算不准确
    this._inputWrapper.style.display = 'none';
    delay(() => {
      this.setState({
        inputWrapperWidth:
          this._container.offsetWidth -
          (!this.state.hideChoice ? this._addon.offsetWidth : 0) -
          11 * 2,
      });
      this._inputWrapper.style.display = 'block';
    }, 300);
  }

  handleSelect(value, selectedOptions) {
    this.updateItem(selectedOptions);
    const { onChange } = this.props;
    const { multiple } = this.state;
    if (onChange) {
      onChange({
        selectedItem: this.state.selectedItem.map(o => omit(o, '__type')),
        inputValue: multiple ? this._inputElement.value : '',
      });
    }
  }

  // 根据selectedOptions的特征（最后一位是当前节点，前面的都是所属父节点）
  getType(selectedOptions) {
    const fingerprint = JSON.stringify(
      selectedOptions.length > 1 ? dropRight(selectedOptions) : selectedOptions
    ); // 兼顾没有子节点的
    return hash
      .sha256()
      .update(fingerprint)
      .digest('hex');
  }

  updateItem(selectedOptions) {
    const item = selectedOptions[selectedOptions.length - 1];
    const list = this.state.selectedItem;
    const { limit } = this.state;
    const index = findIndex(list, { __type: this.getType(selectedOptions) });
    const hasThisType = index !== -1;
    const hasThisNode =
      findIndex(list, Object.assign({}, item, { __type: this.getType(selectedOptions) })) !== -1;

    // 单选模式
    if (!this.state.multiple) {
      this.setState({
        selectedItem: [Object.assign({}, item, { __type: this.getType(selectedOptions) })],
      });
      return;
    }

    // 多选模式
    if (limit) {
      if (hasThisType) {
        if (!hasThisNode) {
          list.splice(index, 1);
          list.push(Object.assign({}, item, { __type: this.getType(selectedOptions) }));
          this.setState({ selectedItem: list });
        }
      } else if (!hasThisNode) {
        list.push(Object.assign({}, item, { __type: this.getType(selectedOptions) }));
        this.setState({ selectedItem: list });
      }
    } else if (!hasThisNode) {
      list.push(Object.assign({}, item, { __type: this.getType(selectedOptions) }));
      this.setState({ selectedItem: list });
    }
  }

  removeItem(e) {
    const list = this.state.selectedItem;

    list.splice(e.target.getAttribute('data-index'), 1);
    this.setState({ selectedItem: list });
  }

  onPopupVisibleChange(popupVisible) {
    this.setState({ popupVisible });
  }

  reset() {
    this.setState({ selectedItem: [], inputValue: '', inputWidth: 10 });
  }

  value() {
    const { multiple } = this.state;
    return {
      selectedItem: this.state.selectedItem.map(o => omit(o, '__type')),
      inputValue: multiple ? this._inputElement.value : '',
    };
  }

  renderInput(e) {
    const width = (getLength(e.target.value.toString()) + 1) * 8;
    this.setState({
      inputValue: e.target.value,
      inputWidth: width,
    });

    const { onChange } = this.props;
    const { multiple } = this.state;
    if (onChange) {
      onChange({
        selectedItem: this.state.selectedItem.map(o => omit(o, '__type')),
        inputValue: multiple ? this._inputElement.value : '',
      });
    }
  }

  render() {
    const {
      options,
      placeholder,
      inputValue,
      selectedItem,
      popupVisible,
      size,
      multiple,
      style,
      expandTrigger,
      className,
      inputWrapperWidth,
      inputWidth,
      hideChoice,
      label,
      defaultInputValue,
    } = this.state;
    const cls = classNames('ant-select', {
      [`ant-select-lg`]: size === 'large',
      [`ant-select-sm`]: size === 'small',
    });
    return (
      <div
        className={classNames('cube-ComboCascader', className)}
        style={style}
        ref={el => (this._container = el)}
      >
        <span
          className={classNames('ant-input-group', {
            [`cube-ComboCascader-open`]: !!popupVisible,
          })}
        >
          {!hideChoice ? (
            <div className="ant-input-group-addon" ref={el => (this._addon = el)}>
              <RCCascader
                options={options}
                expandTrigger={expandTrigger}
                onPopupVisibleChange={popupVisible => {
                  this.onPopupVisibleChange(popupVisible);
                }}
                onChange={(value, selectedOptions) => {
                  this.handleSelect(value, selectedOptions);
                }}
                transitionName="slide-up"
                prefixCls="ant-cascader"
              >
                <div className={cls}>
                  <div className="ant-select-selection trigger">
                    <div className="ant-select-selection__rendered">
                      <div className="ant-select-selection-selected-value">{label}</div>
                    </div>
                    <span
                      className="ant-select-arrow"
                      unselectable="on"
                      style={{ userSelect: 'none' }}
                    >
                      <Icon type="down" className="select-arrow-icon" />
                    </span>
                  </div>
                </div>
              </RCCascader>
            </div>
          ) : null}
          <div className={cls} style={{ display: 'table-cell', width: '100%' }}>
            <div
              className="ant-select-selection ant-select-selection--multiple"
              onClick={() => {
                multiple && this._inputElement.focus();
              }}
            >
              <div
                className="ant-select-selection__rendered"
                ref={el => (this._inputWrapper = el)}
                style={{ width: inputWrapperWidth }}
              >
                <div
                  unselectable="on"
                  className="ant-select-selection__placeholder"
                  style={{
                    userSelect: 'none',
                    display: selectedItem.length > 0 || inputValue != '' ? 'none' : 'block',
                  }}
                >
                  {placeholder}
                </div>
                {multiple ? (
                  <ul>
                    {selectedItem.map((o, index) => (
                      <li
                        className="ant-select-selection__choice"
                        key={index.toString()}
                        style={{ userSelect: 'none' }}
                      >
                        <div className="ant-select-selection__choice__content">{o.label}</div>
                        <span className="ant-select-selection__choice__remove">
                          <Icon
                            type="close"
                            className="select-remove-icon"
                            data-index={index}
                            onClick={e => {
                              this.removeItem(e);
                            }}
                          />
                        </span>
                      </li>
                    ))}
                    <li className="ant-select-search ant-select-search--inline">
                      <div className="ant-select-search__field__wrap">
                        <input
                          autoComplete="off"
                          className="ant-select-search__field"
                          style={{ width: inputWidth }}
                          ref={el => (this._inputElement = el)}
                          value={inputValue}
                          onChange={e => {
                            this.renderInput(e);
                          }}
                        />
                      </div>
                    </li>
                  </ul>
                ) : (
                  <div className="ant-select-selection-selected-value">
                    {selectedItem.length > 0 ? selectedItem[0].label : ''}
                  </div>
                )}
              </div>
              <span className="ant-select-selection__clear" style={{ userSelect: 'none' }}>
                <Icon
                  type="close-circle"
                  theme="filled"
                  onClick={() => {
                    this.reset();
                  }}
                />
              </span>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

ComboCascader.defaultProps = {
  size: 'default',
  placeholder: '请选择',
  multiple: true,
  className: '',
  defaultInputValue: '',
  style: {},
  expandTrigger: 'hover',
  limit: false,
  options: [],
  label: '选项',
};

ComboCascader.propTypes = {
  size: PropTypes.oneOf(['large', 'small', 'default']),
  className: PropTypes.string,
  style: PropTypes.object,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  expandTrigger: PropTypes.oneOf(['hover', 'click']),
  limit: PropTypes.bool,
  label: PropTypes.string,
  defaultInputValue: PropTypes.string,
};

export default ComboCascader;
