import img404 from './img/404.png';
import img403 from './img/403.png';
import img500 from './img/500.png';

const config = {
  403: {
    img: img403,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: img404,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: img500,
    title: '500',
    desc: '抱歉，服务器出错了',
  },
};

export default config;
