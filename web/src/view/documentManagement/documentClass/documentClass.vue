<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline"> 
        <el-form-item label="关键词">
          <el-input placeholder="关键词" v-model="searchInfo.keyword"></el-input>
        </el-form-item>       
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addMenu('0')" type="primary">新增文书分类</el-button>
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
    <el-table :data="tableData" @selection-change="handleSelectionChange" row-key="id" border stripe style="width: 100%" tooltip-effect="dark">

      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="id" width="120" prop="id"></el-table-column>
      
      <el-table-column label="分类名称" prop="title" min-width="120"></el-table-column> 
      
      <!-- <el-table-column label="父分类ID" prop="parentId" width="120"></el-table-column>  -->
      
      <!-- <el-table-column label="分类等级" prop="categoryLevel" width="120"></el-table-column>  -->

      <el-table-column label="状态" prop="hidden" width="120">
        <template slot-scope="scope">
          <el-tag type="success" class="el-tag--light" v-if="scope.row.hidden == 0">正常</el-tag>
          <el-tag type="danger" class="el-tag--light" v-if="scope.row.hidden == 1">禁用</el-tag>
        </template>    
      </el-table-column> 
      
      <el-table-column label="排序" prop="sort" width="120"></el-table-column> 

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="addMenu(scope.row.id)" size="small" type="primary" icon="el-icon-edit">添加子分类</el-button>
          <el-button @click="editMenu(scope.row.id)" size="small" type="primary" icon="el-icon-edit" >编辑</el-button>
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteDocumentClass(scope.row)">确定</el-button>
            </div>
            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
          </el-popover>
          <el-button @click="bindMenu(scope.row.id)" size="small" type="success" icon="el-icon-document-add" >绑定文书</el-button>
          <el-button @click="unbindMenu(scope.row.id)" size="small" type="warning" icon="el-icon-document-remove" >解绑文书</el-button>
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

    <!-- 新增/编辑 弹窗 start -->
    <el-dialog :before-close="closeDialog" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        :inline="true"
        :model="formData"
        :rules="rules"
        label-position="top"
        label-width="85px"
        ref="menuForm"
      >
        <el-form-item label="父节点Id" style="width:45%">
          <el-cascader
            :disabled="!this.isEdit"
            :options="menuOption"
            :props="{ checkStrictly: true,label:'title',value:'id',disabled:'disabled',emitPath:false}"
            :show-all-levels="false"
            filterable
            v-model="formData.parentId"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="分类名称" prop="title" style="width:45%">
          <el-input autocomplete="off" v-model="formData.title"></el-input>
        </el-form-item>

        <el-form-item label="是否隐藏" style="width:45%">
          <el-select placeholder="是否在列表隐藏" v-model="formData.hidden">
            <el-option :value="0" label="否"></el-option>
            <el-option :value="1" label="是"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序标记" prop="sort" style="width:45%">
          <el-input autocomplete="off" v-model.number="formData.sort"></el-input>
        </el-form-item>

      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增/编辑 弹窗 end -->


    <!-- 文书绑定/解绑 弹窗 start -->
    <el-dialog :before-close="closeBindDialog" :title="dialogTitle" :visible.sync="dialogShow">
      <div class="search-term">
        <el-form :inline="true" class="demo-form-inline" > 
          <el-form-item label="关键词" v-if="isBind">
            <el-input placeholder="关键词" v-model="keyword"></el-input>
          </el-form-item>       
          <el-form-item v-if="isBind">
            <el-button @click="searchSubmit" type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="bindSubmit()" v-if="isBind" type="primary">批量绑定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="unbindSubmit()" v-if="!isBind" type="danger">批量解绑</el-button>
          </el-form-item>
        </el-form>
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
        <el-table-column type="selection" width="55" :selectable="canSelect"></el-table-column>
        
        <el-table-column label="标题" prop="title"></el-table-column> 

        <el-table-column label="分类" prop="categoriesName">
        <template slot-scope="scope">
          <el-tag class="el-tag--light" :key="index" v-for="(role, index) in scope.row.categoriesName">{{ role }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="类型" prop="classesName">
        <template slot-scope="scope">
          <el-tag class="el-tag--light" :key="index" v-for="(role, index) in scope.row.classesName">{{ role }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态" prop="pickStatus" width="120">
        <template slot-scope="scope">
          <el-tag type="success" class="el-tag--light" v-if="scope.row.pickStatus == 0">未绑定</el-tag>
          <el-tag type="danger" class="el-tag--light" v-if="scope.row.pickStatus == 1">已绑定</el-tag>
        </template>    
      </el-table-column> 

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

      <!-- <div class="dialog-footer" slot="footer">
        <el-button @click="closeBindDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div> -->
    </el-dialog>
    <!-- 文书绑定/解绑弹窗 end -->
  </div>
</template>

<script>
import {
    createDocumentClass,
    deleteDocumentClass,
    deleteDocumentClassByIds,
    updateDocumentClass,
    findDocumentClass,
    getDocumentClassList,
    getDocumentByPickList,
    classBindDocument,
    getClassBoundList,
    classUnbindDocument
} from "@/api/documentClass";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/data";
import infoList from "@/components/mixins/infoList";

export default {
  name: "documentCategory",
  mixins: [infoList],
  data() {
    return {
      listApi: getDocumentClassList,
      dialogFormVisible: false,
      dialogShow: false,
      visible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        id: 0,
        title:'',
        parentId: '',
        hidden: 0,
        sort: '',
      },
      isEdit: false,
      rules: {
        title: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      dialogTitle: '新增文书分类',
      menuOption: [
        {
          id: '0',
          title: '根目录'
        }
      ],
      dialogDataSelection: [],
      isBind: true,
      classId: '',
      keyword: '',
      dialogData: [],
      dialogPage: 1,
      dialogTotal: 10,
      dialogPageSize: 10,
    };
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
  methods: {
    // 初始化弹窗内表格方法
    initForm() {
      this.checkFlag = false
      this.$refs.menuForm.resetFields()
      this.formData = {
        id: 0,
        hidden: 0,
        parentId: '',
        title: '',
        sort: '',
      }
    },
    setOptions() {
      this.menuOption = [
        {
          id: '0',
          title: '根目录'
        }
      ]
      this.setMenuOptions(this.tableData, this.menuOption, false)
    },
    setMenuOptions(menuData, optionsData, disabled) {
      menuData &&
        menuData.map(item => {
          if (item.children && item.children.length) {
            const option = {
              title: item.title,
              id: item.id,
              disabled: disabled || item.id == this.formData.id,
              children: []
            }
            this.setMenuOptions(
              item.children,
              option.children,
              disabled || item.id == this.formData.id
            )
            optionsData.push(option)
          } else {
            const option = {
              title: item.title,
              id: item.id,
              disabled: disabled || item.id == this.formData.id
            }
            optionsData.push(option)
          }
        })
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
      const res = await deleteDocumentClassByIds({ ids })
      if (res.code == 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.deleteVisible = false
        this.getTableData()
      }
    },
    async updateDocumentClass(row) {
      const res = await findDocumentClass({ id: row.id });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.redocCategory;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.initForm()
    },
    closeBindDialog() {
      this.dialogShow = false;
    },
    async deleteDocumentClass(row) {
      this.visible = false;
      const res = await deleteDocumentClass({ id: row.id });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getTableData();
      }
    },
    async enterDialog() {
      this.$refs.menuForm.validate(async valid => {
        if (valid) {
          let res;
          switch (this.type) {
            case "create":
              res = await createDocumentClass(this.formData);
              break;
            case "update":
              res = await updateDocumentClass(this.formData);
              break;
          }
          if (res.code == 0) {
            this.$message({
              type:"success",
              message: this.isEdit ? '编辑成功' : '添加成功!'
            })
            this.getTableData();
             this.initForm()
            this.dialogFormVisible = false
          }
        }
      })
    },
    addMenu(id) {
      this.dialogTitle = '新增菜单'
      this.formData.parentId = id
      this.isEdit = false
      this.setOptions()
      this.type = "create";
      this.dialogFormVisible = true
    },
    async editMenu(id) {
      this.dialogTitle = '编辑菜单'
      const res = await findDocumentClass({ id })
      this.formData = res.data.docClass
      this.isEdit = false
      this.setOptions()
      this.type = "update";
      this.dialogFormVisible = true
    },
    async bindMenu(id) {
      this.dialogTitle = '绑定文书'
      this.classId = id
      this.dialogData = []
      this.dialogPage = 1
      this.dialogTotal = 10
      this.dialogPageSize = 10
      this.isBind = true
      await this.getDialogData(this.classId)
      this.dialogShow = true
    },
    async unbindMenu(id) {
      this.dialogTitle = '解绑文书'
      this.classId = id
      this.dialogData = []
      this.dialogPage = 1
      this.dialogTotal = 10
      this.dialogPageSize = 10
      this.isBind = false
      await this.getDialogData(this.classId)
      this.dialogShow = true
    },
    async getDialogData(id, page = this.dialogPage, pageSize = this.dialogPageSize, keyword = this.keyword) {
      let pick_class_id = id
      let documentList = ''
      if(this.isBind) {
        documentList = await getDocumentByPickList({ pick_class_id, page, pageSize, keyword })
      } else {
        documentList = await getClassBoundList({ pick_class_id, page, pageSize, keyword })
      }
      
      this.dialogData = documentList.data.list
      this.dialogTotal = documentList.data.total
      this.dialogPage = documentList.data.page
      this.dialogPageSize = documentList.data.pageSize
    },
    dialogDataChange(val) {
      this.dialogDataSelection = val
    },
    dialogSizeChange(val) {
      this.dialogPageSize = val
      this.getDialogData(this.classId)
    },
    dialogCurrentChange(val) {
        this.dialogPage = val
        this.getDialogData(this.classId)
    },
    async bindSubmit() {
      const ids = []
      this.dialogDataSelection &&
      this.dialogDataSelection.map(item => {
        ids.push(item.id)
      })
      let class_id = this.classId
      const res = await classBindDocument({ class_id, ids })
      if (res.code == 0) {
        this.$message({
          type:"success",
          message:"绑定成功"
        })
        // this.closeBindDialog();
        this.getDialogData(this.classId);
      }  
    },
    async unbindSubmit() {
      const ids = []
      this.dialogDataSelection &&
      this.dialogDataSelection.map(item => {
        ids.push(item.id)
      })
      let class_id = this.classId
      const res = await classUnbindDocument({ class_id, ids })
      if (res.code == 0) {
        this.$message({
          type:"success",
          message:"解绑成功"
        })
        // this.closeBindDialog();
        this.getDialogData(this.classId);
      }  
    },
    searchSubmit() {
      this.pageSize = 1
      this.dialogPageSize = 10        
      this.getDialogData(this.classId)
    },
    canSelect(row) {
      if(this.isBind) {
        if(row.pickStatus) {
          return false
        }else {
          return true
        }
      } else {
        if(row.pickStatus) {
           return true
        }else {
          return false
        }
      }
    },
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