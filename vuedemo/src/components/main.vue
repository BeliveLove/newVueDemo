<template>
  <div>
    <el-container>
      <el-header height="120px">
        <div class="my_Hrader_div">
          <div class="leftHeader">行走书店管理系统</div>
          <div class="rightHeader">
            <el-image :src="src"></el-image>
            <div>admin</div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu router>
            <el-menu-item index="/userManager">用户管理</el-menu-item>
            <el-menu-item index="/MenuManager">菜单管理</el-menu-item>
            <el-menu-item index="1-3">商品管理</el-menu-item>
            <el-menu-item index="1-4">首页轮播管理</el-menu-item>
            <el-menu-item index="1-5">商品分类管理</el-menu-item>
            <el-menu-item index="1-6">客户管理</el-menu-item>
            <el-menu-item index="1-7">订单管理</el-menu-item>
            <el-menu-item index="1-8">热门位管理</el-menu-item>
            <el-menu-item index="1-9">门店信息管理</el-menu-item>
            <el-menu-item index="1-10">司机信息管理</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src:'../../static/u18.jpg'
    }
  },
}
</script>
<style>
.el-header,
.el-footer {
  background-color: gainsboro;
  color: #409eff;
  text-align: center;
  line-height: 120px;
}
.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.my_Hrader_div {
  height: 120px;
  display: flex;
  justify-content: space-between;
}
.leftHeader {
  flex: 4;
  height: 120px;
  width: 100%;
  text-align: left;
  font-size: 30px;
}
.rightHeader {
  flex: 1;
  justify-content: space-around;
  display: flex;
  height: 120px;
  width: 100%;
  padding-left: 50px;
}
.rightHeader>img{
  line-height: 120px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-image__inner {
    vertical-align: middle;
    height: 50%;
}
.el-image {
    position: relative;
    display: inline-block;
    overflow: hidden;
    right: -20%;
}
</style>