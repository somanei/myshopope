<template>
  <div class="fixed">
    <TopNav></TopNav>
    <LeftNav></LeftNav>
  </div>
</template>

<script>
  import LeftNav from "./LeftNav";
  import TopNav from "./TopNav";

  export default {
    name: "Fixed",
    components: {TopNav, LeftNav}
  }
</script>

<style scoped>
</style>
