
对Upload的二次封装。

新增`length`和`size`，分别用于附件个数和大小的校验
增强`accept`，根据配置值，内部自动校验附件格式
当`listType="picture-card"`时，自动开启查看大图的功能
其余[props](https://ant.design/components/upload-cn/#API)与 antd upload一致

注：回参格式约定，必须包含`url`，如果是图片建议返回`thumbUrl`

```json
{
  "resultCode":"0",
  "resultMsg":"成功",
  "resultData":{
    "url":"",
    "thumbUrl":"",
    ...
  },
}
```

## API

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| action | 必填项，上传的地址 | string | - |
| fileList | 已经上传的文件列表（受控） | object[] | [] |
| length | 允许上传的附件个数 | number | 999(表示不限制) |
| size | 允许单个附件的最大size，单位字节。1 * 1014 * 1024 = 1MB | number | 1024*1024*1024(1GB) |
| accept | 允许的附件个数,默认不限制格式。可选值：accept = 'image/png, image/jpeg, image/gif, image/bmp, .doc,.docx,.xls,.xlsx,.pdf' | string | - |
| disabled | 禁用上传，删除动作 | boolean | false |
| onRemove | 必填项，点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。  | Function(file): boolean | Promise | false |

更多[props](https://ant.design/components/upload-cn/#API)

## 方法

getFileList  

通过`this.refs.xxx`可以取到`getFileList()`，返回一个包含当前所有附件信息的数组 

## demo

```jsx
{/* 普通的 */}
<SlickUpload
  action="/upload-single"
  onRemove={file => {
    return request('/api/delete', { data: file })
  }}
/>
```

```jsx
{/* 带默认附件，限制格式、大小和个数 */}
<SlickUpload
  action="/upload-single"
  fileList={[
    {
      uid: '10086',  // 4个字段都是约定key
      name: 'xxx.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'  
    }
  ]}
  accept=".jpg,.png,.gif"
  size={1024*1024*2}
  length={3}
  onRemove={file => {
    return request('/api/delete', { data: file })
  }}
/>
```
