<template>
    <div class="gglxgl">
      <h1>广告分类管理</h1>
      <el-button-group>
        <el-button >新建</el-button>
        <el-button >删除</el-button>
        <el-button >开启</el-button>
        <el-button >屏蔽</el-button>
        <el-button >刷新</el-button>

      </el-button-group>
      <span style="float: right">名称：<el-input v-model="input" placeholder="请输入内容" style="width: 200px;">
      </el-input><el-button>查询</el-button>
      </span>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" type="selection" width="180"></el-table-column>
        <el-table-column prop="name" label="分类ID" width="180"></el-table-column>
        <el-table-column prop="address" label="分类名称"></el-table-column>
        <el-table-column prop="address" label="分组"></el-table-column>
        <el-table-column prop="address" label="KEY"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button class="b" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "Gglxgl",
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
  .gglxgl{
    margin-left: 202px;
  }
</style>
