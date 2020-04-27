<template>
  <div id="app">

    <div id="main">
      <Fixed></Fixed>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Fixed from "./components/util/Fixed";
export default {
  name: 'App',
  components:{Fixed}
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
