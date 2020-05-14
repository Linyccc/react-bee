import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';
import defaultSettings from '@/defaultSettings';

const proxy = {
  'GET /demo/dvaTest/queryData.do': (req, res) => {
    res.send(
      mockjs.mock({
        resultCode: '0',
        resultMsg: '请求正常',
        resultData: [
          {
            id: 1,
            name: '@cname()',
            'age|18-36': 32,
            address: '@county(true)',
          },
          {
            id: 2,
            name: '@cname()',
            'age|18-36': 42,
            address: '@county(true)',
          },
        ],
      })
    );
  },
};

export default delay(proxy, defaultSettings.delay);
