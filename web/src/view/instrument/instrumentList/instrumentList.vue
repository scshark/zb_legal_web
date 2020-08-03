<template>
    <div>
        <div class="search-term">
            <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
                <el-form-item label="文书id">
                    <el-input placeholder="文书id" v-model="searchInfo.path"></el-input>
                </el-form-item>
                <el-form-item label="文书分类">
                    <el-select clearable placeholder="请选择文书分类" v-model="searchInfo.method">
                        <el-option
                        :key="item.value"
                        :label="`${item.label}(${item.value})`"
                        :value="item.value"
                        v-for="item in methodOptions"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addUser" type="primary">新增文书</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <el-table :data="tableData" border stripe>
            <el-table-column label="id" prop="uuid"></el-table-column>
            <el-table-column label="标题" prop="userName"></el-table-column>
            <el-table-column label="关键词" prop="phone"></el-table-column>
            <el-table-column label="浏览量（总）" prop="area"></el-table-column>
            <el-table-column label="浏览量（真实）" prop="area"></el-table-column>
            <el-table-column label="浏览量（虚拟）" prop="area"></el-table-column>
            <el-table-column label="下载量（总）" prop="regTime"></el-table-column>
            <el-table-column label="下载量（真实）" prop="regTime"></el-table-column>
            <el-table-column label="下载量（虚拟）" prop="regTime"></el-table-column>
            <el-table-column label="添加日期" prop="userLabel"></el-table-column>
            <el-table-column label="修改日期" prop="userLabel"></el-table-column>
            <el-table-column label="分类信息" prop="userLabel"></el-table-column>
            <el-table-column label="状态" prop="userLabel"></el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button @click="editAuthority(scope.row)" icon="el-icon-edit" size="small" type="primary">编辑</el-button>

                    <el-button type="warning" icon="el-icon-delete" size="small" slot="reference">加入黑名单</el-button>

                    <el-popover placement="top" width="160" v-model="scope.row.visible">
                        <p>确定要删除此用户吗</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
                        </div>

                        <el-button type="danger" icon="el-icon-delete" size="small" slot="reference">删除</el-button>
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

        <el-dialog :visible.sync="addUserDialog" custom-class="user-dialog" title="新增用户">
            <el-form :rules="rules" ref="userForm" :model="userInfo">
                <el-form-item label="用户名" label-width="80px" prop="username">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-form-item label="别名" label-width="80px" prop="nickName">
                    <el-input v-model="userInfo.nickName"></el-input>
                </el-form-item>
                <el-form-item label="头像" label-width="80px">
                    <el-upload
                        :headers="{'x-token':token}"
                        :on-success="handleAvatarSuccess"
                        :show-file-list="false"
                        :action="`${path}/fileUploadAndDownload/upload?noSave=1`"
                        class="avatar-uploader"
                        name="file"
                    >
                        <img :src="userInfo.headerImg" class="avatar" v-if="userInfo.headerImg" />
                        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="用户角色" label-width="80px" prop="authorityId">
                    <el-cascader
                        @change="changeAuthority(scope.row)"
                        v-model="userInfo.authorityId"
                        :options="authOptions"
                        :show-all-levels="false"
                        :props="{ checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
                        filterable
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="closeAddUserDialog">取 消</el-button>
                <el-button @click="enterAddUserDialog" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成
const path = process.env.VUE_APP_BASE_API;
import {
  getUserList,
  setUserAuthority,
  register,
  deleteUser
} from "@/api/user";
import { getAuthorityList } from "@/api/authority";
import infoList from "@/components/mixins/infoList";
import { mapGetters } from "vuex";
export default {
  name: "Api",
  mixins: [infoList],
  data() {
    return {
      listApi: getUserList,
      path: path,
      authOptions: [],
      addUserDialog: false,
      userInfo: {
        username: "",
        password: "",
        phone: "",
        headerImg: "",
        authorityId: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],
        phone: [
            { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        area: [
            { required: true, message: "请选择区域", trigger: "blur" }
        ],
        regTime: [
            { required: true, message: "请选择用户注册时间", trigger: "blur" }
        ],
        userLabel: [
            { required: true, message: "请选择用户标签", trigger: "blur" }
        ]

      }
    };
  },
  computed: {
    ...mapGetters("user", ["token"])
  },
  methods: {
    setOptions(authData) {
      this.authOptions = [];
      this.setAuthorityOptions(authData, this.authOptions);
    },
    setAuthorityOptions(AuthorityData, optionsData) {
      AuthorityData &&
        AuthorityData.map(item => {
          if (item.children && item.children.length) {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              children: []
            };
            this.setAuthorityOptions(item.children, option.children);
            optionsData.push(option);
          } else {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName
            };
            optionsData.push(option);
          }
        });
    },
    async deleteUser(row) {
      const res = await deleteUser({ id: row.ID });
      if (res.code == 0) {
        this.getTableData();
        row.visible = false;
      }
    },
    async enterAddUserDialog() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const res = await register(this.userInfo);
          if (res.code == 0) {
            this.$message({ type: "success", message: "创建成功" });
          }
          await this.getTableData();
          this.closeAddUserDialog();
        }
      });
    },
    closeAddUserDialog() {
      this.$refs.userForm.resetFields();
      this.addUserDialog = false;
    },
    handleAvatarSuccess(res) {
      this.userInfo.headerImg = res.data.file.url;
    },
    addUser() {
      this.addUserDialog = true;
    },
    async changeAuthority(row) {
      const res = await setUserAuthority({
        uuid: row.uuid,
        authorityId: row.authority.authorityId
      });
      if (res.code == 0) {
        this.$message({ type: "success", message: "角色设置成功" });
      }
    }
  },
  async created() {
    this.getTableData();
    const res = await getAuthorityList({ page: 1, pageSize: 999 });
    this.setOptions(res.data.list);
  }
};
</script>
<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}

.user-dialog {
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>