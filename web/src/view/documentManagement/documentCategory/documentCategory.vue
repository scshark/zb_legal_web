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
    <el-table :data="tableData" @selection-change="handleSelectionChange" border row-key="ID" stripe style="width: 100%" tooltip-effect="dark">

      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="ID" width="120" prop="ID"></el-table-column>
      
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
          <el-button @click="addMenu(scope.row.ID)" size="small" type="primary" icon="el-icon-edit">添加子分类</el-button>
          <el-button @click="editMenu(scope.row.ID)" size="small" type="primary" icon="el-icon-edit" >编辑</el-button>
          
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteDocumentCategory(scope.row)">确定</el-button>
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
            :props="{ checkStrictly: true,label:'title',value:'ID',disabled:'disabled',emitPath:false}"
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
  </div>
</template>

<script>
import {
    createDocumentCategory,
    deleteDocumentCategory,
    deleteDocumentCategoryByIds,
    updateDocumentCategory,
    findDocumentCategory,
    getDocumentCategoryList
} from "@/api/documentCategory";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/data";
import infoList from "@/components/mixins/infoList";

export default {
  name: "documentCategory",
  mixins: [infoList],
  data() {
    return {
      listApi: getDocumentCategoryList,
      dialogFormVisible: false,
      visible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        ID: 0,
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
          ID: '0',
          title: '根目录'
        }
      ],
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
        ID: 0,
        hidden: 0,
        parentId: '',
        title: '',
        sort: '',
      }
    },
    setOptions() {
      this.menuOption = [
        {
          ID: '0',
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
              ID: item.ID,
              disabled: disabled || item.ID == this.formData.ID,
              children: []
            }
            this.setMenuOptions(
              item.children,
              option.children,
              disabled || item.ID == this.formData.ID
            )
            optionsData.push(option)
          } else {
            const option = {
              title: item.title,
              ID: item.ID,
              disabled: disabled || item.ID == this.formData.ID
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
          ids.push(item.ID)
        })
      const res = await deleteDocumentCategoryByIds({ ids })
      if (res.code == 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.deleteVisible = false
        this.getTableData()
      }
    },
    async updateDocumentCategory(row) {
      const res = await findDocumentCategory({ ID: row.ID });
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
    async deleteDocumentCategory(row) {
      this.visible = false;
      const res = await deleteDocumentCategory({ ID: row.ID });
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
              res = await createDocumentCategory(this.formData);
              break;
            case "update":
              res = await updateDocumentCategory(this.formData);
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
      const res = await findDocumentCategory({ id })
      this.formData = res.data.docCategory
      this.isEdit = false
      this.setOptions()
      this.type = "update";
      this.dialogFormVisible = true
    }
  },
  async created() {
    await this.getTableData();}
};
</script>

<style>
</style>