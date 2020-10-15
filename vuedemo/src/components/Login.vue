<template>
  <div>
    <div class="_div">
      <div class="form_div">
        <el-form
          status-icon
          :rules="rules"
          ref="ruleForm"
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <label>请登录</label>
          <div style="margin-top: 20px"></div>
          <el-form-item prop="pass">
            <el-input
              v-model="formLabelAlign.name"
              autocomplete="off"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <div style="margin-top: 20px"></div>
          <el-form-item prop="checkPass">
            <el-input
              v-model="formLabelAlign.region"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <div style="margin-top: 20px"></div>
          <el-button
            type="primary"
            @click="onSubmit('ruleForm')"
            style="text-align: center"
            :loading="Flag"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import jquery from 'jquery'
export default {
  data () {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
      },
      subData: {
        userName: 'admin',
        password: '123456'
      },
      Flag: false,
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
    var validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formLabelAlign.region !== '') {
          this.$refs.ruleForm.validateField('region');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.formLabelAlign.name !== '') {
          this.$refs.ruleForm.validateField('name');
        }
        callback();
      }
    };
  },
  methods: {
    onSubmit (formName) {
      this.Flag = true
      console.log(formName);
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid);
        if (valid) {

          jquery.ajax({
            url: 'http://192.168.3.77:3000/api/demo/login',
            method: 'post',
            data: this.subData,
            dataType: 'json',
            success: (data) => {
              console.log(data);
              if (data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })
                this.$router.push({ name: 'main', params: {} })
              }else{
                  this.$message({
                  type: 'error',
                  message: '登陆失败'
                })
              }
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>


<style scope>
.form_div {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  width: 400px;
  height: 200px;
  color: white;
  right: 0;
  transform: translate(0, -60%);
  top: 50%;
  margin-right: 40px;
  padding: 40px;
}
._div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/images/Login/u0.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
/*
此处由于element底层的CSS样式，margin-left:80px,所以使用el-form-item的时候会存在无法居中的问题
我的解决方式是   重写.el-form-item__content ，并且添加margin-right: 80px;
*/
.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 80px;
  margin-right: 80px;
}
</style>