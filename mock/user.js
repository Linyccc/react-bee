import { delay } from 'roadhog-api-doc';
import pick from 'lodash/pick';
import map from './map';
import defaultSettings from '../src/defaultSettings';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'POST /api/currentUser': (req, res) => {
    res.status(200).send({
      resultCode: '0',
      resultMsg: '成功',
      resultObject: {
        name: 'Mr.Lin',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
      },
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { loginPwd, loginName, type } = req.body;
    if (loginPwd === '123' && loginName === 'admin') {
      res.send({
        resultCode: '0',
        resultMsg: '成功',
        resultObject: {
          type,
          currentAuthority: 'admin',
        },
      });
      return;
    }
    if (loginPwd === '123' && loginName === 'user') {
      res.send({
        resultCode: '0',
        resultMsg: '成功',
        resultObject: {
          type,
          currentAuthority: 'user',
        },
      });
      return;
    }
    if (loginPwd === '123' && loginName === 'test') {
      res.send({
        resultCode: '0',
        resultMsg: '成功',
        resultObject: {
          type,
          currentAuthority: 'test',
        },
      });
      return;
    }
    res.send({
      resultCode: '1',
      resultMsg: '登录失败',
      resultObject: {
        type,
        currentAuthority: 'guest',
      },
    });
  },
  'POST /api/sso': (req, res) => {
    const { token } = req.body;
    res.send({
      resultCode: '0',
      resultMsg: '成功',
      resultObject: {
        currentAuthority: 'admin',
      },
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'POST /api/maps': (req, res) => {
    const {} = req.body;
    res.status(200).send({
      resultCode: '0',
      resultMsg: '请求正常',
      resultData: pick(map, req.body),
    });
  },
};

export default delay(proxy, defaultSettings.delay);
