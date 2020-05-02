<template>
  <div class="sjgl">
    <h1>商家管理</h1>
    <div style="float: right;">

      公司名称:<el-input v-model="name" placeholder="请输入内容" style="width: 200px;"></el-input>
      店铺名称:<el-input v-model="nickName" placeholder="请输入内容" style="width: 200px;"></el-input>
      状态:
      <el-radio-group v-model="radio" :border="true" size="mini">
        <el-radio :label="4">全部</el-radio>
        <el-radio :label="0">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="1">审核未通过</el-radio>
        <el-radio :label="3">关闭</el-radio>
      </el-radio-group>
      <el-button @click="search()">查询</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" type="selection" width="50"></el-table-column>
      <el-table-column prop="sellerId" label="商家账号" width="180"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column prop="nickName" label="店铺名称"></el-table-column>
      <el-table-column prop="linkmanName" label="联系人姓名"></el-table-column>
      <el-table-column prop="telephone" label="公司电话"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作">
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
            tableData:[],
            radio: 4,
            name:"",
            nickName:""
          }
      },
      created() {
        this.$http.get('http://localhost:8082/tbSeller/getAll').then(res=>{
          this.dataFormat(res)
        })
      },
      methods:{
        handleEdit(index,row){
          console.log(row)
        },
        dataFormat(res){
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].status === '0'){
                res.data[i].status = "未审核";
              }else if (res.data[i].status === '1'){
                res.data[i].status = "审核未通过";
              }else if (res.data[i].status === '2'){
                res.data[i].status = "审核通过";
              }else if (res.data[i].status === '3'){
                res.data[i].status = "已拉黑";
              }
            }
            this.tableData = res.data;
        },
        search(){
          if (this.name !== '' || this.nickName !== ''){
            this.$http.post('http://localhost:8082/tbSeller/findAllBySearch',
              {name:this.name,nickName:this.nickName}).then(res=>{
                this.dataFormat(res)
            })
          }else{
            this.$http.get('http://localhost:8082/tbSeller/findByStatus/'+this.radio).then(res=>{
              this.dataFormat(res)
            })
          }
        }
      }
    }
</script>

<style scoped>
  .sjgl{
    margin-left: 202px;
  }
</style>
