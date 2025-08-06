# NoMash Library - Vue.js + Firebase CRUD Application

## 功能特性

### 1. 添加书籍 (Create)
- 通过表单添加新书籍
- 验证ISBN格式
- 实时保存到Firestore数据库

### 2. 查看书籍列表 (Read)
- 显示ISBN大于1000的书籍
- 使用Firestore查询过滤数据
- 响应式数据更新

### 3. 更新书籍 (Update)
- 点击"Edit"按钮进入编辑模式
- 内联编辑表单
- 实时更新Firestore数据

### 4. 删除书籍 (Delete)
- 点击"Delete"按钮删除书籍
- 删除确认对话框
- 从Firestore和本地状态中移除

## 截图说明

### 浏览器截图应该包含：

1. **添加书籍页面**：
   - 显示添加书籍表单
   - 下方显示书籍列表
   - 每个书籍项目有Edit和Delete按钮

2. **编辑模式**：
   - 点击Edit后显示输入框
   - Save和Cancel按钮
   - 表单验证提示

3. **删除确认**：
   - 删除确认对话框
   - 成功删除后的提示

### Visual Studio Code截图应该包含：

1. **BookList.vue组件**：
   - 显示完整的CRUD功能代码
   - 高亮显示updateDoc和deleteDoc函数
   - 显示Firestore导入语句

2. **Firebase控制台**：
   - 显示books集合
   - 显示数据更新和删除操作
   - 实时数据同步

## 技术栈

- **前端**: Vue.js 3 + Composition API
- **数据库**: Firebase Firestore
- **样式**: CSS3 + 响应式设计
- **路由**: Vue Router

## 安装和运行

```bash
npm install
npm run dev
```

## 主要文件结构

```
src/
├── components/
│   └── BookList.vue          # 书籍列表组件（CRUD功能）
├── views/
│   └── AddBookView.vue       # 添加书籍页面
├── firebase/
│   └── init.js              # Firebase配置
└── router/
    └── index.js             # 路由配置
```

## CRUD操作演示

### 创建 (Create)
1. 访问 `/addbook` 页面
2. 填写书籍名称和ISBN
3. 点击"Add Book"按钮
4. 书籍将保存到Firestore并显示在列表中

### 读取 (Read)
1. 页面自动加载ISBN > 1000的书籍
2. 使用Firestore查询：`where('isbn', '>', 1000)`
3. 实时显示书籍信息

### 更新 (Update)
1. 点击书籍项目旁的"Edit"按钮
2. 修改书籍名称或ISBN
3. 点击"Save"保存更改
4. 数据将更新到Firestore

### 删除 (Delete)
1. 点击书籍项目旁的"Delete"按钮
2. 确认删除操作
3. 书籍将从Firestore和列表中移除

## 数据库操作

### Firestore操作示例：

```javascript
// 创建文档
await addDoc(collection(db, 'books'), {
  isbn: isbnNumber,
  name: name.value
})

// 查询文档
const q = query(collection(db, 'books'), where('isbn', '>', 1000))
const querySnapshot = await getDocs(q)

// 更新文档
await updateDoc(doc(db, 'books', bookId), {
  name: newName,
  isbn: newIsbn
})

// 删除文档
await deleteDoc(doc(db, 'books', bookId))
```
