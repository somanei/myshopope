<template>
  <div id="app">

    <div v-if="!showBol">
      <ShopLogin @loginOk="loginOk"></ShopLogin>
    </div>
    <div id="main" v-if="showBol">
      <Fixed></Fixed>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Fixed from "./components/util/Fixed";
  import ShopLogin from "./components/login/ShopLogin";
export default {
  name: 'App',
  components:{Fixed,ShopLogin},
  data(){
    return{
      showBol:false
    }
  },
  created() {
    const bol = sessionStorage.getItem("loginBol");
    if (bol != null){
      this.showBol = true;
    }
  },
  methods:{
    loginOk(val){
      this.showBol = val;
      if (val){
        sessionStorage.setItem("loginBol",'true');
      }
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .el-pagination {
    padding: 0px 5px;
  }
</style>
