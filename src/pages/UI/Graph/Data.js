export const treeData = {
  name: 'Modeling Methods',
  id: 1,
  flag: 0,
  children: [
    {
      name: 'Classification',
      flag: 1,
      id: 2,
      children: [
        { name: '福建省福州市华软银价有限公司招募啦小学生是', flag: 2, id: 3 },
        { name: 'Linear discriminant analysis', flag: 2, id: 4 },
        { name: 'Rules', flag: 2, id: 5 },
      ],
    },
    {
      name: 'Consensus',
      flag: 1,
      id: 8,
      children: [
        {
          name: 'Models diversity',
          flag: 2,
          id: 9,
          children: [
            { name: 'Different initializations', flag: 3, id: 10 },
            { name: 'Different parameter choices', flag: 3, id: 11 },
            { name: 'Different architectures', flag: 3, id: 12 },
          ],
        },
        {
          name: 'Methods',
          flag: 2,
          id: 14,
          children: [
            { name: 'Classifier selection', flag: 3, id: 15 },
            { name: 'Classifier fusion', flag: 3, id: 16 },
          ],
        },
        {
          name: 'Common',
          id: 17,
          flag: 2,
          children: [{ name: 'Bagging', flag: 3, id: 18 }, { name: 'Boosting', flag: 3, id: 19 }],
        },
      ],
    },
  ],
};
export const erData = {
  nodes: [
    {
      id: 'customer',
      label: '客户',
      x: 270,
      y: 230,
      shape: 'rect',
      size: [100, 60],
    },
    {
      id: 'customer_id',
      label: '客户工号',
      x: 150,
      y: 330,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'name',
      label: '客户姓名',
      x: 85,
      y: 225,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'address',
      label: '客户地址',
      x: 85,
      y: 125,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'email',
      label: '客户联系方式',
      x: 195,
      y: 85,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'order',
      label: '订单',
      x: 620,
      y: 230,
      shape: 'rect',
      size: [100, 60],
    },
    {
      id: 'order_id',
      label: '订单编号',
      x: 620,
      y: 85,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'order_status',
      label: '订单状态',
      x: 500,
      y: 125,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'total_price',
      label: '订单量',
      x: 740,
      y: 125,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'employee',
      label: '员工',
      x: 620,
      y: 430,
      shape: 'rect',
      size: [100, 60],
    },
    {
      id: 'employee_id',
      label: '员工工号',
      x: 500,
      y: 530,
      shape: 'ellipse',
      size: [100, 60],
    },
    {
      id: 'title',
      label: '参与人数',
      x: 740,
      y: 530,
      shape: 'ellipse',
      size: [100, 60],
    },
  ],
  edges: [
    {
      id: 'c_id',
      source: 'customer',
      target: 'customer_id',
    },
    {
      id: 'c_name',
      source: 'customer',
      target: 'name',
    },
    {
      id: 'c_address',
      source: 'customer',
      target: 'address',
    },
    {
      id: 'c_email',
      source: 'customer',
      target: 'email',
    },
    {
      id: 'o_id',
      source: 'order',
      target: 'order_id',
    },
    {
      id: 'o_price',
      source: 'order',
      target: 'total_price',
    },
    {
      id: 'o_status',
      source: 'order',
      target: 'order_status',
    },
    {
      id: 'c_o',
      source: 'customer',
      target: 'order',
      relation: '已支付',
      sourceEntity: '1',
      targetEntity: 'N',
      shape: 'relation',
    },
    {
      id: 'o_e',
      source: 'employee',
      target: 'order',
      relation: '分配',
      sourceEntity: '1',
      targetEntity: 'N',
      shape: 'relation',
    },
    {
      id: 'e_id',
      source: 'employee',
      target: 'employee_id',
    },
    {
      id: 'e_title',
      source: 'employee',
      target: 'title',
    },
  ],
};
export const flowData = {
  nodes: [
    {
      id: '1',
      label: '小组成员推荐项目',
      type: 'begin',
    },
    {
      id: '2',
      label: '参与者决定想法好坏',
    },
    {
      id: '3',
      label: '团队拒绝该想法',
    },
    {
      id: '4',
      label: '团队同意该想法',
    },
    {
      id: '5',
      label: '团队成员编写方案',
    },
    {
      id: '6',
      label: '团队审阅方案',
    },
    {
      id: '7',
      label: '方案流程结束',
      type: 'end',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
  ],
};
export const flow2Data = {
  nodes: [
    {
      id: '1',
      type: 'alps',
      name: '开始',
    },
    {
      id: '2',
      type: 'alps',
      name: '方案一',
    },
    {
      id: '3',
      type: 'alps',
      name: '方案二',
    },
    {
      id: '4',
      type: 'sql',
      name: '抉择方案',
    },
    {
      id: '5',
      type: 'sql',
      name: '提交最终方案',
    },
    {
      id: '6',
      type: 'feature_etl',
      name: '审核方案',
    },
    {
      id: '7',
      type: 'feature_etl',
      name: '发送人1',
    },
    {
      id: '8',
      type: 'feature_extractor',
      name: '发送人2',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
    {
      source: '6',
      target: '8',
    },
  ],
};
