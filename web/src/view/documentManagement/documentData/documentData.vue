<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">     
        <el-form-item label="搜索">
          <el-input placeholder="搜索" v-model="searchInfo.keyword"></el-input>
        </el-form-item>                 
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button @click="openDialog" type="primary">新增文书</el-button>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-popover placement="top" v-model="deleteVisible" width="160">
            <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button @click="deleteVisible = false" size="mini" type="text">取消</el-button>
                <el-button @click="onDelete" size="mini" type="primary">确定</el-button>
              </div>
            <el-button icon="el-icon-delete" size="mini" slot="reference" type="danger">批量删除</el-button>
          </el-popover>
        </el-form-item> -->
      </el-form>
    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      ref="multipleTable"
      stripe
      style="width: 100%"
      tooltip-effect="dark"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <!-- <el-table-column label="日期" width="180">
          <template slot-scope="scope">{{scope.row.CreatedAt|formatDate}}</template>
      </el-table-column> -->
      
      <el-table-column label="标题" prop="title"></el-table-column> 
      
      <!-- <el-table-column label="内容" prop="content" width="120"></el-table-column>  -->

      <!-- <el-table-column label="分类" prop="categoriesName">
        <template slot-scope="scope">
          <el-tag class="el-tag--light" :key="role" v-for="role in scope.row.categoriesName">{{ role }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="关键词" prop="keywords">
        <template slot-scope="scope">
          <el-tag type="success" class="el-tag--light" :key="index" v-for="(role, index) in scope.row.keywords">{{ role }}</el-tag>
        </template>
      </el-table-column> -->
      
      <el-table-column label="浏览量" prop="browseNum"></el-table-column> 
      
      <el-table-column label="下载量" prop="downloadNum"></el-table-column> 
      
      <el-table-column label="虚拟浏览量" prop="browseVirtualNum"></el-table-column> 
      
      <el-table-column label="虚拟下载量" prop="downloadVirtualNum"></el-table-column> 
      
      <el-table-column label="收藏数量" prop="collectionNum"></el-table-column> 
      
      <el-table-column label="分享数量" prop="shareNum"></el-table-column> 
      
      <el-table-column label="发布日期" prop="releasedTime"></el-table-column> 
      
      <el-table-column label="最后修改日期" prop="revisedTime"></el-table-column> 
      
      <!-- <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button @click="updateDocument(scope.row)" size="small" type="primary">变更</el-button>
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteDocument(scope.row)">确定</el-button>
            </div>
            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
          </el-popover>
        </template>
      </el-table-column> -->
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 30, 50, 100]"
      :style="{float:'right',padding:'20px'}"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog :before-close="closeDialog" :title="dialogTitle" :visible.sync="dialogFormVisible">
      
      <el-form
        :inline="true"
        :model="formData"
        :rules="rules"
        label-position="top"
        label-width="85px"
        ref="listForm"
      >
        <el-form-item label="标题" prop="title" style="width:90%">
          <el-input autocomplete="off" v-model="formData.title"></el-input>
        </el-form-item>

        <el-form-item label="搜索" prop="keywordsArr" style="width:90%">
          <div v-for="(item,index) in keywordsArr" :key="index" class="spanbox">
            <span>{{item}}</span>
            <i class="spanclose" @click="removeitem(index,item)"></i>
          </div>
          <el-input autocomplete="off" @keyup.enter.native="addlabel" v-model="keywords"></el-input>
        </el-form-item>

        <el-form-item label="分类" prop="classId" style="width:90%">
          <el-cascader
            :options="options"
            :props="props"
            :key="isResouceShow"
            v-model="formData.classId"
            clearable>
          </el-cascader>
        </el-form-item>

        <el-form-item label="word下载地址" prop="wordFileUrl" style="width:45%">
          <el-upload
            class="upload-demo"
            :action="`http://service.gdzblf.com/fileUploadAndDownload/upload`"
            :on-success="wordFileSuccess"
            :headers="{ 'x-token': token }"
            :multiple="false"
            :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-input autocomplete="off" v-model="formData.wordFileUrl"></el-input>
        </el-form-item>

        <el-form-item label="pdf下载地址" prop="pdfFileUrl" style="width:45%">
          <el-upload
            class="upload-demo"
            :action="`http://service.gdzblf.com/fileUploadAndDownload/upload`"
            :on-success="pdfFileSuccess"
            :headers="{ 'x-token': token }"
            :multiple="false"
            :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-input autocomplete="off" v-model="formData.pdfFileUrl"></el-input>
        </el-form-item>

        <el-form-item label="虚拟浏览量" prop="browseVirtualNum" style="width:45%">
          <el-input autocomplete="off" v-model.number="formData.browseVirtualNum"></el-input>
        </el-form-item>

        <el-form-item label="虚拟下载量" prop="downloadVirtualNum" style="width:45%">
          <el-input autocomplete="off" v-model.number="formData.downloadVirtualNum"></el-input>
        </el-form-item>

        <!-- <el-form-item label="富文本" prop="content" style="width:100%">
          <quill-editor
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @change="onEditorChange($event)"
              @focus="onEditorFocus($event)"
              ref="myQuillEditor"
              v-model="formData.content"
          ></quill-editor>
        </el-form-item> -->
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
    createDocument,
    deleteDocument,
    deleteDocumentByIds,
    updateDocument,
    findDocument,
    findDocumentClass,
    getAllCategory,
    getDocumentList
} from "@/api/documentList";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/data";
import infoList from "@/components/mixins/infoList";
import { mapGetters } from "vuex";

export default {
  name: "documentList",
  mixins: [infoList],
  data() {
    return {
      listApi: getDocumentList,
      dialogFormVisible: false,
      visible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      dialogTitle: '新增文书',
      fileList: [],
      props: { multiple: true },
      isResouceShow: 0,
      options: [],
      formData: {
        classId: [],
        title:'',
        docKeyword: [],
        wordFileUrl: '',
        pdfFileUrl: '',
        browseVirtualNum: 0,
        downloadVirtualNum: 0,
        categoriesName: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        wordFileUrl: [{ required: true, message: '请上传word文档下载地址', trigger: 'blur' }],
        pdfFileUrl: [{ required: true, message: '请上传pdf文档下载地址', trigger: 'blur' }],
        browseVirtualNum: [{ required: true, message: '请输入虚拟浏览量', trigger: 'blur' }],
        downloadVirtualNum: [{ required: true, message: '请输入虚拟下载量', trigger: 'blur' }],
        // content: [{ required: true, message: '请输入文书内容', trigger: 'blur' }],
      },
      keywords: '',
      keywordsArr: [],
      editorOption: {},
    }
  },
  filters: {
    formatDate: function(time) {
      if (time != null && time != "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "";
      }
    },
    formatBoolean: function(bool) {
      if (bool != null) {
        return bool ? "是" :"否";
      } else {
        return "";
      }
    }
  },
  computed: {
    ...mapGetters("user", ["token"]),
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
      onEditorBlur() {}, // 失去焦点事件
      onEditorFocus() {}, // 获得焦点事件
      onEditorChange() {}, // 内容改变事件
      // 移除标签
      removeitem(index, item) {
        this.keywordsArr.splice(index, 1)
      },
      // input回车加入labelarr中
      addlabel(e) {
        let count = this.keywordsArr.indexOf(this.keywords)
        if (count === -1) {
          this.keywordsArr.push(this.keywords)
        } else {
          this.$message({
            message: '“' + this.keywords + '” 已存在',
            type: 'warning'
          });
        }
        this.keywords = ''
      },
      wordFileSuccess(res, file) {
        this.formData.wordFileUrl = res.data.file.url
      },
      pdfFileSuccess(res, file) {
        this.formData.pdfFileUrl = res.data.file.url
      },
      classChange(e) {
        //暂时废用
        let classArr = []
        for(var i=0;i<e.length;i++) {
          for(var a=0;a<e[i].length;a++) {
            if(a==e[i].length-1) {
              classArr.push(e[i][e[i].length-1])
              // console.log(e[i][e[i].length-1])
            }
          }
        }
        this.formData.classId = classArr
      },
      // 初始化弹窗内表格方法
      initForm() {
        this.checkFlag = false
        this.$refs.listForm.resetFields()
        this.formData = {
          classId: [],
          title:'',
          docKeyword: [],
          wordFileUrl: '',
          pdfFileUrl: '',
          browseVirtualNum: 0,
          downloadVirtualNum: 0,
          categoriesName: '',
          content: ''
        }
      },
      //条件搜索前端看此方法
      onSubmit() {
        this.page = 1
        this.pageSize = 10                
        this.getTableData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      async onDelete() {
        const ids = []
        this.multipleSelection &&
          this.multipleSelection.map(item => {
            ids.push(item.id)
          })
        const res = await deleteDocumentByIds({ ids })
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.deleteVisible = false
          this.getTableData()
        }
      },
    async updateDocument(row) {
      this.dialogTitle = '编辑文书'
      this.options = []
      ++this.isResouceShow
      const res = await findDocument({ id: row.id });
      const resClass = await findDocumentClass({ id: row.id });
      this.type = "update";
      
      if(resClass.code == 0) {
        this.options = resClass.data
        this.dialogFormVisible = true;
      }

      if (res.code == 0) {
        this.formData = res.data.doc;
        if(res.data.doc.keywords) {
          this.keywordsArr = res.data.doc.keywords
        }
        
        // this.dialogFormVisible = true;
      } 
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.initForm()
    },
    async deleteDocument(row) {
      this.visible = false;
      const res = await deleteDocument({ id: row.id });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getTableData();
      }
    },
    async enterDialog() {
      this.formData.docKeyword = this.keywordsArr
      this.$refs.listForm.validate(async valid => {
        if (valid) {
          let res;
          switch (this.type) {
            case "create":
              let addClassArr = []
              for(var i=0;i<this.formData.classId.length;i++) {
                for(var a=0;a<this.formData.classId[i].length;a++) {
                  if(a==this.formData.classId[i].length-1) {
                    addClassArr.push(this.formData.classId[i][this.formData.classId[i].length-1])
                  }
                }
              }
              this.formData.classId = addClassArr
              res = await createDocument(this.formData);
              break;
            case "update":
              let classArr = []
              for(var i=0;i<this.formData.classId.length;i++) {
                for(var a=0;a<this.formData.classId[i].length;a++) {
                  if(a==this.formData.classId[i].length-1) {
                    classArr.push(this.formData.classId[i][this.formData.classId[i].length-1])
                  }
                }
              }
              this.formData.classId = classArr
              res = await updateDocument(this.formData);
              break;
            default:
              res = await createDocument(this.formData);
              break;
          }
          if (res.code == 0) {
            this.$message({
              type:"success",
              message:"创建/更改成功"
            })
            this.closeDialog();
            this.getTableData();
          }  
        }
      })
    },
    async openDialog() {
      const categoryData = await getAllCategory();
      if(categoryData.code == 0) {
        this.options = categoryData.data
      }
      this.keywordsArr = []
      this.type = "create";

      this.dialogFormVisible = true;
    }
  },
  async created() {
    await this.getTableData();}
};
</script>

<style>
.el-tag--light {
  margin: 10px 5px;
}
.spanbox {
  line-height: 30px;
  margin: 2px;
  padding: 0 10px;
  background-color: #1abc9c;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  transition: 0.25s linear;
}

.spanbox:hover {
  padding: 0px 17px 0 3px;
}

.spanclose {
  color: white;
  padding: 0 10px 0 0;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  right: -3px;
  text-align: right;
  text-decoration: none;
  top: 0;
  width: 100%;
  bottom: 0;
  z-index: 2;
  opacity: 0;
  filter: "alpha(opacity=0)";
  transition: opacity 0.25s linear;
  font-style: normal;
}

.spanbox:hover .spanclose {
  padding: 0 10px 5px 0;
  opacity: 1;
  -webkit-filter: none;
  filter: none;
}

.spanclose:after {
  content: "x";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 27px;
}
</style>