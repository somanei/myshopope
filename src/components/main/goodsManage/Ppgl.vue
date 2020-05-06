<template>
    <div class="ppgl">
      <h1>品牌管理</h1>
      <el-button-group>
        <el-button @click="dialogVisible = true">新建</el-button>
        <el-button @click="delBrand">删除</el-button>
        <el-button >刷新</el-button>
      </el-button-group>

      <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column prop="brandId" type="selection" width="180">
        </el-table-column>
        <el-table-column prop="brandId" label="商家ID" width="180">
        </el-table-column>
        <el-table-column prop="brandName" label="品牌名称">
        </el-table-column>
        <el-table-column prop="brandFirst" label="品牌首字母">
        </el-table-column>


        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button class="b" size="mini" @click="handleEdit(scope.$index, scope.row),dialogVisibles=true">修改</el-button>
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

      <el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        品牌:<el-input placeholder="请输入品牌" v-model="inputPp" @blur="getFirst(inputPp)" clearable></el-input>
        首字母:<el-input disabled placeholder="请输入首字母" v-model="inputSzm" ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBrand(),clear()">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="修改" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose">
        品牌:<el-input placeholder="请输入品牌" v-model="pp" @blur="getFirsts(pp)" clearable></el-input>
        首字母:<el-input disabled placeholder="请输入首字母" v-model="szm" ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button type="primary" @click="updBrand()">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
  import {Pinyin} from '../../../../static/ChinesePY';
    export default {
      name: "Ppgl",
      data(){
          return{
            tableData:[],
            dialogVisible: false,
            inputPp:"",
            inputSzm:"",
            currentPage: 1,
            // 总条数，根据接口获取数据长度(注意：这里不能为空)
            totalCount: 1,
            // 默认每页显示的条数（可修改）
            pageSize: 5,
            multipleSelection: [],
            pp:"",
            szm:"",
            dialogVisibles:false,
            py:Pinyin,
            brandId:""
          }
      },
      created() {
        this.$http.get(this.Global.url_8082+'brand/getAll?curPage=0&pageSize=5').then(res=>{
          this.tableData = res.data;
        });
        this.$http.get(this.Global.url_8082+'brand/getCount').then(res=>{
          this.totalCount = res.data;
        })
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleEdit(index,row){
          this.pp = row.brandName;
          this.szm = row.brandFirst;
          this.brandId = row.brandId;
        },
        clear(){
          this.inputPp="";
          this.inputSzm = "";
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
          this.getData();
        },
        getData(){
          this.$http.get(this.Global.url_8082+'brand/getAll',{params:{
              pageSize: this.pageSize,
              // 显示第几页
              curPage: (this.currentPage - 1) * this.pageSize
            }}).then(res=>{
            this.tableData = res.data;
          });
          this.$http.get(this.Global.url_8082+'brand/getCount').then(res=>{
            this.totalCount = res.data;
          });
        },
        delBrand(){
          if (this.multipleSelection.length == 0){
            this.$message({message: '删除不得为空', type: 'warning'});
          }else{
            this.$http.post(this.Global.url_8082+'brand/delBrand', this.multipleSelection).then(res=>{
              if (res.data == 1 ){
                this.$message({message: '删除成功!', type: 'success'});
                this.getData();
              }else{
                this.$message({message: '删除失败!', type: 'warning'});
              }
            })
          }
        },
        getFirst(inputPp){
          const szm = this.py.GetJP(inputPp);
          this.inputSzm = szm.substring(0,1).toUpperCase();
        },
        getFirsts(pp){
          const szm = this.py.GetJP(pp);
          this.szm = szm.substring(0,1).toUpperCase();
        },
        addBrand(){
          if (this.inputPp == ""){
            this.$message({message: '不得为空!', type: 'warning'});
            return;
          }else{
            this.$http.post(this.Global.url_8082+'brand/addBrand',{
              brandName:this.inputPp,brandFirst:this.inputSzm
            }).then(res=>{
              console.log(res)
              if (res.data == 1){
                this.$message({message: '新增成功!', type: 'success'});
                this.$http.get(this.Global.url_8082+'brand/getCount').then(res=>{
                  this.totalCount = res.data;
                });
                this.clear();
                this.dialogVisible = false;
              }else{
                this.$message({message: '新增失败!', type: 'warning'});
              }
            })
          }
        },
        updBrand(){
          if (this.pp == ""){
            this.$message({message: '不得为空', type: 'warning'});
          }else {
            this.$http.post(this.Global.url_8082+'brand/updBrand', {
              brandName: this.pp, brandFirst: this.szm,brandId:this.brandId
            }).then(res => {
              console.log(res);
              if (res.data == 1) {
                this.$message({message: '修改成功!', type: 'success'});
                this.getData();
              }else{
                this.$message({message: '修改失败!', type: 'warning'});
              }
              this.clear();
              this.dialogVisibles = false;
            })
          }
        }
      }
    }
</script>

<style scoped>
  .ppgl{
    margin-left: 202px;
  }
</style>
