<template>
  <div id="home">
    <h1 style="text-align: center">
      控制面板
      <span style="font-size: 20px;cursor: pointer;margin-left: 10px;
            color: #545C64;">首页</span>
    </h1>

    <div>
      <div class="newOrder" style="background: #00C0EF;">
        <h3>150</h3>
        <p>新订单</p>
        <router-link to="#">详细</router-link>
      </div>

      <div class="newOrderR" style="background: #00A65A;">
        <h3>53%</h3>
        <p>转化率</p>
        <router-link to="#">详细</router-link>
      </div>

      <div class="newOrder" style="background: #F39C12;">
        <h3>44</h3>
        <p>新注册用户</p>
        <router-link to="#">详细</router-link>
      </div>

      <div class="newOrderR" style="background: #DD4B39;">
        <h3>65</h3>
        <p>日PV</p>
        <router-link to="#">详细</router-link>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return{

      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  #home{
    padding-left: 202px;
  }
  .newOrder{
    color: white;
    display: inline-block;
    width: 40%;
    height: 120px;
    margin-top: 20px;
    margin-left: 40px;
    float: left;
  }
  .newOrderR{
    color: white;
    display: inline-block;
    width: 40%;
    height: 120px;
    margin-top: 20px;
    margin-right: 40px;
    float: right;
  }
  h3{
    text-align: center;
    font-size: 30px;
  }
  p{
    text-align: center;
  }
  a{
    position: relative;
    color: #000000;
    background: #0d6aad;
    display: block;
    text-align: center;
    top:37px;
    opacity: 0.3;
  }
</style>
