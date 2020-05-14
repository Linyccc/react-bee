
在表格单选和多选场景下， 原生的antd table需要通过相对繁琐的配置来打开checkbox和radio，而且获取选中项的数据需要自行实现，同时没有选中项统计展示的效果。所以这里进行了二次封装。

- 新增API： __pick__ 用于开启可选模式（支持多选和单选）
- 新增API： __onSelectRow__ 用于获取可选表格的选中项
- 约定样式：size='middle'、内容强制不换行、pagination样式和水平自动滚动 
- 收口作用，全局管控Table。

## 使用

```javascript
  // 普通表格
  <SlickTable
    rowKey={record => record.id}  
    loading={listLoading}
    data={{
      list, // Array[object]
      pagination: {
        ...pagination,  // {current: 5 pageSize: 10 total: 198}
      },
    }}
    columns={} 
  />
```

```javascript
  // 多选表格
  <SlickTable
    rowKey={record => record.id}
    pick="checkbox"
    selectedRows={selectedRows}
    loading={listLoading}
    data={{
      list,
      pagination: {
        ...pagination,
      },
    }}
    columns={}
    onSelectRow={this.handleSelectRows}
    onChange={this.handleChange}
  />
```

注意：

1. 水平滚动时，暂不推荐固定左边列（目前antd有bug），如果固定右边列 必须设置一个绝对width。
2. 列内容过长，推荐搭配 @/components/Ellipsis 组件，约定一个长度，过长显示省略号，鼠标上移tooltip显示完整内容
3. colums中如果某列设置 `needTotal: true`, 会自动累计所有选中项中 这一列的 总和


## API

支持原生antd table的所有[API](https://ant.design/components/table-cn/#Table)，下面是扩展部分

| 参数(*非必填) | 说明                                                                                                              | 类型            | 默认值 |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | --------------- | ------ |
| *pick         | 表示开启多选或单选，可选值'checkbox'和'radio'<br/>每一行的rowData中若包含disabled:true，则自动禁用checkbox或radio | string          | -      |
| *onSelectRow  | 在选中项发生变化时的回调, 自动传入1个包含当前选中的所有行数据的数组对象{Array[object]}                            | function        | -      |
| *extra        | pick模式下追加在记录旁边                                                                                          | React.ReactNode | null   |


更多[props](https://ant.design/components/upload-cn/#API)

## other

服务端分页的表格 通常还需要配置 __onChange__ 回调方法，用于异步获取数据

`onChange()`

切换分页，列头排序，列头过滤时都会触发这个回调。自动传入3个字段

```javascript
/**
 * 切换分页，列头排序，列头过滤时都会触发这个回调
 * @ pagination {Object}
      {
        current: 1
        pageSize: 10
        showQuickJumper: true
        showSizeChanger: true
        showTotal: ƒunc
      }
  * @ filters {Object}
  * @ sort {Object}
      {
        column: {},
        dataIndex: 'createDate',
        sortOrder: false,
        sorter: true,
        title: '库存失效日期',
        columnKey: 'createDate',
        field: 'createDate',
        order: 'ascend',
      }
  */
onChange = { (pagination, filters, sorter) => {}}
```
