<template>
  <div class="user-containter">
    <div class="form">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="formInline.userName"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户账户">
          <el-input
            v-model="formInline.userAccount"
            placeholder="用户账户"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.role" placeholder="角色">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="店长" value="2"></el-option>
            <el-option label="司机" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button-group>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addDate"
          >新增</el-button
        >
        <el-button type="primary" icon="el-icon-edit" @click="editData"
          >编辑</el-button
        >
        <el-button type="primary" icon="el-icon-remove">删除</el-button>
      </el-button-group>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="account" label="account"> </el-table-column>
        <el-table-column prop="email" label="email"> </el-table-column>
        <el-table-column prop="gender" label="gender"> </el-table-column>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="idCard" label="idCard"> </el-table-column>
        <el-table-column prop="name" label="name"></el-table-column>
        <el-table-column prop="phone" label="phone"></el-table-column>
        <el-table-column prop="role" label="role">
          <template slot-scope="scope">
            <el-popover>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{
                  scope.row.role === "1"
                    ? "管理员"
                    : scope.row.role === "2"
                    ? "店长"
                    : "司机"
                }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageIndex"
        :page-sizes="[1, 3, 5, 7]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
    <el-dialog title="信息" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="account">
              <el-input
                v-model="formData.account"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="email">
              <el-input v-model="formData.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="gender">
              <el-input v-model="formData.gender" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="id">
              <el-input v-model="formData.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="idCard">
              <el-input v-model="formData.idCard" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="name">
              <el-input v-model="formData.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="phone">
              <el-input v-model="formData.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="role" style="width: 100%">
              <el-select v-model="formData.role" placeholder="role">
                <el-option label="管理员" value="1"></el-option>
                <el-option label="司机" value="2"></el-option>
                <el-option label="店长" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormDate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formInline: {
        userName: '',
        userAccount: '',
        role: ''
      },
      formData: {
        account: '',
        email: '',
        gender: '',
        id: '',
        idCard: '',
        name: '',
        phone: '',
        role: ''
      },
      tableData: [
        {
          account: '',
          email: '',
          gender: '',
          id: '',
          idCard: '',
          name: '',
          phone: '',
          role: ''
        }],
      pageInfo: {
        pageIndex: 1,
        pageSize: 3,
        total: 0
      },
      editSize: 0
    }
  },
  mounted () {

    this.seacher();
  },
  methods: {
    handleSelectionChange (val) {
      this.editSize = val.length;
      console.log(this.editSize);
      this.formData = Object.assign({}, val[0]);
    },
    editData () {
      if (this.editSize === 0 || this.editSize > 1) {
        this.$message({
          type: 'error',
          message: '仅支持修改一条数据'
        })
        return;
      } else {
        this.dialogFormVisible = true
      }

    },
    addFormDate () {
      console.log(this.tableData);
      this.tableData.push(this.formData)
      this.dialogFormVisible = false
    },
    addDate () {
      //初始化
      this.formData = {
        account: '',
        email: '',
        gender: '',
        id: '',
        idCard: '',
        name: '',
        phone: '',
        role: ''
      }
      this.dialogFormVisible = true
    },
    fetch () {
      this.pageInfo.pageIndex = 1
    },
    seacher () {
      $.ajax({
        url: 'http://192.168.3.77:3000/api/demo/searchList',
        method: 'get',
        data: Object.assign({}, this.pageInfo, this.formInline),
        dataType: 'Json',
        success: (res) => {
          this.tableData = res.data
          this.pageInfo.total = res.total
        }
      })
    },
    onSubmit () {
      console.log('submit!');
    },
    handleSizeChange (value) {
      this.pageInfo.pageSize = value;
      this.seacher();
    },
    handleCurrentChange (value) {
      this.pageInfo.pageIndex = value;
      this.seacher();
      console.log(value);
    }
  }
}
</script>
<style scoped>
.table {
  margin-top: 20px;
}
.el-button-group > .el-button {
  float: left;
  position: relative;
  padding: 15px;
  margin-left: 10px;
}
.form {
  widows: 100%;
  height: 80px;
}
.el-table {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  color: #606266;
}
</style>