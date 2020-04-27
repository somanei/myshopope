<template>
  <div class="gggl">
    <h1>广告管理</h1>
    <div style="">
      <el-button-group>
        <el-button >新建</el-button>
        <el-button >删除</el-button>
        <el-button >开启</el-button>
        <el-button >屏蔽</el-button>
        <el-button >刷新</el-button>
      </el-button-group>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" type="selection" width="180"></el-table-column>
      <el-table-column prop="name" label="商家ID" width="180"></el-table-column>
      <el-table-column prop="address" label="公司名称"></el-table-column>
      <el-table-column prop="address" label="店铺名称"></el-table-column>
      <el-table-column prop="address" label="联系人姓名"></el-table-column>
      <el-table-column prop="address" label="公司电话"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button class="b" size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "Gggl",
      data(){
          return{
            tableData:[],
            input:""
          }
      },
      methods:{
        handleEdit(index,row){

        }
      }
    }
</script>

<style scoped>
  .gggl{
    margin-left: 202px;
  }
</style>
