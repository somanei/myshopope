<template>
  <div class="topnav">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64"
             text-color="#fff" active-text-color="#409EFF" default-active="1">
      <el-menu-item class="left el-icon-monitor" >品优购运营商后台</el-menu-item>
      <el-menu-item class="right" index="3" @click="change">
        <img src="/static/img/avatar.png" style="height:30px;width: 30px;border-radius: 50%;">
        {{name}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-menu-item>
    </el-menu>

    <div v-show="isBol" class="downMenu">
      <div style="text-align: center">
        <img src="/static/img/avatar.png" style="width: 50px;height: 50px;border-radius: 50%">
        <p>最后登录时间:</p>{{lastLogin}}
      </div>

      <div style="margin: 8px 20%">
        <el-button size="small" type="primary" @click="exit">立即退出</el-button>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: "TopNav",
    data() {
      return {
        isBol:false,
        name:'',
        lastLogin:''
      }
    },
    created() {
      this.name = sessionStorage.getItem("loginName");
      this.lastLogin = sessionStorage.getItem("lastLogin");
    },
    methods: {
      exit(){
        sessionStorage.clear();
        window.location.reload();
      },
      change(){
        if (this.isBol){
          this.isBol = false;
        }else{
          this.isBol = true;
        }
      }
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
    width: 136px;
    height: 160px;
    display: inline-block;
    position: absolute;
    left: 1300px;
    top: 60.5px;
    z-index: 1000;
  }
  .item{
    position: relative;
    top: -15px;
    left: -5px;
  }
</style>
