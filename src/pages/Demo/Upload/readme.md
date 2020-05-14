
- `fileList` 已经上传的文件列表（受控），对象数组。每个对象 必须包含 4个字段：`uid`,`name`,`url`,`thumbUrl`。
  - thumbUrl 预览的缩略图
  - url 大图 , 如果thumbUrl不存在，会以url值当缩略图。
  - 'picture-card'模式： 上传的 __不是图片__，不要给thumbUrl和url的赋值，这样组件会自动用图标替代缩略图，且预览按钮会也置灰。
  - 上传的 __是图片__，但没有给thumbUrl和url的赋值，会以base64当缩略图
- `accept`属性 仿真模式IE9测试无效。常用值 accept=".png,.jpeg,.gif,.bmp,.doc,.docx,.xls,.xlsx,.pdf"
