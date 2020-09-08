<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">                      
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="openDialog" type="primary">新增用户</el-button>
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
    
    <el-table-column label="用户UUID" prop="uuid" width="120"></el-table-column> 
    
    <el-table-column label="用户昵称" prop="nickName" width="120"></el-table-column> 
    
    <el-table-column label="用户头像" prop="headerImg" width="120"></el-table-column> 
    
    <el-table-column label="用户手机号码" prop="mobile" width="120"></el-table-column> 
    
    <el-table-column label="注册日期" prop="registered_at" width="120"></el-table-column> 
    
    <el-table-column label="省" prop="province" width="120"></el-table-column> 
    
    <el-table-column label="市" prop="city" width="120"></el-table-column> 
    
    <el-table-column label="区" prop="district" width="120"></el-table-column> 
    
    <el-table-column label="浏览次数" prop="browseNum" width="120"></el-table-column> 
    
    <el-table-column label="下载次数" prop="downloadNum" width="120"></el-table-column> 
    
    <el-table-column label="用户状态" prop="status" width="120"></el-table-column> 
    
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateZbUser(scope.row)" size="small" type="primary">变更</el-button>
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteZbUser(scope.row)">确定</el-button>
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

    <el-dialog :before-close="closeDialog" :visible.sync="dialogFormVisible" title="弹窗操作">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="formData.field101" placeholder="请输入用户昵称" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.field103" placeholder="请输入密码" clearable show-password
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" prop="headerImg" required>
          <el-upload ref="field104" :file-list="field104fileList" :action="field104Action"
            :before-upload="field104BeforeUpload">
            <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="registered_at">
          <el-date-picker v-model="formData.registered_at" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="所在城市" prop="field111">
          <el-cascader v-model="formData.field111" :options="field111Options" :props="field111Props"
            :style="{width: '100%'}" placeholder="请选择所在城市" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="浏览次数" prop="browseNum">
          <el-input v-model="formData.browseNum" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="下载次数" prop="downloadNum">
          <el-input v-model="formData.downloadNum" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择用户状态" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in userStatus" :key="index" :label="item.label"
              :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
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
    createZbUser,
    deleteZbUser,
    deleteZbUserByIds,
    updateZbUser,
    findZbUser,
    getZbUserList
} from "@/api/userList";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/data";
import infoList from "@/components/mixins/infoList";

export default {
  name: "userList",
  mixins: [infoList],
  data() {
    return {
      listApi: getZbUserList,
      dialogFormVisible: false,
      visible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        uuid:null,
        nickName:null,
        headerImg:null,
        mobile:null,
        registered_at:null,
        province:null,
        city:null,
        district:null,
        browseNum:null,
        downloadNum:null,
        status:null,
      },
      userStatus: [
        {value: 1, label: '正常'},
         {value: 2, label: '黑名单'},
      ]
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
        const res = await deleteZbUserByIds({ ids })
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.deleteVisible = false
          this.getTableData()
        }
      },
    async updateZbUser(row) {
      const res = await findZbUser({ ID: row.ID });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.rezbUser;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
        
          uuid:null,
          nickName:null,
          headerImg:null,
          mobile:null,
          registered_at:null,
          province:null,
          city:null,
          district:null,
          browseNum:null,
          downloadNum:null,
          status:null,
      };
    },
    async deleteZbUser(row) {
      this.visible = false;
      const res = await deleteZbUser({ ID: row.ID });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getTableData();
      }
    },
    async enterDialog() {
      let res;
      switch (this.type) {
        case "create":
          res = await createZbUser(this.formData);
          break;
        case "update":
          res = await updateZbUser(this.formData);
          break;
        default:
          res = await createZbUser(this.formData);
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