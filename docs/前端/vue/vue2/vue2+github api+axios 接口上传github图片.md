---
title: vue2+github api+axios 接口上传github图片
createTime: 2025/02/26 14:04:00
tags:
  - vue2
  - git
  - axios
permalink: /article/4x1w0orw/
---
# 前端图片上传到 GitHub 仓库功能文档

## 一、功能概述
可在前端实现通过接口把图片上传到对应 GitHub 仓库。

## 二、创建 Token
访问：https://github.com/settings/tokens ，点击 `Generate new token` 按钮，创建一个新 Token：
1. 设置过期时间，可选择“不会过期”。
2. 勾选 `repo` 所有权限。
3. 点击生成按钮，获取生成的 Token。

## 三、代码实现

### 3.1 创建 github.js
```javascript
import axios from 'axios'
import { Loading, Message } from 'element-ui'

// 设置 axios 请求超时时间为 10000 毫秒
axios.defaults.timeout = 10000

// 响应拦截器，处理响应数据
axios.interceptors.response.use(response => {
  return response
}, (err) => {
  // 返回状态码不为 200 时的错误处理，显示错误消息
  Message.error(err.toString())
  return Promise.reject(err)
})

// 仓库名称
const repo = 'zpfzpf123/images' 
// Token 前半部分
const cutToken = 'ghp_lUbD67XeagTCo' 
// Token 后半部分
const tailToken = 'kcXfLOOXA01XYysbz0hGN73' 

// 上传图片的异步函数
const uploader = async(content, files) => {
  // 启动全屏加载提示
  const loadingInstance = Loading.service({ fullscreen: true, text: '正在上传...' }) 
  try {
    // 构建图片上传的 API URL
    const imageUrl = 'https://api.github.com/repos/' + repo + '/contents/' + files + '.png'
    // 上传请求的主体数据
    const body = { message: 'upload', content }
    // 请求头信息，包含授权信息和接受的数据格式
    const headers = {
      Authorization: `token ${cutToken}${tailToken}`,
      Accept: 'application/vnd.github.v3+json'
    }
    // 发送 PUT 请求上传图片
    await axios.put(imageUrl, body, { headers })
    // 上传成功，关闭加载提示并显示成功消息，返回文件名
    loadingInstance.close()
    Message.success('上传 github 成功！！回显由于网络延迟，显示不出来或显示较缓慢属于正常现象')
    return files + '.png'
  } catch (error) {
    // 上传失败，关闭加载提示并显示错误消息，返回 null
    loadingInstance.close()
    Message.error('上传失败: ' + error.toString())
    return null
  }
}

export default {
  uploader
}
```

### 3.2 Vue 代码
#### 3.2.1 模板部分
```vue
<template>
  <div id="btn-table">
    <!-- 顶部搜索表单 -->
    <el-card class="top">
      <div class="btn">
        <el-form ref="inquire" label-width="80px" :model="inquire" inline>
          <el-form-item label="文章标题" prop="name">
            <el-input v-model="inquire.name_like" />
          </el-form-item>
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="inquire.type" placeholder="请选择文章类型">
              <el-option
                v-for="item of noteTypeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <button class="pan-btn green-btn" @click.prevent="reset">重置</button>
          </el-form-item>
          <el-form-item
            v-if="environment === 'development'"
            style="margin-left: 20px"
          >
            <button class="pan-btn tiffany-btn" @click="addNote">
              新增文章
            </button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 文章列表表格 -->
    <el-card style="margin-top: 20px; width: 100%">
      <div class="table">
        <el-table
          :data="noteList"
          :column="column"
          height="64vh"
          :default-sort="{ prop: 'recommendationIndex', order: 'descending' }"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50"
          />
          <el-table-column
            v-for="item in column"
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            align="center"
          />
          <el-table-column
            width="200px"
            label="推荐指数"
            sortable
            prop="recommendationIndex"
          >
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.recommendationIndex"
                disabled
                show-score
                text-color="#ff9900"
                :max="5"
                :min="1"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="viewInfo(scope.$index, scope.row)"
              >预览
              </el-button>
              <el-button
                v-if="environment === 'development'"
                style="margin-left: 20px"
                type="warning"
                @click="editInfo(scope.$index, scope.row)"
              >修改
              </el-button>
              <el-popconfirm
                style="margin-left: 20px"
                title="确定要删除选择项吗？"
                @onConfirm="delInfo(scope.$index, scope.row)"
              >
                <el-button
                  v-if="environment === 'development'"
                  slot="reference"
                  type="danger"
                >删除文章
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 新增/修改文章对话框 -->
    <el-dialog-com
      :visible="showAddNote"
      :title="status === 0 ? '新增文章' : '修改文章'"
      fullscreen
      @closeDialog="closeAddNote"
    >
      <template v-slot:content>
        <el-form ref="note" :model="note" label-width="120px" :rules="rules">
          <el-form-item label="文章标题" prop="name">
            <el-input v-model="note.name" />
          </el-form-item>
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="note.type" placeholder="请选择文章类型">
              <el-option
                v-for="item of noteTypeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="推荐指数"
            class="postInfo-container-item"
            prop="recommendationIndex"
          >
            <el-rate
              v-model="note.recommendationIndex"
              :max="5"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :low-threshold="1"
              :high-threshold="5"
              style="display: inline-block"
            />
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <v-md-editor
              v-model="note.content"
              :disabled-menus="[]"
              :include-level="[1, 2, 3, 4]"
              height="400px"
              @upload-image="handleUploadImage"
            />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog-com>
    <!-- 文章详情对话框 -->
    <el-dialog-com
      :visible="showDetail"
      title=""
      width="80vw"
      @closeDialog="closeDetail"
    >
      <template v-slot:content>
        <div class="detail">
          <v-md-editor
            v-if="showDetail"
            v-model="articleDetails"
            left-toolbar="fullscreen toc"
            right-toolbar=""
            :include-level="[1, 2, 3]"
            height="70vh"
            @copy-code-success="handleCopyCodeSuccess"
          />
        </div>
      </template>
    </el-dialog-com>
    <!-- 输入图片名称对话框 -->
    <el-dialog
      title="输入图片名称"
      :visible.sync="dialogVisible"
      width="30%"
      @close="decideOnAName"
      @open="focusInput"
    >
      <el-input
        ref="nameInput"
        v-model="imageName"
        placeholder="请输入图片名称"
        @keyup.enter.native="decideOnAName"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="decideOnAName">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
```

#### 3.2.2 脚本部分
```javascript
<script>
import Note from '@/api/note'
import elDialogCom from '@/components/Dialog/el-dialog-com.vue'
import db from '../../../static/db'
import github from '@/request/github'
import { Loading } from 'element-ui'

export default {
  name: 'StudyNote',
  components: {
    elDialogCom
  },
  data() {
    return {
      dialogVisible: false,
      timer: null,
      imageName: '',
      status: 0, // 0 新增，1 修改
      noteList: [],
      initList: [],
      showAddNote: false,
      showDetail: false,
      articleDetails: '',
      noteTypeList: [
        {
          label: 'vue',
          value: 'vue'
        },
        {
          label: 'js',
          value: 'js'
        },
        {
          label: 'css',
          value: 'css'
        },
        {
          label: 'uniapp',
          value: 'uniapp'
        },
        {
          label: 'ai',
          value: 'ai'
        },
        {
          label: 'component',
          value: 'component'
        },
        {
          label: '公司',
          value: '公司'
        },
        {
          label: 'git',
          value: 'git'
        }
      ],
      // 文章信息
      note: {
        name: '',
        type: '',
        recommendationIndex: 0,
        content: ''
      },
      // 查询条件
      inquire: {
        name_like: '',
        type: ''
      },
      // 表单验证规则
      rules: {
        name: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ]
      },
      // 表格列配置
      column: [
        {
          prop: 'name',
          label: '标题'
        },
        {
          prop: 'type',
          label: '类型'
        }
      ]
    }
  },
  computed: {
    // 计算查询条件
    condition() {
      return { name: this.inquire.name_like, type: this.inquire.type }
    },
    // 获取当前环境
    environment() {
      return process.env.NODE_ENV
    }
  },
  watch: {
    // 监听查询条件变化，触发查询文章列表
    condition: {
      handler(val) {
        this.queryTheArticle()
      }
    }
  },
  mounted() {
    // 组件挂载时初始化数据
    this.init()
  },
  methods: {
    // 输入图片名称对话框打开时聚焦输入框
    focusInput() {
      this.$nextTick(() => {
        this.$refs.nameInput.focus()
      })
    },
    // 处理图片上传
    async handleUploadImage(event, insertImage, files) {
      const reader = new FileReader()

      function getBase64(file) {
        return new Promise((resolve) => {
          reader.onload = function(event) {
            const fileContent = event.target.result
            resolve(fileContent.split(',')[1])
          }
          reader.readAsDataURL(file)
        })
      }

      const content = await getBase64(files[0]) 
      try {
        this.dialogVisible = true
        this.timer = setInterval(async() => {
          if (!this.dialogVisible) {
            clearInterval(this.timer)
            var path = await github.uploader(content, this.imageName)
            if (path) {
              // 插入图片到文章内容
              insertImage({
                url: `https://github.com/zpfzpf123/images/blob/master/${path}?raw=true`,
                desc: `${path}`,
                width: 'auto',
                height: 'auto'
              })
              this.imageName = ''
            }
          }
        }, 1000)
      } catch (e) {
        console.log(e,'e')
        this.$message.error(e.message)
        this.imageName = ''
        clearInterval(this.timer)
      }
    },
    // 初始化数据
    init() {
      if (this.environment === 'development') {
        Note.getNote()
          .then((list) => {
            this.noteList = []
            this.noteList.push(...list)
          })
      } else {
        this.noteList = []
        this.noteList.push(...db.note)
        this.initList = []
        this.initList.push(...db.note)
      }
    },
    // 新增文章
    addNote() {
      this.status = 0
      this.showAddNote = true
      this.note = Object.assign(
        {},
        {
          name: '',
          type: '',
          recommendationIndex: 0,
          content: '',
          id: ''
        }
      )
      this.$nextTick(() => {
        this.$refs.note.resetFields()
      })
    },
    // 查询文章列表
    queryTheArticle() {
      const condition = Object.fromEntries(
        Object.entries(this.inquire).filter(
          ([key, value]) => value != null && value !== ''
        )
      )
      if (this.environment === 'development') {
        Note.getNote(condition)
          .then((list) => {
            this.noteList = []
            this.noteList.push(...list)
          })
      } else {
        this.noteList = this.initList.filter((item) => {
          return (
            item.name.includes(this.inquire.name_like) &&
            item.type.includes(this.inquire.type)
          )
        })
      }
    },
    // 重置查询条件
    reset() {
      this.inquire = Object.assign(
        {},
        {
          name_like: '',
          type: ''
        }
      )
    },
    // 关闭新增/修改文章对话框
    closeAddNote() {
      this.showAddNote = false
    },
    // 提交文章表单
    submitForm() {
      this.$refs.note.validate((valid) => {
        if (!valid) {
          return false
        }
        if (!this.note.recommendationIndex) {
          this.$message.warning('请选择推荐指数')
          return false
        }
        if (!this.note.content) {
          this.$message.warning('请填写文章内容')
          return false
        }
        if (this.status === 0) {
          const id = this.noteList.length + 1
          Note.postNote({
            ...this.note,
            id
          }).then((_) => {
            this.$message.success('添加文章成功！')
            this.init()
            this.showAddNote = false
          })
        } else if (this.status === 1) {
          Note.putNote(this.note.id, this.note).then((res) => {
            this.$message.success('修改文章成功！')
            this.init()
            this.showAddNote = false
          })
        }
      })
    },
    // 关闭文章详情对话框
    closeDetail() {
      this.showDetail = false
    },
    // 查看文章详情
    viewInfo(index, val) {
      this.showDetail = true
      this.$nextTick(() => {
        this.articleDetails = val.content
        // 点击目录图标展开目录（假设 v-md-editor 有这样的图标和功能）
        document.querySelector('.v-md-icon-toc').click() 
      })
    },
    // 确定图片名称并关闭对话框
    decideOnAName() {
      this.dialogVisible = false
    },
    // 编辑文章
    editInfo(index, val) {
      this.status = 1
      this.showAddNote = true
      this.$nextTick(() => {
        this.$refs.note.resetFields()
        // 将当前文章数据赋值给编辑表单
        this.note = Object.assign(
          {},
          {
            name: val.name,
            type: val.type,
            recommendationIndex: val.recommendationIndex,
            content: val.content,
            id: val.id
          }
        )
      })
    },
    // 删除文章
    delInfo(index, val) {
      Note.delNote(val.id).then((res) => {
        this.$message.success('删除成功！')
      })
    },
    // 复制代码成功提示
    handleCopyCodeSuccess() {
      this.$message.success('复制成功！')
    }
  }
}
</script>
```

### 3.2.3 样式部分
```scss
<style scoped lang="scss">
#btn-table {
  //width: 100%;
  //height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px;

  .top {
    width: 100%;
    height: 10vh;
  }

  .btn {
    width: 100%;
    flex: 1;
    display: flex;
    column-gap: 20px;
    justify-items: center;
    align-items: center;
  }

  .table {
    width: 100%;
    flex: 6;

    ::v-deep .el-table {
      .el-table__body-wrapper {
        // 滚动条整体部分
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
        &::-webkit-scrollbar-button {
          display: none;
        }

        // 滚动条的轨道（里面装有Thumb）
        &::-webkit-scrollbar-track {
          background: transparent;
        }

        // 滚动条的轨道（里面装有Thumb）
        &::-webkit-scrollbar-track-piece {
          background-color: transparent;
        }

        // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
        &::-webkit-scrollbar-thumb {
          background: #42b983;
          cursor: pointer;
          border-radius: 4px;
        }

        // 边角，即两个滚动条的交汇处
        &::-webkit-scrollbar-corner {
          display: none;
        }

        // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
        &::-webkit-resizer {
          display: none;
        }
      }
    }
  }
}

.el-select {
  width: 100%;
}

.detail {
  // 以下样式用于调整 v-md-editor 在详情页的显示效果
  // 隐藏 v-md-editor 的一些默认样式
  ::v-deep .v-md-textarea-editor {
    display: none;
  }

  ::v-deep .v-md-editor__editor-wrapper {
    display: none;
  }
  // 为滚动区域设置滚动条样式
  ::v-deep .scrollbar{
    overflow-y: auto;
  }
  ::v-deep .v-md-editor__main{
    overflow-y: auto;
  }
  ::v-deep .scrollbar__thumb{
    background: #42b983;
  }
}

.top {
  ::v-deep .el-card__body {
    padding: 0 !important;
    height: 100%;

    .btn {
      height: 100%;
      display: flex;
      align-items: center;

      .el-form {
        height: 100%;
        padding: 10px;

        .el-form-item {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
```

## 四、属性说明
| 所属部分 | 属性名 | 类型 | 描述 |
| ---- | ---- | ---- | ---- |
| github.js | repo | String | 目标 GitHub 仓库名称，用于构建上传图片的 API URL |
| github.js | cutToken | String | GitHub Token 的前半部分，用于授权请求 |
| github.js | tailToken | String | GitHub Token 的后半部分，与 cutToken 拼接完成授权信息 |
| github.js | uploader | Function | 用于上传图片到 GitHub 仓库的异步函数 |
| Vue 组件 | dialogVisible | Boolean | 控制输入图片名称对话框的显示与隐藏 |
| Vue 组件 | timer | Number | 定时器 ID，用于在图片上传时的定时操作 |
| Vue 组件 | imageName | String | 输入的图片名称，用于上传图片时命名 |
| Vue 组件 | status | Number | 表示当前操作状态，0 为新增文章，1 为修改文章 |
| Vue 组件 | noteList | Array | 文章列表数据，用于展示文章列表 |
| Vue 组件 | initList | Array | 初始文章列表数据，用于开发环境与生产环境的数据处理 |
| Vue 组件 | showAddNote | Boolean | 控制新增/修改文章对话框的显示与隐藏 |
| Vue 组件 | showDetail | Boolean | 控制文章详情对话框的显示与隐藏 |
| Vue 组件 | articleDetails | String | 文章详情内容，用于展示文章详情 |
| Vue 组件 | noteTypeList | Array | 文章类型列表数据，用于选择文章类型 |
| Vue 组件 | note | Object | 当前操作的文章对象，包含文章的各项信息 |
| Vue 组件 | inquire | Object | 查询文章列表的条件对象，包含文章标题和类型的查询条件 |
| Vue 组件 | rules | Object | 文章表单的验证规则对象 |
| Vue 组件 | column | Array | 文章列表表格的列配置对象数组 |
| Vue 组件 | condition | Computed | 计算属性，返回当前查询条件对象 |
| Vue 组件 | environment | Computed | 计算属性，返回当前运行环境（development 或 production） |

## 五、方法说明
| 所属部分 | 方法名 | 参数 | 返回值 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| github.js | uploader | content（图片内容，base64 格式字符串）, files（图片名称） | Promise | 上传图片到 GitHub 仓库的异步函数，成功返回图片文件名，失败返回 null |
| Vue 组件 | focusInput | 无 | 无 | 输入图片名称对话框打开时，聚焦输入框 |
| Vue 组件 | handleUploadImage | event（事件对象）, insertImage（插入图片的函数）, files（文件对象数组） | 无 | 处理图片上传操作，将图片转换为 base64 格式后调用 github.uploader 上传，并插入到文章内容中 |
| Vue 组件 | init | 无 | 无 | 组件挂载时初始化数据，根据环境从接口或本地获取文章列表数据 |
| Vue 组件 | addNote | 无 | 无 | 新增文章操作，初始化文章对象并显示新增文章对话框 |
| Vue 组件 | queryTheArticle | 无 | 无 | 根据查询条件查询文章列表数据，开发环境从接口获取，生产环境从本地数据筛选 |
| Vue 组件 | reset | 无 | 无 | 重置查询条件对象，清空文章标题和类型的查询条件 |
| Vue 组件 | closeAddNote | 无 | 无 | 关闭新增/修改文章对话框 |
| Vue 组件 | submitForm | 无 | 无 | 提交文章表单，根据当前状态（新增或修改）调用相应接口保存文章数据 |
| Vue 组件 | closeDetail | 无 | 无 | 关闭文章详情对话框 |
| Vue 组件 | viewInfo | index（文章列表索引）, val（文章对象） | 无 | 查看文章详情，显示文章详情对话框并填充文章内容 |
| Vue 组件 | decideOnAName | 无 | 无 | 确定图片名称并关闭输入图片名称对话框 |
| Vue 组件 | editInfo | index（文章列表索引）, val（文章对象） | 无 | 编辑文章，设置当前操作状态为修改，填充文章数据到编辑表单并显示对话框 |
| Vue 组件 | delInfo | index（文章列表索引）, val（文章对象） | 无 | 删除文章，调用接口删除指定文章并提示删除成功 |
| Vue 组件 | handleCopyCodeSuccess | 无 | 无 | 复制代码成功时的提示方法，显示复制成功消息 |

## 六、注意事项
如果接口总是上传失败或者图片不回显，需要修改一下本地host配置，如下：
```
# GitHub Start 
20.205.243.166      github.com
185.199.108.133     raw.githubusercontent.com
# GitHub End
```
这样配置的目的是将 GitHub 相关域名正确解析到对应的 IP 地址，解决可能出现的网络连接问题，确保图片上传功能正常运行以及图片能正确回显。 