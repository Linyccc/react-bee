## 并行

同时发6个请求

```javascript
    *getInitData(_, { call, put, select }) {
      try {
        const [response1, response2, response3, response4, response5, response6] = yield [
          call(getAllMenu),
          call(getRecentMenuInfo),
          call(getSysCodeBySysNbr, { sysNbr: 'APP0' }), // appSysCode
          call(getSysCodeBySysNbr, { sysNbr: 'RWGL' }), // taskSysCode
          call(selectMenuByLetter), // 按首字母获取当前用户权限菜单列表（叶子菜单）
          call(getCollectionMenu), // 收藏夹菜单
        ];
      } catch (e) {
        // 获取初始数据失败
        router.push('/500');
      }
    },
```

## 串行

按顺序发4个请求，下一个请求的入参是上一个的回参

```javascript
    *getInitData(_, { call, put, select }) {
      try {
        const resp1 = yield call(queryLeaf1, payload);
        const resp2 = yield call(queryLeaf2, { name: resp1.resultObject[0] });
        const resp3 = yield call(queryLeaf3, { name: resp2.resultObject[0] });
        const resp4 = yield call(queryLeaf4, { name: resp3.resultObject[0] });
        yield put({
          type: 'saveMenu',
          payload: [
            ...resp1.resultObject,
            ...resp2.resultObject,
            ...resp3.resultObject,
            ...resp4.resultObject,
          ],
        });
      } catch (e) {
        // 获取初始数据失败
        router.push('/500');
      }
    },
```

## 并行+串行

两条并行线，其中一条包含2个串行请求

models

```javascript
 *getInitData(_, { call, put, select }) {
      try {
       const [resp, resp3, resp4] = yield [
          call(queryMenuInSeries, payload),
          call(queryLeaf3, payload),
          call(queryLeaf4, payload),
        ];
      } catch (e) {
        // 获取初始数据失败
        router.push('/500');
      }
    },        
```

services

```javascript
export async function queryMenuInSeries(params) {
  const res1 = await request('/demo/leaf1', { data: params });
  const res2 = await request('/demo/leaf2', { data: { arr: res1.resultObject[0] } });
  return { ...res2, resultObject: [...res1.resultObject, ...res2.resultObject] };
}
```
