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
        <el-form-item>
          <el-button @click="openDialog" type="primary">新增热搜文书</el-button>
        </el-form-item>
        <el-form-item>
          <el-popover placement="top" v-model="deleteVisible" width="160">
            <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button @click="deleteVisible = false" size="mini" type="text">取消</el-button>
                <el-button @click="onDelete" size="mini" type="primary">确定</el-button>
              </div>
            <el-button icon="el-icon-delete" size="mini" slot="reference" type="danger">批量删除</el-button>
          </el-popover>
        </el-form-item>
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
      <el-table-column type="selection" width="55"></el-table-column>
      
      <el-table-column label="标题" prop="title"></el-table-column> 

      <el-table-column label="状态" prop="status"></el-table-column> 

      <el-table-column label="热搜排序" prop="hotSearchSort">
         <template slot-scope="{row,$index}">
            <el-input size="small" v-model="row.hotSearchSort" v-if="showEdit[$index]" placeholder="请输入内容" @change="sortEdit($index, row)"></el-input>
            <span v-if="!showEdit[$index]">{{row.hotSearchSort}}</span>
          </template>
      </el-table-column> 
      
      <el-table-column label="图片" prop="logoImageUrl" width="150">
        <template slot-scope="{row,$index}">
          <div :style="{'textAlign':'center'}">
            <el-upload
              class="upload-demo"
              :action="`http://service.gdzblf.com/fileUploadAndDownload/upload`"
              :on-success="imgFileSuccess"
              :headers="{ 'x-token': token }"
              :multiple="false"
              :show-file-list="false"
               v-if="showEdit[$index]"
              >
              <img v-if="row.logoImageUrl" :src="row.logoImageUrl" height="80" width="80" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <img :src="row.logoImageUrl" height="80" width="80"  v-if="!showEdit[$index]" />
          </div>
        </template>  
      </el-table-column> 

      <el-table-column label="发布日期" prop="releasedTime" width="250"></el-table-column> 
      
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button @click="editBtn(scope.$index, scope.row)" size="small" type="primary" v-if="!showEdit[scope.$index]" >编辑</el-button>
          <el-button @click="updateSort(scope.$index, scope.row)" size="small" type="primary" v-if="showEdit[scope.$index]">确定</el-button>
          <el-button @click="cancelUpdate(scope.$index, scope.row)" size="small" type="warning" v-if="showEdit[scope.$index]">取消</el-button>
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteHotSearch(scope.row)">确定</el-button>
            </div>
            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
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
      <div class="search-term">
        <el-form :inline="true" :model="dialogInfo" class="demo-form-inline">     
          <el-form-item label="搜索">
            <el-input placeholder="搜索" v-model="dialogInfo.keyword"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogOnSubmit" type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <div class="typeRow">
          <span>文书类型</span>
          <el-cascader
            :options="calssOptions"
            :props="props"
            :key="isClassShow"
            v-model="classId"
            @change="classChange"
            filterable
            clearable>
          </el-cascader>
        </div>
      </div>

      <el-table
      :data="dialogData"
      @selection-change="dialogDataChange"
      border
      ref="multipleDialogData"
      stripe
      style="width: 100%"
      tooltip-effect="dark"
      >
        <el-table-column type="selection" :selectable='checkboxT' width="55"></el-table-column>
        
        <el-table-column label="标题" prop="title"></el-table-column> 
        
        <el-table-column label="发布日期" prop="releasedTime"></el-table-column> 
      </el-table>

      <el-pagination
        :current-page="dialogPage"
        :page-size="dialogPageSize"
        :page-sizes="[10, 30, 50, 100]"
        :total="dialogTotal"
        @current-change="dialogCurrentChange"
        @size-change="dialogSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>

      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
    getHotSearchList,
    updateHotSearchSort,
    updateHotSearch,
    deleteHotSearchByIds,
    deleteHotSearch,
    createHotSearch,
    getHotSearchDocPickList
} from "@/api/hotSearch";  //  此处请自行替换地址
import {
    getAllClass,
} from "@/api/documentList";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/data";
import infoList from "@/components/mixins/infoList";
import { mapGetters } from "vuex";

export default {
  name: "documentList",
  mixins: [infoList],
  data() {
    return {
      listApi: getHotSearchList,
      dialogFormVisible: false,
      visible: false,
      deleteVisible: false,
      updateIndex: '',
      multipleSelection: [],
      dialogDataSelection: [],
      dialogTitle: '新增热搜文书',
      formData: {
        id: '',
        title: '',
        releasedTime: '',
        status: '',
        hotSearchSort: ''
      },
      props: { multiple: true },
      calssOptions: [],
      isClassShow: 0,
      dialogData: [],
      dialogPage: 1,
      dialogTotal: 10,
      dialogPageSize: 10,
      showEdit: [], //显示编辑框
      dialogInfo: {},
      classId: [],
      selectClass: []
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
    checkboxT(row,index){
      if(row.isPick){
        return 0
      }else {
        return 1
      }
    },
    imgFileSuccess(res, file) {
      console.log(res)
      this.tableData[this.updateIndex].logoImageUrl = res.data.file.url
    },
    editBtn(index, row) {
      this.updateIndex = index
      this.$set(this.showEdit,index,true)
    },
    sortEdit(index, row) {
      // console.log(row)
    },
    async updateSort(index, row) {
      let updateData = {
        id: row.id,
        logo_image_url: row.logoImageUrl,
        sort: Number(row.hotSearchSort)
      }
      const res = await updateHotSearch(updateData)
      if (res.code == 0) {
        this.$message({
          type:"success",
          message:"更改成功"
        })
        this.updateIndex = ''
        this.$set(this.showEdit,index,false)
        this.getTableData();
      } else {
        this.$message({
          type:"error",
          message:"修改失败"
        })
        this.updateIndex = ''
        this.$set(this.showEdit,index,false)
        this.getTableData();
      }

      
    },

    cancelUpdate(index, row) {
      this.updateIndex = ''
      this.$set(this.showEdit,index,false)
    },
    dialogDataChange(val) {
      this.dialogDataSelection = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 初始化弹窗内表格方法
    initForm() {
      this.checkFlag = false
      this.$refs.listForm.resetFields()
      this.formData = {
        id: '',
        title: '',
        releasedTime: '',
        status: '',
        hotSearchSort: ''
      }
    },
    //条件搜索前端看此方法
    onSubmit() {
      this.page = 1
      this.pageSize = 10                
      this.getTableData()
    },
    async onDelete() {
      const ids = []
      this.multipleSelection &&
        this.multipleSelection.map(item => {
          ids.push(item.id)
        })
      const res = await deleteHotSearchByIds({ ids })
      if (res.code == 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.deleteVisible = false
        this.getTableData()
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      // this.initForm()
    },
    async deleteHotSearch(row) {
      this.visible = false;
      const res = await deleteHotSearch({ id: row.id });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getTableData();
      }
    },
    async enterDialog() {
      const ids = []
      this.dialogDataSelection &&
      this.dialogDataSelection.map(item => {
        ids.push(item.id)
      })
      const res = await createHotSearch({ ids })
      if (res.code == 0) {
        this.$message({
          type:"success",
          message:"创建/更改成功"
        })
        this.closeDialog();
        this.getTableData();
      }  
    },
    async openDialog() {
      await this.getDialogData()
      const classData = await getAllClass();
      if(classData.code == 0) {
        this.calssOptions = classData.data
      }
      
      this.type = "create";
      this.dialogFormVisible = true;
    },
    async getDialogData(page = this.dialogPage, pageSize = this.dialogPageSize, class_id = this.selectClass) {
      if(this.classId) {
        this.selectClass = []
        for(var b=0;b<this.classId.length;b++) {
          for(var c=0;c<this.classId[b].length;c++) {
            if(c == this.classId[b].length-1) {
              this.selectClass.push(this.classId[b][c])
            }
          }
        }
      }

      const documentList = await getHotSearchDocPickList({ page, pageSize, class_id, ...this.dialogInfo })
      this.dialogData = documentList.data.list
      this.dialogTotal = documentList.data.total
      this.dialogPage = documentList.data.page
      this.dialogPageSize = documentList.data.pageSize
    },
    async classChange(e) {
      if(e) {
        this.selectClass = []
        for(var b=0;b<e.length;b++) {
          for(var c=0;c<e[b].length;c++) {
            if(c == e[b].length-1) {
              this.selectClass.push(e[b][c])
            }
          }
        }
      }

      this.dialogPage = 1
      this.dialogPageSize = 10 
      const documentList = await getGenericDocPickList({ page: this.dialogPage, pageSize:this.dialogPageSize, class_id: this.selectClass, ...this.dialogInfo })
      this.dialogData = documentList.data.list
      this.dialogTotal = documentList.data.total
      this.dialogPage = documentList.data.page
      this.dialogPageSize = documentList.data.pageSize
    },  
    dialogSizeChange(val) {
      this.dialogPageSize = val
      this.openDialog()
    },
    dialogCurrentChange(val) {
        this.dialogPage = val
        this.openDialog()
    },
    dialogOnSubmit() {
      this.dialogPage = 1
      this.dialogPageSize = 10                
      this.getDialogData()
    }
  },
  async created() {
    await this.getTableData();
  }
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

.search-term {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-term .demo-form-inline {
  display: inline-block;
  margin-bottom: 0;
}

.search-term .el-form-item {
  margin-bottom: 0 !important;
}

.typeRow {  
  display: inline-block;
  margin-left: 20px;
}

.typeRow span {
  margin-right: 10px;
}
</style>