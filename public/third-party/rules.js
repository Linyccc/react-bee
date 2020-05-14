function getDataType(data) {
  var str = Object.prototype.toString.call(data);
  return str.split(' ')[1].substring(0, str.split(' ')[1].length - 1);
}

function isString(value) {
  return '[object String]' == Object.prototype.toString.call(value);
}

function isDate(obj) {
  return '[object Date]' == Object.prototype.toString.call(obj);
}
/**
 * 按照format格式来格式化日期
 * @param  {[object Date]} date   new Date()创建的Date对象
 * @param  {[string]} format  如下
 * yyyy|YYYY - 2016 年份
 * yy|YY - 16 年份
 * MM - 01 月份 补足两位数，下面的日、时、分、秒同理
 * M - 1 月份
 * w|W - 二 周二
 * @return {[type]}        返回字符串
 */
function formatDate(date, format) {
  //没有传参，date不是Date对象，format不是字符串，均返回
  if (arguments.length < 2 || !isDate(date) || !isString(format)) {
    alert('arguments is invalid');
    return;
  }
  var str = format;
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  str = str.replace(/yyyy|YYYY/, date.getFullYear());
  str = str.replace(
    /yy|YY/,
    date.getYear() % 100 > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100)
  );
  str = str.replace(
    /MM/,
    date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1)
  );
  str = str.replace(/M/g, date.getMonth() + 1);
  str = str.replace(/w|W/g, Week[date.getDay()]);
  str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
  str = str.replace(/d|D/g, date.getDate());
  str = str.replace(
    /hh|HH/,
    date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours()
  );
  str = str.replace(/h|H/g, date.getHours());
  str = str.replace(
    /mm/,
    date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes()
  );
  str = str.replace(/m/g, date.getMinutes());
  str = str.replace(
    /ss|SS/,
    date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds()
  );
  str = str.replace(/s|S/g, date.getSeconds());
  return str;
}
$(document).ajaxSuccess(function(event, jqXHR, ajaxOptions) {
  var data = ajaxOptions.data == undefined ? null : ajaxOptions.data;
  // 只能打印出get类型的传参
  console.group('===================');
  console.info('请求地址：%s', ajaxOptions.url);
  console.log('提交数据 [%s]: %s', getDataType(data), decodeURIComponent(data));
  if (jqXHR.responseJSON) {
    console.log(jqXHR.responseJSON);
  }
  console.groupEnd();
});
var Random = Mock.Random;
Mock.mock(/api\/login\/account/, function(options) {
  var body = JSON.parse(options.body);
  var loginPwd = body.loginPwd;
  var loginName = body.loginName;
  var type = body.type;
  if (options.type == 'POST') {
    if (loginPwd === '123' && loginName === 'admin') {
      return Mock.mock({
        resultCode: '0',
        resultMsg: '处理成功',
        resultObject: {
          adminUser: {
            userId: '1',
            loginName: 'admin',
            statusCd: 1,
            userName: '超级管理员',
            remark: 'mkk',
            userFounder: 1,
            relType: null,
            relNo: null,
            lanId: null,
            relCode: '150729432400038458',
            curLoginTime: '2019-03-14 17:25:25',
            lastLoginTime: '2019-03-14 17:01:46',
            failLoginCnt: 0,
            successLoginCnt: 18447,
            phoneNo: '180****1111',
            orgId: '07XX',
            orgName: null,
            email: '155@qq.com',
            regionId: '430103',
            createStaff: null,
            createDate: '2018-12-14 11:13:36',
            updateStaff: '1',
            updateDate: '2018-12-14 11:14:33',
            sysPostId: null,
            sysPostName: null,
          },
          userOtherMsg: {
            user: {
              userId: '1',
              loginName: 'admin',
              statusCd: 1,
              userName: '超级管理员',
              remark: 'mkk',
              userFounder: 1,
              relType: null,
              relNo: null,
              lanId: null,
              relCode: '150729432400038458',
              curLoginTime: '2019-03-14 17:25:25',
              lastLoginTime: '2019-03-14 17:01:46',
              failLoginCnt: 0,
              successLoginCnt: 18447,
              phoneNo: '180****1111',
              orgId: '07XX',
              orgName: null,
              email: '155@qq.com',
              regionId: '430103',
              createStaff: null,
              createDate: '2018-12-14 11:13:36',
              updateStaff: '1',
              updateDate: '2018-12-14 11:14:33',
              sysPostId: null,
              sysPostName: null,
            },
            merchant: null,
            partnerShop: null,
            partner: null,
            supplier: null,
            businessEntity: null,
            userRoleList: [
              {
                id: '1085090655003877378',
                userId: '1',
                userName: '超级管理员',
                roleId: '1068466946915516417',
                roleName: '超级管理员角色',
                createStaff: '1',
                createDate: '2019-01-15 16:25:46',
              },
            ],
          },
          userMenu: [],
          shopInfo: null,
          currentAuthority: 'admin',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX',
          loginStatusCode: '1',
          loginStatusMsg: '已登陆',
        },
      });
    } else {
     return Mock.mock({
        resultCode: '1',
        resultMsg: '登录失败',
        resultObject: {
          type: type,
          currentAuthority: 'guest',
        },
      });
    }
  }
});
Mock.setup({
  timeout: '600',
});
var platformMap = [
  {
    value: 1,
    label: '爱奇艺',
  },
  {
    value: 2,
    label: '腾讯',
  },
  {
    value: 3,
    label: '优酷',
  },
  {
    value: 4,
    label: 'Boss',
  },
  {
    value: 5,
    label: '权益中心',
  },
  {
    value: 6,
    label: '京东',
  },
  {
    value: 7,
    label: '盒马鲜生',
  },
];
Mock.mock(/audit\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var rightName = body.rightName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': 1,
            orderCode: '@natural(100000,100000000)',
            rightName: rightName || '@cword(10,20)',
            'resourceType|1': platformMap,
            'statusType|1': ['开通成功', '开通失败：错误码券'],
            createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
var resourceTypeMap = [
  {
    value: 'heBao',
    label: '和包券',
  },
  {
    value: 'diYongJin',
    label: '合作商户抵用金',
  },
  {
    value: 'tiYanKa',
    label: '服务体验卡',
  },
  {
    value: 'huiYuan1',
    label: '互联网会员(固定期限)',
  },
  {
    value: 'huiYuan2',
    label: '互联网会员(连续包月)',
  },
];
Mock.mock(/resourceManagement\/queryResourceInfo/, function(options) {
  var body = JSON.parse(options.body);
  var resourceType = body.resourceType;
  var id = body.id;
  var mktResName;
  switch (resourceType) {
    case 'heBao':
      mktResName = '和包券';
      break;
    case 'diYongJin':
      mktResName = '合作商户抵用金';
      break;
    case 'tiYanKa':
      mktResName = '服务体验卡';
      break;
    case 'huiYuan1':
      mktResName = '互联网会员(固定期限)';
      break;
    case 'huiYuan2':
      mktResName = '互联网会员(连续包月)';
      break;
  }
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '请求正常',
      resultObject: {
        mktResName: function() {
          return mktResName + ' - ' + Random.cword(10, 20);
        },
        mktResId: '3',
        partnerId: '3',
        MktResource: '3',
        regionCd: '1',
        createDateRange: ['2019-03-16', '2029-03-16'],
        code: '@natural(10000,1000000)',
        kuCun: '@natural(10000,1000000)',
        invalidDate: '2029-03-16',
        departmentCd: '1',
        qiYongQuDao: true,
        isMobileNumber: true,
        usageMode: ['1'],
        shiYongShiXiao: '1',
        shiYongShiXiaoNumber: '',
        shiYongCiShu: '1',
        isNeedAppointment: '1',
        appointmentLimit: '1',
        website: '@url()',
        jieSuanDanJia: '50',
        jieSuanShiJian: '1',
        shiYongHeXiao: '1',
      },
    });
  }
});
Mock.mock(/resourceManagement\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': 1,
            resourceCode: '@natural(100000,100000000)',
            'resourceName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'resourceType|1': resourceTypeMap,
            price: '@natural(10,1000)',
            statusType: statusType != undefined ? statusType : '@natural(0,1)',
            createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
var rightsStyle = [
  {
    value: 'heBao',
    label: '和包券权益',
  },
  {
    value: 'diYongJin',
    label: '抵金券权益',
  },
  {
    value: 'tiYanKa',
    label: '体验卡权益',
  },
  {
    value: 'huiYuan1',
    label: '互联网会员权益',
  },
  {
    value: 'rightsGroup',
    label: '权益包',
  },
];
var canal = [
  {
    value: 'heBao',
    label: '权益商城',
  },
  {
    value: 'diYongJin',
    label: '和生活',
  },
  {
    value: 'tiYanKa',
    label: 'BOSS',
  },
];
var couponScene = [
  {
    value: 'heBao',
    label: '影音会员',
  },
  {
    value: 'diYongJin',
    label: '旅游出行',
  },
  {
    value: 'tiYanKa',
    label: '支付优惠',
  },
  {
    value: 'huiYuan1',
    label: '流量语音',
  },
  {
    value: 'rightsGroup',
    label: '移动服务',
  },
];
var couponArea = [
  {
    value: 'heBao',
    label: '四川/成都',
  },
  {
    value: 'diYongJin',
    label: '全国',
  },
];
var salesState = [
  {
    value: 'heBao',
    label: '上架',
  },
  {
    value: 'diYongJin',
    label: '再售',
  },
  {
    value: 'tiYanKa',
    label: '缺货',
  },
  {
    value: 'huiYuan1',
    label: '下架',
  },
];
Mock.mock(/rightsManagement\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var statusCd = body.statusCd;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'key|+1': current === 1 ? 0 : (current - 1) * 10,
            couponNbr: '@natural(100000,100000000)',
            'couponName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            couponType: rightsStyle[Math.ceil(Math.random() * 4)].label,
            couponScene: couponScene[Math.ceil(Math.random() * 4)].label,
            statusCd: statusCd != undefined ? statusCd : '@natural(0,1)',
            updateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
Mock.mock(/rightsManagement\/queryGroupList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var statusCd = body.statusCd;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'key|+1': current === 1 ? 0 : (current - 1) * 10,
            couponNbr: '@natural(100000,100000000)',
            'couponName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            couponType: rightsStyle[Math.ceil(Math.random() * 3)].label,
            couponScene: couponScene[Math.ceil(Math.random() * 3)].label,
            salesState: salesState[Math.ceil(Math.random() * 3)].label,
            sum: '@natural(100,100000)',
            canal: canal[Math.ceil(Math.random() * 2)].label,
            updateDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
var resourceStyle = [
  {
    value: 'heBao',
    label: '资源类/和包券',
  },
  {
    value: 'diYongJin',
    label: '资源类/抵金券',
  },
  {
    value: 'tiYanKa',
    label: '资源类/体验卡',
  },
  {
    value: 'huiYuan1',
    label: '资源类/互联网会员',
  },
];
var timeStyle = [
  {
    value: 'heBao',
    label: '即时',
  },
  {
    value: 'diYongJin',
    label: '365天',
  },
  {
    value: 'tiYanKa',
    label: '包月',
  },
];
Mock.mock(/rightsManagement\/queryResourceList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var statusCd = body.statusCd;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|5': [
          {
            'key|+1': current === 1 ? 0 : (current - 1) * 5,
            couponNbr: '@natural(100000,100000000)',
            couponName: '@cword(10,20)',
            resourceStyle: resourceStyle[Math.ceil(Math.random() * 3)].label,
            timeStyle: timeStyle[Math.ceil(Math.random() * 2)].label,
            couponArea: couponArea[Math.ceil(Math.random())].label,
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 5,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
// ly
Mock.mock(/cust\/queryRightsIssue\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            'name|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'curNum|0-3': 0,
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'resource|1': ['五星级客户定向发放'],
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
            phone: function() {
              return '13' + Random.string('number', 9);
            },
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
    });
  }
});
Mock.mock(/cust\/queryDetailInfo\/detail.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          titleName: '@csentence(5,7)',
          applyReason: '@csentence(3,5)',
          note: '@csentence(3,5)',
          preeMemory: 1000,
        },
        rightsSendDate: {
          'sendDateStates|1-2': 1,
          sendDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
        },
        'logList|4': [
          {
            'id|+1': 1,
            'link|+1': 0,
            dealPerson: '@cname',
            'dealStates|0-2': 0,
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'dealResult|0-1': 0,
            dealIdea: '尽快启用',
          },
        ],
        'rightsContentList|3': [
          {
            'everySendNum|0-3': 0,
            'rightsType|1': [
              '资源类/会员',
              '资源类/商户抵金券',
              '资源类/和包券',
              '产品类/流量',
              '服务类/专属客服',
              '业务类/业务体验',
            ],
            rightsId: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'rightsName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            date: '365天',
            address: '四川省/成都市',
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            type: '@cname',
            number: 500,
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            name: '@cname',
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
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
    });
  }
});
Mock.mock(/cust\/queryBusinessData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            rightsResource: '@string(number,2)',
            'alreadyMoney|1-1000000': 10000,
            'notMoney|1-1000000': 10000,
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'type|0-1': 0,
            'name|1': ['爱奇艺', '成都万达影城', '和包四川省平台', '和生活', '产商品中心'],
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
    });
  }
});
Mock.mock(/cust\/queryToRuleManage\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            'rightsType|1': [
              '资源类/会员',
              '资源类/商户抵金券',
              '资源类/和包券',
              '产品类/流量',
              '服务类/专属客服',
              '业务类/业务体验',
            ],
            'states|0-4': 0,
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'name|1': [
              '开学季营销发放规则',
              '淘宝APP定向无限量流量包',
              '10086专属客服坐席',
              '5G体验权30天',
            ],
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
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
    });
  }
});
Mock.mock(/cust\/queryToRuleManageDetailInfo\/detail.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          ruleName: '@csentence(5,7)',
          'ruleNumber|1-1000000': 0,
          sendType: '营销活动',
        },
        activitesRule: {
          'rightsName|1': [
            '爱奇艺VIP视频会员季卡',
            '爱奇艺VIP连续包月20元档',
            '和包电子券满10减5元',
            '成都移动万达联名卡240元观影券',
            '成都东站高铁VIP侯车厅服务1次',
          ],
          'rightsType|1': [
            '资源类/会员',
            '资源类/商户抵金券',
            '资源类/和包券',
            '产品类/流量',
            '服务类/专属客服',
            '业务类/业务体验',
          ],
          sendObj: '@csentence(5,7)',
          connectActivities: '@csentence(5,7)',
          activitiesDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          sendDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          ruleNote: '@csentence(5,7)',
          preeMemory: 1111,
        },
        'logList|4': [
          {
            'id|+1': 1,
            'link|+1': 0,
            dealPerson: '@cname',
            'dealStates|0-2': 0,
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'dealResult|0-1': 0,
            dealIdea: '尽快启用',
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryCashOrderData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            'states|0-2': 0,
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            crmId: '@string(number, 7)',
            rightsId: '@string(number, 7)',
            // cashContact:'BOSS',
            rightsNum: 1,
            cashNum: 3,
            'shopRealPay|0-2': 0,
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
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
    });
  }
});
Mock.mock(/cust\/queryCashOrderDetailData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        orderInfo: {
          'cashId|1-1000000000': 0,
          'rightsId|1-1000000000': 0,
          'crmId|1-1000000000': 0,
          cashContact: 'BOSS',
          cashDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          state: '兑换成功',
        },
        date: {
          createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          endDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
        },
        'list|4': [
          {
            'id|+1': 1,
            'number|1-1000000000': 0,
            rule: '@cname',
            name: '@cname',
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'dateNum|1-1000000000': 0,
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryResourceData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          'cashId|1-1000000000': 0,
          rightsId: '@cname',
          'cashContact|1-1000000000': 0,
          cashDate: '@cname',
        },
        'list|4': [
          {
            'num|+1': 1,
            'number|1-1000000000': 0,
            'rightsId|1-10000000000': 0,
            UseDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            rule: '@cname',
            name: '@cname',
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'dateNum|1-1000000000': 0,
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryOpenOrderData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'rightsName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'openPlatform|1': [
              '腾讯',
              '爱奇艺',
              '优酷',
              '京东',
              'BOSS',
              '天猫商城',
              '盒马生鲜',
              '权益中心',
            ],
            'openResult|0-1': 0,
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
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
    });
  }
});
Mock.mock(/cust\/queryOpenOrderDetailData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        orderInfo: {
          'applyOrder|1-1000000000': 0,
          'dealStates|0-1': 0,
          dealPerson: '@cname',
          applyDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          applyType: '权益开通申请单',
        },
        applyInfo: {
          'rightsId|1-10000000000': 0,
          sendDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'rightsName|1': [
            '爱奇艺VIP视频会员季卡',
            '爱奇艺VIP连续包月20元档',
            '和包电子券满10减5元',
            '成都移动万达联名卡240元观影券',
            '成都东站高铁VIP侯车厅服务1次',
          ],
          rightsNote: '@csentence(5)',
          provide: '@csentence(4)',
          applyDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'qmId|1-1000000000': 0,
          'qmPassword|1-100000000000': 0,
          'usePhone|1-1000000000000000': 0,
          bill: '@csentence(7)',
        },
        feedbackInfo: {
          'openPlatform|1': [
            '腾讯',
            '爱奇艺',
            '优酷',
            '京东',
            'BOSS',
            '天猫商城',
            '盒马生鲜',
            '权益中心',
          ],
          'openResult|0-1': 0,
          openDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createOrEndDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
        },
        'logList|4': [
          {
            'id|+1': 1,
            'dealState|0-2': 0,
            dealPerson: '@cname',
            link: '@cname',
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            dealResult: '自动通过',
            dealOpinion: '无',
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryComOrderData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'complaintType|0-2': 0,
            'rightsName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'dealLink|0-4': 0,
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
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
    });
  }
});
Mock.mock(/cust\/queryComOrderDetailData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        orderInfo: {
          'complaintOrder|1-1000000000': 0,
          'dealStates|0-1': 0,
          dealPerson: '@cname',
          applyDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          complaintType: '权益无法开通',
          complaintWay: '10086电话',
        },
        complaintInfo: {
          'rightsId|1-10000000000': 0,
          sendDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'rightsName|1': [
            '爱奇艺VIP视频会员季卡',
            '爱奇艺VIP连续包月20元档',
            '和包电子券满10减5元',
            '成都移动万达联名卡240元观影券',
            '成都东站高铁VIP侯车厅服务1次',
          ],
          rightsNote: '@csentence(5)',
          provide: '@csentence(4)',
          applyDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'qmId|1-1000000000': 0,
          'qmPassword|1-100000000000': 0,
          'usePhone|1-1000000000000000': 0,
          complaintContent: '@csentence(7)',
          useAppeal: '退款',
          relevantBill: '投诉单20123232332',
        },
        'communicationList|3': [
          {
            'id|+1': 1,
            content: '@csentence(5)',
            dealPerson: '@cname',
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            dealResult: '自动通过',
          },
        ],
        'logList|4': [
          {
            'id|+1': 1,
            'dealState|0-2': 0,
            dealPerson: '@cname',
            link: '@cname',
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            dealResult: '自动通过',
            dealOpinion: '无',
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryMemberData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|4': [
          {
            'id|1-100': 0,
            'name|+1': 0,
            'number|1-10000': 1000,
            'integral|1-5': 0,
            'singleService|0-1': 0,
            'lineCredit|0-1': 0,
            'holidayStopMobile|0-1': 0,
            'interBusiness|0-1': 0,
            '10086|0-1': 0,
            'freeCard|0-1': 0,
            'aiqiyi|0-1': 0,
            'starts|0-100000': 0,
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryMemberDetailInfo\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          'titleName|1': ['五星', '四星', '三星'],
          'growthValue|1-1000': 0,
          'integral|1-5': 5,
        },
        rightGift: {
          'rightsName|1': [
            '爱奇艺VIP视频会员季卡',
            '爱奇艺VIP连续包月20元档',
            '和包电子券满10减5元',
            '成都移动万达联名卡240元观影券',
            '成都东站高铁VIP侯车厅服务1次',
          ],
          rightsType: 0,
          'residualInventory|1-100000': 0,
          rightsDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'sendNum|1-10000': 0,
          provideService1: 0,
          'everySendNum1|1-10000': 0,
        },
        plusGift: {
          serviceName: '@csentence(5,7)',
          provideService: '提供',
          'everySendNum|1-1000': 0,
        },
        integral: {
          integral: [0],
          'integralNum|1-10000': 5000,
        },
        'memberList|2': [
          {
            'id|1-1000000': 0,
            'name|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'sendNum|1-10000': 1000,
            provideService: '提供',
            'realitySendNum|1-100000': 0,
            'everyNum|1-100': 0,
          },
        ],
        'logList|5': [
          {
            'id|+1': 1,
            'link|+1': 0,
            dealPerson: '@cname',
            'dealStates|0-2': 0,
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'dealResult|0-1': 0,
            dealIdea: '尽快启用',
          },
        ],
        'differenceList|2': [
          {
            'id|1-1000000': 0,
            'serviceName|1': ['单停服务', '授信额度', '其他服务'],
            'provideService|0-1': 0,
            'everyNum|1-100': 0,
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryGrowthData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            id: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'ruleName|1': ['入网时间大于3年', '每月通话达300分钟', 'ARPU值', '登录1次', '流量达人'],
            'growth|1-1000': 0,
            address: '@city(true)',
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
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
    });
  }
});
Mock.mock(/cust\/queryGrowthDetailInfo\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          ruleName: '@csentence(5,7)',
          'ruleId|1-10000000': 0,
          createPerson: '@cname',
          ruleTarget: '入网时长',
          'determineType|0-4': 0,
          'targetNum|1-100': 0,
          'getGrowValue|1-1000': 0,
          ruleDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          address: 0,
        },
        'logList|5': [
          {
            'id|+1': 1,
            'link|+1': 0,
            dealPerson: '@cname',
            'dealStates|0-2': 0,
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'dealResult|0-1': 0,
            dealIdea: '尽快启用',
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryFinalData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            'id|1-10000000': 0,
            merchantName: '@csentence(5)',
            paymentDays: '@datetime("yyyy-MM-dd")',
            'paymentDaysNum|1-2': 1,
            'settlementAmount|1-10000000000': 0,
            'states|0-2': 0,
            createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            importPerson: '@cname',
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
    });
  }
});
Mock.mock(/cust\/queryFinalDetail\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          'businessName|0-2': 0,
          'importPerson|0-2': 0,
          'states|0-2': 0,
        },
        invoice: {
          type: '@csentence(5,7)',
          code: '@csentence(5,7)',
          file: 'asdsdsd',
        },
        operInfo: {
          createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createPerson: '@cname',
          uploadFile: '@datetime("yyyy-MM-dd HH:mm:ss")',
          uploadPerson: '@cname',
          checkDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          checkPerson: '@cname',
        },
      },
    });
  }
});
Mock.mock(/cust\/queryFinalDetailTable\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'accountList|3': [
          {
            accountDate: '@datetime("yyyy-MM-dd")',
            'saleSize|1-10000': 1000,
            'salesAmount|1-10000': 1000,
            'orderSize|1-10000': 1000,
            'orderAmount|1-10000': 1000,
            'closeAmount|1-10000': 1000,
            'businessStates|0-2': 0,
          },
        ],
      },
    });
  }
});
Mock.mock(/cust\/queryAdjustData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            'id|1-10000000': 0,
            paymentDays: '@datetime("yyyy-MM-dd")',
            merchantName: '@csentence(5)',
            'chargeOffMoney|1-100000': 1000,
            'adjustmentsMoney|1-10000': 100,
            'states|0-4': 0,
            merchantDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            adjustmentsDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            adjustmentsName: '@cname',
            checkName: '@cname',
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
    });
  }
});
Mock.mock(/cust\/queryAbnormalDetail\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          merchantName: '@csentence(3)',
          importPerson: '@cname',
          states: '待审核',
        },
        abnormalDetail: {
          paymentDays: '@datetime("yyyy-MM-dd")',
          'chargeOffMoney|1-1000': 0,
          merchantDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          abnormalNote: '@csentence(10)',
        },
        accountDetail: {
          paymentDays: '@datetime("yyyy-MM-dd")',
          'adjustmentsMoney|1-1000': 0,
          adjustmentsDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          adjustmentsNote: '@csentence(10)',
        },
        operInfo: {
          submitDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          submitName: '@cname',
          checkDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          checkName: '@cname',
        },
      },
    });
  }
});
Mock.mock(/cust\/queryRightsCustManageData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            'id|0-1000': 0,
            'mobileNum|1-10000000000': 0,
            custName: '@cname',
            'sex|0-1': 0,
            'growthVal|1-1000': 0,
            address: '@city(true)',
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'starts|0-2': 0,
            'memberId|0-1': 0,
            'likeTag|0-2': 0,
            'registerWay|0-1': 0,
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
    });
  }
});

Mock.mock(/cust\/queryCustExportTableData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|10': [
          {
            'id|0-1000': 0,
            'exportNum|1-10000': 0,
            'errorNum|1-1000': 0,
            'successNum|1-1000': 0,
            exportDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            operator: '@cname',
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
    });
  }
});

Mock.mock(/cust\/queryBatchExportTableData\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        size: 10,
        startRow: 1,
        endRow: 10,
        total: '@natural(1,500)',
        pages: 2,
        'list|5': [
          {
            'id|0-1000': 0,
            'custMobile|1-100000000000000': 0,
            'exportMemberId|0-1': 0,
            'registerResult|0-1': 0,
            'memberOpenResult|0-1': 0,
            'note|0-1': 0,
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
    });
  }
});

Mock.mock(/cust\/queryrightsCustDetailInfo\/data.do/, function(options) {
  var body = JSON.parse(options.body);

  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          'mobile|1-100000000000': 0,
          name: '@cname',
          'sex|0-1': 0,
          address: '@city',
          birthday: '@datetime("yyyy-MM-dd HH:mm:ss")',
          custType: '本网客户',
          regDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          regMethod: '系统注册',
        },
        like: ['流量达人', '90后', '追剧狂人', '篮球迷'],
        growAndMember: {
          'growthVal|1-1000': 0,
          'starts|0-2': 0,
          'memberId|0-1': 0,
        },
      },
    });
  }
});

Mock.mock(/cust\/queryCanUseRightsList\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: '@natural(1,500)',
        'list|5': [
          {
            'id|0-1000': 0,
            'rightsCode|1-100000000000000': 0,
            rightsName: '@csentence(5,7)',
            'number|0-10000': 0,
          },
        ],
      },
    });
  }
});

Mock.mock(/cust\/queryAlreadyUseRightsList\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: '@natural(1,500)',
        'list|5': [
          {
            'id|0-1000': 0,
            'rightsCode|1-100000000000000': 0,
            rightsName: '@csentence(5,7)',
            'number|0-10000': 0,
            useDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'userRightsCode|1-100000000': 0,
            openOrder: 'KT2000009221',
          },
        ],
      },
    });
  }
});

Mock.mock(/cust\/queryPassRightsList1\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: '@natural(1,500)',
        'list|5': [
          {
            'id|0-1000': 0,
            'rightsCode|1-100000000000000': 0,
            rightsName: '@csentence(5,7)',
            passDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            userRightsCode: 'KT2000009221',
          },
        ],
      },
    });
  }
});

Mock.mock(/cust\/queryOrderOrGetList\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: '@natural(1,500)',
        'list|5': [
          {
            'id|0-1000': 0,
            orderDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            orderWay: '权益商城',
            orderMethod: '系统赠送',
            'rightsCode|1-100000000000000': 0,
            rightsName: '@csentence(5,7)',
          },
        ],
      },
    });
  }
});

Mock.mock(/cust\/queryGrowthDetailList\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: '@natural(1,500)',
        'list|5': [
          {
            'id|0-1000': 0,
            changeDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            orderWay: '权益商城',
            'changeNum|1-100000': 0,
            'changeGrowth|1-100000': 0,
            'changeStarts|0-1': 0,
            changeResult: '@csentence(5,7)',
          },
        ],
      },
    });
  }
});

Mock.mock(/cust\/queryCustRightsInfoList\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  var pageNum = body.pageNum;
  var pageSize = body.pageSize;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: '@natural(1,500)',
        'list|5': [
          {
            'id|0-1000': 0,
            sendDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'userRights|1-100000': 0,
            takeEffectDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            loseEffectDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'number|1-100000': 0,
          },
        ],
      },
    });
  }
});

Mock.mock(/cust\/queryMemberProductList\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|5': [
          {
            'id|0-1000': 0,
            'member|0-3': 0,
            'name|0-3': 0,
            'rightServer|0-3': 0,
            'integral|1-1000': 0,
            'memberNum|1-10000': 0,
          },
        ],
      },
    });
  }
});

Mock.mock(/cust\/queryMemberProductDetail\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          'memberLevel|0-2': 0,
          titleName: '@cname',
          'presentExp|1-100000': 0,
          memberNotice: '@csentence(5,7)',
          memberDate: 1,
          getmemberDate: ['@datetime("yyyy-MM-dd HH:mm:ss")', '@datetime("yyyy-MM-dd HH:mm:ss")'],
          getSetup: 1,
          'price|1-1000': 0,
          'inventory|1-10000': 0,
          'productCode|1-1000': 0,
        },
        'memberList|3': [
          {
            'id|1-10000000': 1,
            'name|0-2': 0,
            'type|0-1': 0,
            'sendNum|1-10000': 0,
            rightsDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'number|0-2': 0,
          },
        ],
        'logList|5': [
          {
            'id|+1': 1,
            'link|+1': 0,
            dealPerson: '@cname',
            'dealStates|0-2': 0,
            dealDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
            'dealResult|0-1': 0,
            dealIdea: '尽快启用',
          },
        ],
        memberRights: {
          rightsName: '@csentence(5,7)',
          'rightsType|0-1': 0,
          'residualInventory|1-10000': 0,
          sendDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'sendNum|1-10000': 0,
          rightsUseDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          'everyNum|1-10000': 0,
        },
      },
    });
  }
});

Mock.mock(/cust\/queryBusinessDetail\/data.do/, function(options) {
  var body = JSON.parse(options.body);
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        baseInfo: {
          'businessName|1': ['爱奇艺', '优酷', '腾讯'],
          'businessType|1-3': 1,
          'importPerson|1-3': 1,
        },
        account: {
          'bankName|1-3': 3,
          'openWebsite|1-3': 3,
          'accountType|1-3': 1,
          'accountName|1': ['爱奇艺', '优酷', '腾讯'],
          'accountNum|1-10000': 0,
          'remindFrequency|1-3': 1,
        },
        interface: {
          interface: 'www.aiqiyi',
        },
      },
    });
  }
});

Mock.mock(/api\/fake_RightsCustChart_data/, function(options) {
  var salesData = [];
  for (var i = 0; i < 12; i += 1) {
    salesData.push({
      x: i + 1 + '月',
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }

  var salesTypeData = [
    {
      x: '一星级客户',
      y: 4544,
    },
    {
      x: '二星级客户',
      y: 3321,
    },
    {
      x: '三星级客户',
      y: 3113,
    },
    {
      x: '四星级客户',
      y: 2341,
    },
    {
      x: '五星级客户',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];

  var salesTypeDataOnline = [
    {
      x: '初级会员',
      y: 1454,
    },
    {
      x: '中级会员',
      y: 321,
    },
    {
      x: '高级会员',
      y: 3113,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];

  var salesTypeDataOffline = [
    {
      x: '消费客户',
      y: 99,
    },
    {
      x: 'B2B客户',
      y: 188,
    },
    {
      x: '渠道客户',
      y: 344,
    },
    {
      x: '企业客户',
      y: 255,
    },
    {
      x: '其他',
      y: 65,
    },
  ];

  var salesTypeDataOffline1 = [
    {
      x: '汽车行业',
      y: 999,
    },
    {
      x: '旅游行业',
      y: 1288,
    },
    {
      x: '电商行业',
      y: 2344,
    },
    {
      x: '其他',
      y: 653,
    },
  ];

  var offlineChartData = [];
  for (var i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '',
      resultData: {
        salesData: salesData,
        offlineChartData: offlineChartData,
        salesTypeData: salesTypeData,
        salesTypeDataOnline: salesTypeDataOnline,
        salesTypeDataOffline: salesTypeDataOffline,
        salesTypeDataOffline1: salesTypeDataOffline1,
      },
    });
  }
});

//chart
Mock.mock(/api\/fake_chart_data/, function(options) {
  // mock data
  var visitData = [];
  var beginDay = new Date().getTime();
  var fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
  for (var i = 0; i < fakeY.length; i += 1) {
    visitData.push({
      x: formatDate(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'),
      y: fakeY[i],
    });
  }
  var visitData2 = [];
  var fakeY2 = [1, 6, 4, 8, 3, 7, 2];
  for (var i = 0; i < fakeY2.length; i += 1) {
    visitData2.push({
      x: formatDate(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'),
      y: fakeY2[i],
    });
  }
  var salesData = [];
  for (var i = 0; i < 12; i += 1) {
    salesData.push({
      x: i + 1 + '月',
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  var searchData = [];
  for (var i = 0; i < 50; i += 1) {
    searchData.push({
      index: i + 1,
      keyword: '搜索关键词-' + i,
      count: Math.floor(Math.random() * 1000),
      range: Math.floor(Math.random() * 100),
      status: Math.floor((Math.random() * 10) % 2),
    });
  }
  var salesTypeData = [
    {
      x: '家用电器',
      y: 4544,
    },
    {
      x: '食用酒水',
      y: 3321,
    },
    {
      x: '个护健康',
      y: 3113,
    },
    {
      x: '服饰箱包',
      y: 2341,
    },
    {
      x: '母婴产品',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];
  var salesTypeDataOnline = [
    {
      x: '家用电器',
      y: 244,
    },
    {
      x: '食用酒水',
      y: 321,
    },
    {
      x: '个护健康',
      y: 311,
    },
    {
      x: '服饰箱包',
      y: 41,
    },
    {
      x: '母婴产品',
      y: 121,
    },
    {
      x: '其他',
      y: 111,
    },
  ];
  var salesTypeDataOffline = [
    {
      x: '家用电器',
      y: 99,
    },
    {
      x: '食用酒水',
      y: 188,
    },
    {
      x: '个护健康',
      y: 344,
    },
    {
      x: '服饰箱包',
      y: 255,
    },
    {
      x: '其他',
      y: 65,
    },
  ];
  var offlineData = [];
  for (var i = 0; i < 10; i += 1) {
    offlineData.push({
      name: 'Stores ' + i,
      cvr: Math.ceil(Math.random() * 9) / 10,
    });
  }
  var offlineChartData = [];
  for (var i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }
  var radarOriginData = [
    {
      name: '个人',
      ref: 10,
      koubei: 8,
      output: 4,
      contribute: 5,
      hot: 7,
    },
    {
      name: '团队',
      ref: 3,
      koubei: 9,
      output: 6,
      contribute: 3,
      hot: 1,
    },
    {
      name: '部门',
      ref: 4,
      koubei: 1,
      output: 6,
      contribute: 5,
      hot: 7,
    },
  ];
  var radarData = [];
  var radarTitleMap = {
    ref: '引用',
    koubei: '口碑',
    output: '产量',
    contribute: '贡献',
    hot: '热度',
  };
  $.each(radarOriginData, function(i, item) {
    $.each(item, function(n, key) {
      if (key !== 'name') {
        radarData.push({
          name: item.name,
          label: radarTitleMap[key],
          value: item[key],
        });
      }
    });
  });
  //   radarOriginData.forEach(item => {
  //     Object.keys(item).forEach(key => {
  //       if (key !== 'name') {
  //         radarData.push({
  //           name: item.name,
  //           label: radarTitleMap[key],
  //           value: item[key],
  //         });
  //       }
  //     });
  //   });
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '',
      resultData: {
        visitData: visitData,
        visitData2: visitData2,
        salesData: salesData,
        searchData: searchData,
        offlineData: offlineData,
        offlineChartData: offlineChartData,
        salesTypeData: salesTypeData,
        salesTypeDataOnline: salesTypeDataOnline,
        salesTypeDataOffline: salesTypeDataOffline,
        radarData: radarData,
      },
    });
  }
});
/*库存管理 BEGIN*/
Mock.mock(/inventory1\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            resourceCode: '@natural(100000,100000000)',
            'resourceName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'resourceType|1': resourceTypeMap,
            price: '@natural(1,100000)',
            number: '@natural(1,100000)',
            createDate: '@datetime("yyyy-MM-dd")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
Mock.mock(/inventory2\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            resourceCode: '@natural(100000,100000000)',
            'resourceName|1': ['爱奇艺', '成都万达影院', '优酷', '滴滴打车'],
            number1: '@natural(1,100000)',
            number2: '@natural(1,100000)',
            price: '@natural(1,100000)',
            statusType: statusType != undefined ? statusType : '@natural(0,2)',
            creatorName: '@cname()',
            auditorName: '@cname()',
            createDate: '@datetime("yyyy-MM-dd")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
Mock.mock(/inventory4\/queryResourceList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            resourceCode: '@natural(100000,100000000)',
            'resourceName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'resourceType|1': resourceTypeMap,
            price: '@natural(10,1000)',
            statusType: statusType != undefined ? statusType : '@natural(0,1)',
            createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
Mock.mock(/inventory2\/orderInfo/, function(options) {
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|1-3': [
          {
            'id|+1': 1,
            resourceCode: '@natural(100000,100000000)',
            resourceName: '@cword(10,20)',
            priceList: [
              {
                number: '1',
                price: '100',
              },
              {
                number: '100',
                price: '80',
              },
            ],
            number: '@natural(1,10000)',
            createDate: '@datetime("yyyy-MM-dd")',
          },
        ],
        pagination: {
          current: 1,
          pageSize: 10,
          total: '@natural(1,10)',
        },
        'fileList1|1-3': [
          {
            uid: '@natural(1,10000)',
            name: '@cword(10,20)',
            url: '@url()',
          },
        ],
        'fileList2|1-3': [
          {
            uid: '@natural(1,10000)',
            name: '@cword(10,20)',
            url: '@url()',
          },
        ],
      },
    });
  }
});
Mock.mock(/inventory\/queryCancelledOrderList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            code: '@natural(100000,100000000)',
            number1: '@natural(10,100000)',
            number2: '@natural(10,100000)',
            statusType: statusType != undefined ? statusType : '@natural(0,1)',
            creatorName: '@cname()',
            auditorName: '@cname()',
            createDate: '@datetime("yyyy-MM-dd")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
/*库存管理 END*/
/* 风控管理 BEGIN*/
Mock.mock(/riskControl\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            code: '@natural(100000,100000000)',
            'resourceName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'type|1': ['预警', '熔断'],
            number: '@natural(10,10000)',
            statusType: '@natural(0,2)',
            'feedback|1': ['无需处理', '异常', '-'],
            exceptionDate: '@datetime("yyyy-MM-dd hh:mm:ss")',
            dealDate: '@datetime("yyyy-MM-dd  hh:mm:ss")',
            person: '@cname()',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
Mock.mock(/riskControl\/rulesList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': 1,
            code: '@natural(100000,100000000)',
            resourceName: '@cword(10,20)',
            priceList: [
              {
                number: '1',
                price: '100',
              },
              {
                number: '100',
                price: '80',
              },
            ],
            number1: '@natural(1,10000)',
            number2: '@natural(1,10000)',
            number3: '@natural(1,10)',
            person1: '@cname()',
            person2: '@cname()',
            updateDate: '@datetime("yyyy-MM-dd")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
Mock.mock(/queryPerson/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|0-10': [
          {
            'id|+1': 1,
            name: '@cname()',
            phoneNumber: function() {
              return '136' + Random.string('number', 8);
            },
            role: '权益管理员',
            department: '市场部',
          },
        ],
      },
    });
  }
});
/* 风控管理 END */
Mock.mock(/complainManagement\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': 1,
            couponNbr: function() {
              return Random.string('upper', 4) + Random.string('number', 7);
            },
            'couponName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'rightsType|1': '@natural(0,2)',
            statusCd: '@natural(0,3)',
            date: '@datetime("yyyy-MM-dd HH:mm:ss")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});
Mock.mock(/reportForms\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            code: '@natural(100000,100000000)',
            'resourceName|1': [
              '爱奇艺VIP视频会员季卡',
              '爱奇艺VIP连续包月20元档',
              '和包电子券满10减5元',
              '成都移动万达联名卡240元观影券',
              '成都东站高铁VIP侯车厅服务1次',
            ],
            'scene|1': ['音影会员', '支付优惠', '旅游出行', '吃喝玩购', '医疗健康'],
            'partner|1': ['爱奇艺'],
            date: '@datetime("yyyy-MM-dd")',
            number1: '@natural(10,10000)',
            number2: '@natural(10,10000)',
            number3: '@natural(10,10000)',
            number4: '@natural(10,10000)',
            number5: '@natural(10,10000)',
            number6: '@natural(10,10000)',
            number7: '@natural(10,10000)',
            number8: '@natural(10,10000)',
            percent1: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            percent2: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            percent3: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            percent4: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            percent5: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            percent6: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            percent7: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            percent8: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
            number: '@natural(10,10000)',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});

var nameMap = [
  '关注爱奇艺会员上线',
  '重磅福利!免费月卡等你领',
  '您有一封来自爱奇艺的短消息',
  '每天不到1毛钱',
  '流量达人',
];
var resourceNameMap = [
  '爱奇艺VIP视频会员季卡',
  '爱奇艺VIP连续包月20元档',
  '和包电子券满10减5元',
  '成都移动万达联名卡240元观影券',
  '成都东站高铁VIP侯车厅服务1次',
];
var channelMap = ['BOSS', '和生活', '和生活、BOSS'];

Mock.mock(/messages\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            'status|1': [0, 1],
            disabled: function() {
              return this.status == 0 ? true : false;
            },
            'name|1': nameMap,
            'resourceName|1': resourceNameMap,
            releaseDate: '@datetime("yyyy-MM-dd")',
            appointDate: '@datetime("yyyy-MM-dd")',
            'channel|1': channelMap,
            number: '@natural(1000,1000000)',
            percent: function() {
              return Random.float(1, 100, 2, 2) + '%';
            },
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});

Mock.mock(/messages\/orderInfo/, function(options) {
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        id: '@natural(1,100000)',
        'name|1': nameMap,
        code: function() {
          return Random.string('string', 2) + Random.string('number', 6);
        },
        creatorName: '@cname()',
        'resourceName|1': resourceNameMap,
        date: '@datetime("yyyy-MM-dd hh:mm")',
        releaseDate: '@datetime("yyyy-MM-dd hh:mm")',
        'channel|1': channelMap,
        description1: '@cparagraph()',
        description2: '@cparagraph()',
        description3: '@cparagraph()',
      },
    });
  }
});
var sceneMap = ['音影会员', '支付优惠', '旅游出行', '吃喝玩购', '医疗健康'];
Mock.mock(/messages\/queryRightsList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;
  if (options.type == 'POST') {
    return Mock.mock({
      resultCode: '0',
      resultMsg: '操作成功!',
      resultObject: {
        'list|10': [
          {
            'id|+1': (current - 1) * 10 + 1,
            'status|1': [0, 1],
            disabled: function() {
              return this.status == 0 ? true : false;
            },
            code: function() {
              return Random.string('string', 2) + Random.string('number', 6);
            },
            'resourceName|1': resourceNameMap,
            'productType|1': ['权益', '权益包'],
            'scene|1': sceneMap,
            updateDate: '@datetime("yyyy-MM-dd")',
          },
        ],
        pagination: {
          current: current || 1,
          pageSize: pageSize || 10,
          total: total || '@natural(14,1000)',
        },
      },
    });
  }
});

Mock.mock(/api\/msgPush\/getNotification/, function(options) {
  return Mock.mock({
    resultCode: '0',
    resultMsg: '操作成功!',
    resultData: null,
  });
});

Mock.mock(/api\/sso/, function(options) {
  return Mock.mock({
    resultCode: '0',
    resultMsg: '成功',
    resultObject: {
      currentAuthority: 'admin',
    },
  });
});

Mock.mock(/api\/currentUser/, function(options) {
  return Mock.mock({
    resultCode: '0',
    resultMsg: '成功',
    resultObject: {
      name: 'Mr.Lin',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
    },
  });
});

var map = {
  statusMap: [
    { label: '未提交', value: 1 },
    { label: '处理中', value: 2 },
    { label: '挂起', value: 3 },
    { label: '完成', value: 4 },
    { label: '驳回', value: 5 },
  ],
  typeMap: [{ label: '权益配置', value: 1 }, { label: '资源采购', value: 2 }],
};

var data = [
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

Mock.mock(/myOrder\/map/, function(options) {
  var body = JSON.parse(options.body);
  var obj = {};
  $.each(body, function(i, val) {
    obj[val] = map[val];
  });
  return Mock.mock({
    resultCode: '0',
    resultMsg: '请求正常',
    resultData: obj,
  });
});

Mock.mock(/myOrder\/queryList/, function(options) {
  var body = JSON.parse(options.body);
  var current = body.current;
  var pageSize = body.pageSize;
  var total = body.total;
  var resourceName = body.resourceName;
  var statusType = body.statusType;

  return Mock.mock({
    resultCode: '0',
    resultMsg: '请求正常',
    resultData: {
      list: data,
      pagination: {
        current: current || 1,
        pageSize: pageSize || 10,
        total: data.length,
      },
    },
  });
});

Mock.mock(/myOrder\/orderInfo/, function(options) {
  var body = JSON.parse(options.body);
  var id = body.id;
  var res = {};
  $.each(data, function(i, val) {
    if (val.id == id) {
      res = val;
      return false;
    }
  });
  return Mock.mock({
    resultCode: '0',
    resultMsg: '请求正常',
    resultData: res,
  });
});

Mock.mock(/myOrder\/save/, function(options) {
  return Mock.mock({
    resultCode: '0',
    resultMsg: '请求正常',
    resultData: {
      id: +new Date(),
    },
  });
});

function getUniqueID(prefix) {
  return prefix + '_' + Math.floor(Math.random() * new Date().getTime());
}
Mock.mock(/api\/area/, function(options) {
  return Mock.mock({
    resultCode: '0',
    resultMsg: '操作成功!',
    resultObject: [
      {
        label: '@city()',
        value: getUniqueID('v'),
        fieldname: getUniqueID('p'),
        isLeaf: true,
      },
      {
        label: '@city()',
        value: getUniqueID('v'),
        fieldname: getUniqueID('p'),
      },
    ],
  });
});

var basicGoods = [
  {
    id: '1234561',
    name: '矿泉水 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '1234562',
    name: '凉茶 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '1234563',
    name: '好吃的薯片',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '1234564',
    name: '特别好吃的蛋卷',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

var basicProgress = [
  {
    key: '1',
    time: '2017-10-01 14:10',
    rate: '联系客户',
    status: 'processing',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '2',
    time: '2017-10-01 14:05',
    rate: '取货员出发',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '1h',
  },
  {
    key: '3',
    time: '2017-10-01 13:05',
    rate: '取货员接单',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2017-10-01 13:00',
    rate: '申请审批通过',
    status: 'success',
    operator: '系统',
    cost: '1h',
  },
  {
    key: '5',
    time: '2017-10-01 12:00',
    rate: '发起退货申请',
    status: 'success',
    operator: '用户',
    cost: '5mins',
  },
];

var advancedOperation1 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

var advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

var advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

var getProfileBasicData = {
  resultCode: '0',
  resultMsg: '',
  resultObject: {
    basicGoods,
    basicProgress,
  },
};

var getProfileAdvancedData = {
  resultCode: '0',
  resultMsg: '',
  resultObject: {
    advancedOperation1,
    advancedOperation2,
    advancedOperation3,
  },
};

Mock.mock(/api\/profile\/basic/, function(options) {
  if (options.type == 'GET') {
    return Mock.mock(getProfileBasicData);
  }
});

Mock.mock(/api\/profile\/advanced/, function(options) {
  if (options.type == 'GET') {
    return Mock.mock(getProfileAdvancedData);
  }
});
