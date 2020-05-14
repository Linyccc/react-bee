// eslint-disable-next-line import/no-extraneous-dependencies
import mockjs from 'mockjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { delay } from 'roadhog-api-doc';
import random from 'lodash/random';
import find from 'lodash/find';
import defaultSettings from '../../../defaultSettings';

const map1 = [
  { pcode: '30010', pname: '订单审核' },
  { pcode: '30011', pname: '资源管理' },
  { pcode: '30012', pname: '发票管理' },
  { pcode: '30013', pname: '账务审核' },
  { pcode: '30015', pname: '代理商管理' },
  { pcode: '30016', pname: '客户管理' },
  { pcode: '30018', pname: '售前协作单' },
  { pcode: '30021', pname: '销售铁三角项目奖励' },
  { pcode: '30022', pname: '知识库管理' },
  { pcode: '30024', pname: '报价审批' },
  { pcode: '30025', pname: '账号管理' },
  { pcode: '030', pname: '后评估打分' },
  { pcode: '031', pname: '战略客户签约覆盖奖申请' },
  { pcode: '0324', pname: '和教育工单' },
  { pcode: '040', pname: '创新产品突破奖申请' },
  { pcode: '035', pname: '营销管理' },
  { pcode: '050', pname: '长流程预约单审批' },
  { pcode: '051', pname: '长流程预约单审批ESOP端' },
  { pcode: '060', pname: '产品大单奖' },
  { pcode: '052', pname: '角色分配' },
  { pcode: '042', pname: '违约金减免申请' },
  { pcode: '033', pname: '产品资费管理' },
  { pcode: '077', pname: '智能硬件审批' },
  { pcode: '079', pname: '智能硬件退货审批' },
  { pcode: '082', pname: '角色变更' },
  { pcode: '0344', pname: '创新产品突破' },
  { pcode: '300161', pname: '客户审批' },
  { pcode: '100', pname: '三流合一' },
  { pcode: '089', pname: '拜访工作落实单' },
  { pcode: '400001', pname: '产品预算一张纸' },
  { pcode: '400002', pname: '项目预算一张纸' },
  { pcode: '400003', pname: '项目预算一张纸预警' },
];

const map2 = [
  { pcode: '3', pname: '综合部' },
  { pcode: '4', pname: '发展战略部' },
  { pcode: '5', pname: '财务部' },
  { pcode: '6', pname: '市场经营和客户服务部' },
  { pcode: '7', pname: '党政军客户解决方案部' },
  { pcode: '8', pname: '金融行业解决方案部' },
  { pcode: '9', pname: '互联网解决方案部' },
  { pcode: '10', pname: '工业和能源行业解决方案部' },
  { pcode: '11', pname: '产品一中心' },
  { pcode: '12', pname: '云计算中心' },
  { pcode: '13', pname: '教育行业解决方案部' },
  { pcode: '14', pname: '医疗行业解决方案部' },
  { pcode: '15', pname: '交通行业解决方案部' },
  { pcode: '16', pname: '产品二中心' },
  { pcode: '17', pname: '企业管理创新中心' },
  { pcode: '19', pname: '服务支撑中心' },
  { pcode: '20', pname: '业务支撑中心' },
  { pcode: '21', pname: '内审部' },
  { pcode: '25', pname: '计划采购部' },
  { pcode: '26', pname: '人力资源部' },
  { pcode: '27', pname: '党群工作部' },
  { pcode: '28', pname: '百度项目工程办公室' },
  { pcode: '29', pname: '省公司' },
  { pcode: '30', pname: '纪检监察室' },
  { pcode: '31', pname: '全通改革工作小组' },
  { pcode: '32', pname: '中移德电网络科技有限公司' },
  { pcode: '84', pname: '在线服务公司' },
  { pcode: '2942', pname: '农商行业解决方案部' },
  { pcode: '294204', pname: '产品事业部' },
  { pcode: '29200950', pname: '计划采购部' },
  { pcode: '29300914', pname: '中移智行网络科技有限公司' },
];

const proxy = {
  'GET /scene/queryMaps': (req, res) => {
    res.status(200).send({
      resultCode: '0',
      resultMsg: '请求正常',
      resultObject: {
        orderType: map1,
        staffOrg: map2,
      },
    });
  },
  'POST /scene/queryTaskList': (req, res) => {
    const {
      current,
      pageSize,
      total,
      orderType,
      staffOrg,
      taskCreator,
      taskNumber,
      taskName,
    } = req.body;
    const target1 = find(map1, { pcode: orderType });
    const target2 = find(map2, { pcode: staffOrg });
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultObject: {
          'list|10': [
            {
              'id|+1': 1,
              taskName: taskName || '@cword(10,20)',
              taskNumber: taskNumber || '@natural(100000,10000000)',
              orderType: (target1 && target1.pname) || map1[random(0, map1.length - 1)].pname,
              taskCreator: taskCreator || '@cname(2,3)',
              currentTache: '@cword(5,10)',
              createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              staffOrg: (target2 && target2.pname) || map2[random(0, map2.length - 1)].pname,
            },
          ],
          pagination: {
            current: current || 1,
            pageSize: pageSize || 10,
            total: total || '@natural(14,1000)',
          },
        },
      })
    );
  },
};

export default delay(proxy, defaultSettings.delay);
