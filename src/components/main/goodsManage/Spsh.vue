<template>
    <div class="spsh">
      <h1>商品审核</h1>
      <el-button-group>
        <el-button @click="reloadGet">刷新</el-button>
      </el-button-group>
      <div style="float: right">
        <span>商品名称:</span><el-input clearable v-model="inSearch" style="width: 200px;"></el-input>
        <el-button @click="search">搜索</el-button>
      </div>

      <div>
          <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column prop="id" label="商品ID" width="70"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="price" label="商品价格" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="category1Id" label="一级分类" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="category2Id" label="二级分类" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="category3Id" label="三级分类" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="auditStatus" label="状态" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button class="b" type="primary" size="mini" @click="checkOk(scope.row,scope.$index)">审核通过</el-button>
                <el-button class="b" type="danger" size="mini" @click="reject(scope.row,scope.$index)">驳回</el-button>
              </template>
            </el-table-column>
        </el-table>

        <template>
          <div style="text-align: center;margin-top: 20px;">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize" layout="total, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Spsh",
      data(){
        return{
          inSearch:"",
          tableData:[],
          dialogVisible: false,
          currentPage: 1,
          // 总条数，根据接口获取数据长度(注意：这里不能为空)
          totalCount: 1,
          // 默认每页显示的条数（可修改）
          pageSize: 5,
          multipleSelection:[]
        }
      },
      async created() {
        await this.$http.get(this.Global.url_8082+'util/getGoods').then(r=>{
          this.dataFormat(r)
        })
      },
      methods:{
        dataFormat: async function(r){
          for (let i = 0; i < r.data.length; i++) {
            if (r.data[i].auditStatus === '1'){
              r.data[i].auditStatus = '待审核';
            }
            this.$http.get(this.Global.url_8082+'tbItemCat/getById/'+r.data[i].category1Id).then(res=>{
              r.data[i].category1Id = res.data.name;
            });
            this.$http.get(this.Global.url_8082+'tbItemCat/getById/'+r.data[i].category2Id).then(res=>{
              r.data[i].category2Id = res.data.name;
            });
            this.$http.get(this.Global.url_8082+'tbItemCat/getById/'+r.data[i].category3Id).then(res=>{
              r.data[i].category3Id = res.data.name;
            });
          }
          this.tableData = r.data;
          this.totalCount = r.data.length;
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        handleCurrentChange(val){
          this.currentPage = val;
        },
        //审核通过
        checkOk(row,index){
          this.$http.get(this.Global.url_8082+"util/updStat/"+row.id+"/0").then(r=>{
            if(r.data == "1"){
              this.$message({message: '通过成功!', type: 'success'});
              this.tableData.splice(index,1);
            }else{
              this.$message({message: '通过失败!', type: 'warning'});
            }
          })
        },
        //驳回
        reject(row,index){
          this.$http.get(this.Global.url_8082+"util/updStat/"+row.id+"/3").then(r=>{
            if(r.data == "1"){
              this.$message({message: '驳回成功!', type: 'success'});
              this.tableData.splice(index,1);
            }else{
              this.$message({message: '驳回失败!', type: 'warning'});
            }
          })
        },
        //搜索
        search(){
          if (this.inSearch === ""){
            this.reloadGet();
          }else{
            this.$http.get(this.Global.url_8082+'util/search/'+this.inSearch).then(r=>{
              if (r.data.length === 0){
                this.$message({message: '查询没有结果!', type: 'warning'});
                return;
              }
              this.dataFormat(r);
            })
          }
        },
        //刷新
        reloadGet(){
          this.$http.get(this.Global.url_8082+'util/getGoods').then(r=>{
            this.dataFormat(r)
          })
        }
      }
    }
</script>

<style scoped>
  .spsh{
    margin-left: 202px;
  }
</style>
