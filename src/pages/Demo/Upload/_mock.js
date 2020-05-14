// eslint-disable-next-line import/no-extraneous-dependencies
import mockjs from 'mockjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { delay } from 'roadhog-api-doc';
import random from 'lodash/random';
import find from 'lodash/find';
import defaultSettings from '../../../defaultSettings';

const proxy = {
  'POST /api/delete': (req, res) => {
    res.status(200).send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '操作成功!',
        resultData: {},
      })
    );
  },
};

export default delay(proxy, defaultSettings.delay);
