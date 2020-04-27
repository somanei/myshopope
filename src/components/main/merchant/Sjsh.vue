<template>
    <div class="sjsh">
      <h1>商家审核</h1>
      <div style="float: right;">
        公司名称:<el-input v-model="input" placeholder="请输入内容" style="width: 200px;margin-right: 15px;"></el-input>
        店铺名称:<el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
        <el-button>查询</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="date"
          type="selection"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商家ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="公司名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="店铺名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系人姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="公司电话">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              class="b"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "Sjsh",
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
  .sjsh{
    margin-left: 202px;
  }
</style>
