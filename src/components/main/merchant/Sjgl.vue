<template>
  <div class="sjgl">
    <h1>商家管理</h1>
    <div style="float: right;">

      公司名称<el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
      店铺名称<el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
      状态：
      <el-checkbox v-model="checked">全部</el-checkbox>
      <el-checkbox v-model="checked">待审核</el-checkbox>
      <el-checkbox v-model="checked">已审核</el-checkbox>
      <el-checkbox v-model="checked">审核未通过</el-checkbox>
      <el-checkbox v-model="checked">关闭</el-checkbox>
      <el-button>查询</el-button>

    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" type="selection" width="180"></el-table-column>
      <el-table-column prop="name" label="商家ID" width="180"></el-table-column>
      <el-table-column prop="address" label="公司名称"></el-table-column>
      <el-table-column prop="address" label="店铺名称"></el-table-column>
      <el-table-column prop="address" label="联系人姓名"></el-table-column>
      <el-table-column prop="address" label="公司电话"></el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
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
      name: "Sjgl",
      data(){
          return{
            input:"",
            tableData:[]
          }
      },
      methods:{
        handleEdit(index,row){

        }
      }
    }
</script>

<style scoped>
  .sjgl{
    margin-left: 202px;
  }
</style>
