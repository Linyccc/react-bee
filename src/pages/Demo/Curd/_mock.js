// eslint-disable-next-line import/no-extraneous-dependencies
import mockjs from 'mockjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { delay } from 'roadhog-api-doc';
import find from 'lodash/find';
import defaultSettings from '@/defaultSettings';
import pick from 'lodash/pick';

const map = {
  statusMap: [
    { label: '未提交', value: 1 },
    { label: '处理中', value: 2 },
    { label: '挂起', value: 3 },
    { label: '完成', value: 4 },
    { label: '驳回', value: 5 },
  ],
  typeMap: [{ label: '权益配置', value: 1 }, { label: '资源采购', value: 2 }],
};

const data = [
  {
    id: 1,
    code: '@string("number",12)',
    name: '集团VPMN-开通',
    unit: '沈阳盛易达科技有限公司',
    type: map.typeMap[0],
    status: map.statusMap[0],
    tache: { label: '发起', value: 1 },
    createDate: '2019-08-11',
  },
  {
    id: 2,
    code: '@string("number",12)',
    name: '集团短彩信',
    unit: '晟辉集团公司',
    type: map.typeMap[1],
    status: map.statusMap[1],
    tache: { label: '领导审批', value: 2 },
    createDate: '2019-08-12',
  },
  {
    id: 3,
    code: '@string("number",12)',
    name: '集团VPMN-注销',
    unit: '森途科技有限公司',
    type: map.typeMap[0],
    status: map.statusMap[1],
    tache: { label: '业务部门审批', value: 3 },
    createDate: '2019-08-13',
  },
  {
    id: 4,
    code: '@string("number",12)',
    name: '集团短彩信',
    unit: '晟辉集团公司',
    type: map.typeMap[1],
    status: map.statusMap[1],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-14',
  },
  {
    id: 5,
    code: '@string("number",12)',
    name: '注入申请单',
    unit: '腾讯视频',
    type: map.typeMap[0],
    status: map.statusMap[2],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-17',
  },
  {
    id: 6,
    code: '@string("number",12)',
    name: 'VPN申请',
    unit: '辽宁能源',
    type: map.typeMap[0],
    status: map.statusMap[1],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-16',
  },
  {
    id: 7,
    code: '@string("number",12)',
    name: '新剧25元包月',
    unit: '优酷视频',
    type: map.typeMap[0],
    status: map.statusMap[0],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-18',
  },
  {
    id: 8,
    code: '@string("number",12)',
    name: 'CP接入申请',
    unit: '森途科技',
    type: map.typeMap[1],
    status: map.statusMap[1],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-19',
  },
  {
    id: 9,
    code: '@string("number",12)',
    name: '新剧25元包月',
    unit: '爱奇艺',
    type: map.typeMap[1],
    status: map.statusMap[2],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-21',
  },
  {
    id: 10,
    code: '@string("number",12)',
    name: '融合包管理',
    unit: '睿能科技',
    type: map.typeMap[0],
    status: map.statusMap[3],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-22',
  },
  {
    id: 11,
    code: '@string("number",12)',
    name: 'EPG编排工单',
    unit: '未来电视',
    type: map.typeMap[0],
    status: map.statusMap[0],
    tache: { label: 'IT部门配置', value: 4 },
    createDate: '2019-08-23',
  },
];

const proxy = {
  'POST /myOrder/map': (req, res) => {
    const {} = req.body;
    res.status(200).send({
      resultCode: '0',
      resultMsg: '请求正常',
      resultData: pick(map, req.body),
    });
  },
  'POST /myOrder/queryList': (req, res) => {
    const { current, pageSize, total, resourceName, statusType } = req.body;
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultData: {
          list: data,
          pagination: {
            current: current || 1,
            pageSize: pageSize || 10,
            total: data.length,
          },
        },
      })
    );
  },
  'POST /myOrder/orderInfo': (req, res) => {
    const { id } = req.body;
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultData: find(data, { id }),
      })
    );
  },
  'POST /myOrder/save': (req, res) => {
    const { id = +new Date() } = req.body;
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultData: {
          id,
        },
      })
    );
  },
};

export default delay(proxy, defaultSettings.delay);
