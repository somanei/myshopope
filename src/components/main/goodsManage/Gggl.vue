<template>
    <div class="gggl">
      <h1>规格管理</h1>
      <!--头部按钮-->
      <el-button-group>
        <el-button @click="dialogVisible = true,clear()">新建</el-button>
        <el-button @click="delSpec">删除</el-button>
        <el-button @click="reload()">刷新</el-button>
      </el-button-group>
      <!--搜索组件-->
      <div style="float: right">
        <span>规格名称:</span><el-input clearable v-model="inSearch" style="width: 200px;"></el-input>
        <el-button @click="search">搜索</el-button>
      </div>

      <div>
        <!--数据展示-->
        <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column prop="specId" type="selection" ></el-table-column>
          <el-table-column prop="specId" label="规格ID" ></el-table-column>
          <el-table-column prop="specName" label="规格名称"></el-table-column>

          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button class="b" size="mini" @click="handleEdit(scope.$index, scope.row),dialogVisibles=true">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
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
        <!--新增模态框-->
        <el-dialog title="新增" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="130px" class="demo-dynamic">
            <el-form-item prop="email" label="规格名称" :rules="[
              { required: true, message: '请输入规格名称', trigger: 'blur' }]">
              <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'规格选项与排序'"
              :key="domain.key"
              :rules="{required: true, message: '规格选项不能为空', trigger: 'blur'}">
              <el-input style="width: 170px;" v-model="domain.optionsName"></el-input>
              <el-input style="width: 148px;" type="number" v-model="domain.optionsOrder" ></el-input>
              <el-button type="warning" @click.prevent="removeDomain(domain)">删除{{index}}</el-button>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDomain">新增选项</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSpec(dynamicValidateForm)">确 定</el-button>
          </span>
        </el-dialog>
        <!--修改模态框-->
        <el-dialog title="修改" :visible.sync="dialogVisibles" width="40%" :before-close="handleClose">
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="130px" class="demo-dynamic">
            <el-form-item prop="email" label="规格名称" :rules="[
              { required: true, message: '请输入规格名称', trigger: 'blur' }]">
              <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'规格选项与排序'"
              :key="domain.key"
              :rules="{required: true, message: '规格选项不能为空', trigger: 'blur'}">
              <el-input style="width: 170px;" v-model="domain.optionsName"></el-input>
              <el-input style="width: 148px;" v-model="domain.optionsOrder"></el-input>
              <el-button type="warning" @click.prevent="removeDomain(domain),removeSpec(domain)">删除{{index}}</el-button>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDomain">新增选项</el-button>
            <el-button @click="dialogVisibles = false">取 消</el-button>
            <el-button type="primary" @click="updSpec(dynamicValidateForm)">确 定</el-button>
          </span>
        </el-dialog>
      </div>

    </div>
</template>

<script>

    export default {
      name: "Gggl",
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
          multipleSelection: [],
          dialogVisibles:false,
          specId:"",
          dynamicValidateForm: {
            domains: [{
              optionsId:"",
              optionsName: '',
              optionsOrder:'',
              specId:""
            }],
            email: ''
          }
        }
      },
      created() {
        this.$http.get('http://localhost:8082/spec/getAll',{params:{
            pageSize: this.pageSize,
            // 显示第几页
            curPage: (this.currentPage - 1) * this.pageSize
          }}).then(res=>{
          this.tableData = res.data;
        });
        this.$http.get('http://localhost:8082/spec/getCount').then(res=>{
          this.totalCount = res.data;
        });
      },
      methods:{
        //删除动态输入框
        removeDomain(item) {
          var index = this.dynamicValidateForm.domains.indexOf(item)
          if (index !== -1) {
            this.dynamicValidateForm.domains.splice(index, 1)
          }
        },
        //搜索
        search(){
          this.$http.post('http://localhost:8082/spec/search',{specName:this.inSearch}).then(res=>{
            this.totalCount = res.data.length;
            this.pageSize = res.data.length;
            this.tableData = res.data;
          })
        },
        //增加输入框
        addDomain() {
          this.dynamicValidateForm.domains.push({
            optionsName: '',optionsOrder:'',
            key: Date.now()
          });
        },
        //多选
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //修改触发
        handleEdit(index,row){
          this.$http.get('http://localhost:8082/spec/getBySpecId',{params:{id:row.specId}}).then(res=>{
            this.dynamicValidateForm.email = row.specName;
            this.dynamicValidateForm.domains = res.data;
          });
          this.specId = row.specId;
        },
        //关闭触发
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //分页触发
        handleCurrentChange(val){
          this.currentPage = val;
          this.getData();
        },
        //获取数据
        getData(){
          this.$http.get('http://localhost:8082/spec/getAll',{params:{
              pageSize: this.pageSize,
              // 显示第几页
              curPage: (this.currentPage - 1) * this.pageSize
            }}).then(res=>{
            this.tableData = res.data;
          });
          this.$http.get('http://localhost:8082/spec/getCount').then(res=>{
            this.totalCount = res.data;
          });
        },
        //删除规格
        delSpec(){
          if (this.multipleSelection.length == 0){
            this.$message({message: '删除不得为空', type: 'warning'});
          }else{
            this.$http.post('http://localhost:8082/spec/delSpec',this.multipleSelection).then(res=>{
              if (res.data >= 1){
                this.$message({message: '删除成功!', type: 'success'});
              }else{
                this.$message({message: '删除失败!', type: 'warning'});
              }
            })
          }
        },
        //新增
        addSpec(value){
          if (value.email == ""){
            this.$message({message: '规格名称不得为空!', type: 'warning'});
            return;
          }
          for (let i = 0; i < value.domains.length; i++) {
            if (value.domains[i].optionsName == "" || value.domains[i].optionsOrder == ""){
              this.$message({message: '规格选项不得为空!', type: 'warning'});
              return;
            }
          }
          this.$http.post('http://localhost:8082/spec/addSpec',{
            specName:value.email,list:value.domains
          }).then(res=>{
            if (res.data == 1){
              this.$message({message: '新增成功!', type: 'success'});
              this.getData();
            }else{
              this.$message({message: '新增失败!', type: 'warning'});
            }
            this.dialogVisible = false;
          })
        },
        //修改属性
        updSpec(value){
          if (value.email == ""){
            this.$message({message: '不得为空!', type: 'warning'});
          }
          for (let i = 0; i < value.domains.length; i++) {
            if (value.domains[i].optionsName == "" || value.domains[i].optionsOrder == ""){
              this.$message({message: '规格选项不得为空!', type: 'warning'});
              return;
            }
          }
          this.$http.post('http://localhost:8082/spec/updSpec',{
            specName:value.email,list:value.domains,specId:this.specId
          }).then(res=>{
            if (res.data == 1){
              this.$message({message: '修改成功!', type: 'success'});
              this.getData();
            }else{
              this.$message({message: '修改失效!', type: 'warning'});
            }
            this.dialogVisibles = false;
          })
        },
        //删除属性
        removeSpec(domain){
          //是新增的选项删除直接删除
          if (this.dynamicValidateForm.domains.indexOf(domain) == -1){
            this.$message({message: '删除成功!', type: 'success'});
            return;
          }
          this.$http.post('http://localhost:8082/spec/delOptions',domain).then(res=>{
            if (res.data == 1){
              this.$message({message: '删除成功!', type: 'success'});
            }else{
              this.$message({message: '删除失败!', type: 'warning'});
            }
          })
        },
        //清除输入框
        clear(){
          this.dynamicValidateForm.email = '';
          this.dynamicValidateForm.domains = [{
            optionsId:"",
            optionsName: '',
            optionsOrder:'',
            specId:""
          }];
        },
        //刷新
        reload(){
          window.location.reload();
        }
      }
    }
</script>

<style scoped>
  .gggl{
    margin-left: 202px;
  }
</style>
