<template>
  <div class="topnav">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64"
             text-color="#fff" active-text-color="#409EFF" default-active="1">
      <el-menu-item class="left el-icon-monitor" >品优购运营商后台</el-menu-item>
      <el-menu-item class="right" index="3" @mouseover="isBol = true" @mouseout="isBol = false">
        <img src="/static/img/avatar.png" style="height:30px;width: 30px;border-radius: 50%;">
        username<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-menu-item>
    </el-menu>

    <div v-show="isBol" class="downMenu">
      <div style="text-align: center">
        <img src="/static/img/avatar.png" style="width: 80px;height: 80px;border-radius: 50%">
        <p style="color: white;">上次登录:2020-2-5</p>
      </div>

      <div style="margin-top: 12px;margin-left: 5px;">
        <router-link to="/home">
          <el-button size="small" type="primary">修改密码</el-button>
        </router-link>
        <el-button size="small" type="primary">立即退出</el-button>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: "TopNav",
    data() {
      return {
        isBol:false
      }
    },
    methods: {

    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left{
    font-size: 16px;
  }
  .right{
    float: right;
  }
  .topnav{
    margin-bottom: 0px;
  }
  .downMenu{
    background: #545C64;
    width: 174px;
    height: 150px;
    display: inline-block;
    position: absolute;
    left: 1262px;
    top: 60.5px;
    z-index: 1000;
  }
  .item{
    position: relative;
    top: -15px;
    left: -5px;
  }
</style>
