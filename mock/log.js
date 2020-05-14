import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';
import defaultSettings from '../src/defaultSettings';

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + Math.floor(Math.random() * 1000),
  });
}
const proxy = {
  'POST /api/menuClickAnalysis': (req, res) => {
    res.send({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: chartData,
    });
  },
  'POST /ulogserver/UserLoginLogController/queryUserLoginLog.do': (req, res) => {
    const { pageSize, pageNum } = req.body;
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultObject: {
          pageNum,
          pageSize,
          size: 10,
          startRow: 1,
          endRow: 10,
          total: '@natural(1,500)',
          pages: 2,
          'list|10': [
            {
              'id|+1': 10003,
              createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              updateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              sysUserCode: 'admin',
              'sysUserId|+1': 31004179676,
              userName: '@cname',
              logTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
              statusCd: '1000',
              loginWay: 'password',
              clientIp: '@ip',
              sysCode: '727001',
              token: 'e81a651d-4d82-490c-9466-e17ab96ccb75',
              staffCode: 'null',
              lanId: '0',
              orgId: 0,
              orgName: '@province',
              systemIp: '@ip',
              systemPort: '8085',
              'systemPid|+1': 21276,
              reqDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              respDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              'systemInfoId|+1': 727001,
            },
          ],
          prePage: 0,
          nextPage: 2,
          isFirstPage: true,
          isLastPage: false,
          hasPreviousPage: false,
          hasNextPage: true,
          navigatePages: 8,
          navigatepageNums: [1, 2],
          navigateFirstPage: 1,
          navigateLastPage: 2,
          lastPage: 2,
          firstPage: 1,
        },
      })
    );
  },
  'POST /ulogserver/UserLoginLogController/queryCountByTime.do': (req, res) => {
    const { pageSize, pageNum } = req.body;
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultObject: {
          pageNum,
          pageSize,
          size: 10,
          startRow: 1,
          endRow: 10,
          total: '@natural(1,500)',
          pages: 2,
          'list|10': [
            {
              'id|+1': 10001,
              createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              funcObj: 'nami',
              'objId|+1': 1232141241241,
              oprType: 'lufier',
              logTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
              batchId: 0,
              systemIp: '@ip',
              'systemPort|+1': 8085,
              systemPid: 17792,
              reqDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              respDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              'systemInfoId|+1': 72001,
              reqIp: '@ip',
            },
          ],
          prePage: 0,
          nextPage: 2,
          isFirstPage: true,
          isLastPage: false,
          hasPreviousPage: false,
          hasNextPage: true,
          navigatePages: 8,
          navigatepageNums: [1, 2],
          navigateFirstPage: 1,
          navigateLastPage: 2,
          lastPage: 2,
          firstPage: 1,
        },
      })
    );
  },
  'POST /ulogserver/UserClickLogController/queryUserClickLog.do': (req, res) => {
    const { pageSize, pageNum } = req.body;
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultObject: {
          pageNum,
          pageSize,
          size: 10,
          startRow: 1,
          endRow: 10,
          total: '@natural(1,500)',
          pages: 2,
          'list|10': [
            {
              'id|+1': 10014,
              sysRoleName: '@cname',
              sysUserName: '@cword',
              reqIp: '@ip',
              statusDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              updateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              sysRoleId: 1213899,
              sysUserId: 1213899999,
              objType: 'nami',
              objId: '1232141241241',
              objName: 'lufier',
              costTime: '@time("HH:mm:ss")',
              statusCd: '1000',
              logTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
              systemIp: '@ip',
              'systemPort|+1': 8085,
              systemPid: 10212,
              reqDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              respDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              systemInfoId: 72001,
            },
          ],
          prePage: 0,
          nextPage: 2,
          isFirstPage: true,
          isLastPage: false,
          hasPreviousPage: false,
          hasNextPage: true,
          navigatePages: 8,
          navigatepageNums: [1, 2],
          navigateFirstPage: 1,
          navigateLastPage: 2,
          lastPage: 2,
          firstPage: 1,
        },
      })
    );
  },
  'POST /ulogserver/ExceptionLogController/queryExceptionLog.do': (req, res) => {
    const { pageSize, pageNum } = req.body;
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultObject: {
          pageNum,
          pageSize,
          size: 10,
          startRow: 1,
          endRow: 10,
          total: '@natural(1,500)',
          pages: 2,
          'list|10': [
            {
              'id|+1': 10002,
              createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              exceptionInfo: '@cparagraph',
              exceptionCode: '9999',
              logTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
              systemIp: '@ip',
              systemPort: '8085',
              'systemPid|+1': 26724,
              reqDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              respDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
              systemInfoId: 0,
              reqIp: '@ip',
            },
          ],
          prePage: 0,
          nextPage: 2,
          isFirstPage: true,
          isLastPage: false,
          hasPreviousPage: false,
          hasNextPage: true,
          navigatePages: 8,
          navigatepageNums: [1, 2],
          navigateFirstPage: 1,
          navigateLastPage: 2,
          lastPage: 2,
          firstPage: 1,
        },
      })
    );
  },
};

export default delay(proxy, defaultSettings.delay);
