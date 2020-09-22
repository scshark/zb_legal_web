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
          <el-button @click="openDialog" type="primary">新增文书关键词标签</el-button>
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
    <!-- <el-table-column label="日期" width="180">
         <template slot-scope="scope">{{scope.row.CreatedAt|formatDate}}</template>
    </el-table-column> -->
    
    <el-table-column label="名称" prop="name" width="120"></el-table-column> 
    
    <el-table-column label="点击量" prop="searchNum" width="120"></el-table-column> 
    
    <el-table-column label="文书数量" prop="documentNum" width="120"></el-table-column> 
    
    <el-table-column label="状态" prop="status" width="120">
      <template slot-scope="scope">
        <el-tag type="success" class="el-tag--light" v-if="scope.row.status == 1">正常</el-tag>
        <el-tag type="danger" class="el-tag--light" v-if="scope.row.status == 0">禁用</el-tag>
      </template>  
    </el-table-column> 
    
    <el-table-column label="排序" prop="sort" width="120"></el-table-column> 
    
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button @click="updateDocumentKeyword(scope.row)" size="small" type="primary">变更</el-button>
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteDocumentKeyword(scope.row)">确定</el-button>
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

    <el-dialog :before-close="closeDialog" :visible.sync="dialogFormVisible" :title="dialogTitle">
      <el-form
        :inline="true"
        :model="formData"
        :rules="rules"
        label-position="top"
        label-width="85px"
        ref="listForm"
      >
        <el-form-item label="名称" prop="name" style="width:100%">
          <el-input autocomplete="off" v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="是否隐藏" style="width:45%">
          <el-select placeholder="是否在列表隐藏" v-model="formData.status">
            <el-option :value="0" label="是"></el-option>
            <el-option :value="1" label="否"></el-option>
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
    createDocumentKeyword,
    deleteDocumentKeyword,
    deleteDocumentKeywordByIds,
    updateDocumentKeyword,
    findDocumentKeyword,
    getDocumentKeywordList
} from "@/api/documentKeyword";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/data";
import infoList from "@/components/mixins/infoList";

export default {
  name: "documentKeyword",
  mixins: [infoList],
  data() {
    return {
      listApi: getDocumentKeywordList,
      dialogFormVisible: false,
      visible: false,
      type: "",
      dialogTitle: '新增关键词',
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        name: '',
        status: 1,
        sort: '',
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
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
        this.$refs.listForm.resetFields()
        this.formData = {
          name: '',
          status: 1,
          sort: '',
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
        const res = await deleteDocumentKeywordByIds({ ids })
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.deleteVisible = false
          this.getTableData()
        }
      },
    async updateDocumentKeyword(row) {
      const res = await findDocumentKeyword({ id: row.id });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.initForm()
    },
    async deleteDocumentKeyword(row) {
      this.visible = false;
      const res = await deleteDocumentKeyword({ id: row.id });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getTableData();
      }
    },
    async enterDialog() {
      this.$refs.listForm.validate(async valid => {
        if (valid) {
          let res;
          switch (this.type) {
            case "create":
              res = await createDocumentKeyword(this.formData);
              break;
            case "update":
              res = await updateDocumentKeyword(this.formData);
              break;
            default:
              res = await createDocumentKeyword(this.formData);
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
    openDialog() {
      this.type = "create";
      this.dialogFormVisible = true;
    }
  },
  async created() {
    await this.getTableData();}
};
</script>

<style>
</style>