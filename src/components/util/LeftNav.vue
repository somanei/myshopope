<template>
  <div class="leftnav">
    <el-row class="tac">

      <el-menu default-active="1" text-color="#fff" class="el-menu-vertical-demo" background-color="#545c64">

        <template>
          <div>

            <div style="display: inline;margin-left: 20px;">
              <img src="/static/img/user2-160x160.jpg" class="left-img">
            </div>

            <div style="display: inline-block;margin-left: 20px;color: white;">
              <span>username</span><br>
              <span>在线</span>
            </div>
          </div>
        </template>

        <router-link to="/home">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商家管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/sjsh">
              <el-menu-item index="2-1">商家审核</el-menu-item>
            </router-link>
            <router-link to="/sjgl">
              <el-menu-item index="2-2">商家管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/ppgl">
              <el-menu-item index="3-1">品牌管理</el-menu-item>
            </router-link>
            <router-link to="/gggl">
              <el-menu-item index="3-2">规格管理</el-menu-item>
            </router-link>
            <router-link to="/mbgl">
              <el-menu-item index="3-3">模板管理</el-menu-item>
            </router-link>
            <router-link to="/spflgl">
              <el-menu-item index="3-4">分类管理</el-menu-item>
            </router-link>
            <router-link to="/spsh">
              <el-menu-item index="3-5">商品审核</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>



      </el-menu>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'LeftNav',
    data() {
      return {}
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .leftnav {
    width: 202px;
    margin-top: -0.08px;
    float:left;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 90.8vh;
  }
  .left-img{
    width: 100%;
    max-width: 45px;
    height: auto;
    border-radius: 50%;
    border: 0;
  }
</style>
