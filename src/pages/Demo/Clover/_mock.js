/* eslint-disable */
import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';
// import defaultSettings from '../../@/defaultSettings';

const proxy = {
  'POST /demo/allLeafs': (req, res) => {
    res.send({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: ['props', 'state', 'lifecycle', 'dva'],
    });
  },
  'POST /demo/leaf1': (req, res) => {
    res.send({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: [1],
    });
  },
  'POST /demo/leaf2': (req, res) => {
    res.send({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: [2],
    });
  },
  'POST /demo/leaf3': (req, res) => {
    res.send({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: [3],
    });
  },
  'POST /demo/leaf4': (req, res) => {
    res.send({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: [4],
    });
  },
};

export default delay(proxy, 300);
