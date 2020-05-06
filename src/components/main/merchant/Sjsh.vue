<template>
    <div class="sjsh">
      <h1>商家审核</h1>
      <div style="float: right;">
        公司名称:<el-input v-model="input" placeholder="请输入内容" style="width: 200px;margin-right: 15px;"></el-input>
        店铺名称:<el-input v-model="input" placeholder="请输入内容" style="width: 200px;"></el-input>
        <el-button>查询</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="date" type="selection" width="50"></el-table-column>
        <el-table-column prop="sellerId" label="商家账号" width="180"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="nickName" label="店铺名称"></el-table-column>
        <el-table-column prop="linkmanName" label="联系人姓名"></el-table-column>
        <el-table-column prop="telephone" label="公司电话"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="b" size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog title="商家详情" :visible.sync="showBol" width="60%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="one">
            <el-table :data="tbSeller" style="width: 100%">
              <el-table-column prop="name" label="公司名称" width="180"></el-table-column>
              <el-table-column prop="mobile" label="公司手机" width="180"></el-table-column>
              <el-table-column prop="telephone" label="公司电话"></el-table-column>
              <el-table-column prop="addressDetail" label="公司详细地址"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="联系人" name="two">
            <el-table :data="tbSeller" style="width: 100%">
              <el-table-column prop="linkmanName" label="联系人姓名" width="180"></el-table-column>
              <el-table-column prop="linkmanQq" label="联系人QQ" width="180"></el-table-column>
              <el-table-column prop="linkmanMobile" label="联系人电话"></el-table-column>
              <el-table-column prop="linkmanEmail" label="联系人EMAIL"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="证件" name="three">
            <el-table :data="tbSeller" style="width: 100%">
              <el-table-column prop="licenseNumber" label="营业执照号" width="180"></el-table-column>
              <el-table-column prop="taxNumber" label="税务登记证号" width="180"></el-table-column>
              <el-table-column prop="orgNumber" label="组织机构代码"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="法定代表人" name="four">
            <el-table :data="tbSeller" style="width: 100%">
              <el-table-column prop="legalPerson" label="法定代表人" width="180"></el-table-column>
              <el-table-column prop="legalPersonCardId" label="法定代表人身份证" width="180"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="开户行" name="five">
            <el-table :data="tbSeller" style="width: 100%">
              <el-table-column prop="bankUser" label="开户行账号名称" width="180"></el-table-column>
              <el-table-column prop="bankName" label="开户行" width="180"></el-table-column>
              <el-table-column prop="bankAccount" label="银行账号"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="status = 2,updStatus()">审核通过</el-button>
          <el-button type="warning" @click="status = 1,updStatus()">拒绝通过</el-button>
          <el-button type="danger" @click="status = 3,updStatus()">关闭商家</el-button>
          <el-button type="info" @click="showBol = false">取 消</el-button>
        </span>
      </el-dialog>


    </div>
</template>

<script>
    export default {
      name: "Sjsh",
      data(){
        return{
          input:"",
          tableData:[],
          tbSeller:[],
          showBol:false,
          activeName: 'one',
          status:''
        }
      },
      created() {
        this.$http.get(this.Global.url_8082+'tbSeller/findByStatus/0').then(res=>{
          this.tableData = res.data;
        });
      },
      methods:{
        handleEdit(index,row){
          this.tbSeller[0] = row;
          this.showBol = true;
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        updStatus(){
          console.log(this.status);
          this.tbSeller[0].status = this.status;
          this.$http.post(this.Global.url_8082+'tbSeller/updTbSeller',this.tbSeller[0]).then(res=>{
            if (res.data != null){
              this.$message({message: '修改成功!', type: 'success'});
              this.$http.get(this.Global.url_8082+'tbSeller/findByStatus/0').then(res=>{
                this.tableData = res.data;
              });
            }else{
              this.$message({message: '修改失败!', type: 'warning'});
            }
            this.showBol = false;
          })
        }
      }
    }
</script>

<style scoped>
  .sjsh{
    margin-left: 202px;
  }
</style>
