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
        <!-- <el-form-item>
          <el-button @click="openDialog" type="primary">新增用户</el-button>
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
    
    <el-table-column label="用户UUID" prop="uuid" width="120"></el-table-column> 
    
    <el-table-column label="用户昵称" prop="nickName" width="120"></el-table-column> 
    
    <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <img
              :alt="scope.row.headerImg"
              :src="scope.row.headerImg"
              height="80"
              width="80"
            />
          </template>
        </el-table-column>
    
    <el-table-column label="用户手机号码" prop="mobile" width="120"></el-table-column> 
    
    <el-table-column label="注册日期" prop="registered_at" width="160"></el-table-column> 
    
    <el-table-column label="省" prop="province" width="120"></el-table-column> 
    
    <el-table-column label="市" prop="city" width="120"></el-table-column> 
    
    <el-table-column label="区" prop="district" width="120"></el-table-column> 
    
    <el-table-column label="浏览次数" prop="browseNum" width="120"></el-table-column> 
    
    <el-table-column label="下载次数" prop="downloadNum" width="120"></el-table-column> 
    
    <el-table-column label="用户状态" prop="status" width="120">
      <template slot-scope="scope">
        <el-tag type="success" class="el-tag--light" v-if="scope.row.hidden == 1">正常</el-tag>
          <el-tag type="danger" class="el-tag--light" v-if="scope.row.hidden == 0">禁用</el-tag>
      </template>  
    </el-table-column> 
    
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateZbUser(scope.row)" size="small" type="primary">变更</el-button>
          <el-button v-if="scope.row.status == 0" @click="updateStatus(scope.row)" size="small" type="success">启用</el-button>
          <el-button v-if="scope.row.status == 1" @click="updateStatus(scope.row)" size="small" type="danger">禁用</el-button>
          <!-- <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteZbUser(scope.row)">确定</el-button>
            </div>
            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
          </el-popover> -->
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
      <el-form ref="listForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="formData.nickName" placeholder="请输入用户昵称" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" clearable show-password
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" prop="headerImg" required style="width:45%">
          <el-upload
            :action="`http://zbc.scshark.com/fileUploadAndDownload/upload`"
            :on-success="handleAvatarSuccess"
            :headers="{ 'x-token': token }"
            :multiple="false"
            :show-file-list="false">
            <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
          </el-upload>
          <img v-if="formData.headerImg" :src="formData.headerImg" class="avatar">
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="注册日期" prop="registered_at">
          <el-date-picker type="datetime" v-model="formData.registered_at"
            :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="所在城市" prop="selectedOptions">
          <el-cascader 
            v-model="selectedOptions" 
            :options="cityOptions" 
            @change="handleChange"
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
    getZbUserList,
    updateStatus
} from "@/api/userList";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/data.js";
import options from "@/utils/country-data.js";
import infoList from "@/components/mixins/infoList";
import { mapGetters } from "vuex";

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
        nickName: '',
        headerImg: '',
        mobile: '',
        registered_at: '',
        province: '',
        city: '',
        district: '',
        browseNum: 0,
        downloadNum: 0,
        status: 1,
      },
      userStatus: [
        {value: 0, label: '禁用'},
         {value: 1, label: '正常'},
      ],
      selectedOptions: [],//存放默认值
      cityOptions: options,
      rules: {
        nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
        headerImg: [{ required: true, message: '请上传用户头像', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入用户手机号码', trigger: 'blur' }],
        registered_at: [{ required: true, message: '请选择用户注册日期', trigger: 'blur' }],
        // selectedOptions: [{ required: true, message: '请选择所在城市', trigger: 'blur' }],
        status: [{ required: true, message: '请选择用户状态', trigger: 'blur' }],
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
  computed: {
    ...mapGetters("user", ["token"])
  },
  methods: {
      // 初始化弹窗内表格方法
      initForm() {
        this.$refs.listForm.resetFields()
        this.formData = {
          nickName: '',
          headerImg: '',
          mobile: '',
          registered_at: '',
          province: '',
          city: '',
          district: '',
          browseNum: 0,
          downloadNum: 0,
          status: 1,
        };
        this.selectedOptions = []
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
      handleChange(value) {
        //城市选择
        this.formData.province = value[1]
        this.formData.city = value[2]
        this.formData.district = value[3]
        this.selectedOptions = value
        console.log(this.selectedOptions)
      },
      handleAvatarSuccess(res, file) {
        // 上传头像
        this.formData.headerImg = res.data.file.url
      },
      async onDelete() {
        const ids = []
        this.multipleSelection &&
          this.multipleSelection.map(item => {
            ids.push(item.id)
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
      const res = await findZbUser({ id: row.id });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data;
        this.selectedOptions.push("中国")
        this.selectedOptions.push(res.data.province)
        this.selectedOptions.push(res.data.city)
        this.selectedOptions.push(res.data.district)
        this.dialogFormVisible = true;
      }
    },
    async updateStatus(row) {
      const res = await updateStatus({ id: row.id });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.getTableData();
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.initForm()
    },
    async deleteZbUser(row) {
      this.visible = false;
      const res = await deleteZbUser({ id: row.id });
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
        }
      })
    },
    openDialog() {
      this.type = "create";
      this.dialogFormVisible = true;
      this.initForm()
    }
  },
  async created() {
    await this.getTableData();}
};
</script>

<style>
</style>