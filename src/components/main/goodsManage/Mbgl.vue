<template>
    <div class="mbgl">
      <h1>模板管理</h1>
      <el-button-group>
        <el-button @click="dialogVisible = true,clear()">新建</el-button>
        <el-button @click="delTemplate()">删除</el-button>
        <el-button @click="reload()">刷新</el-button>
      </el-button-group>
      <div style="float: right">
        <span>模板名称:</span><el-input clearable v-model="inSearch" style="width: 200px;"></el-input>
        <el-button @click="search()">搜索</el-button>
      </div>

      <div>
        <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column prop="id" type="selection" width="180">
          </el-table-column>
          <el-table-column prop="id" label="模板ID" width="180">
          </el-table-column>
          <el-table-column prop="name" label="分类模板名称">
          </el-table-column>
          <el-table-column prop="brand" label="关联品牌">
          </el-table-column>
          <el-table-column prop="spec" label="关联规格">
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
          <div>
            商品类型:<el-input placeholder="请输入商品类型" v-model="addInput" clearable style="width: 212px;"></el-input>
          </div>
          <br>
          <div>
            关联品牌:<el-select v-model="value1" value-key="id" multiple placeholder="请选择关联品牌">
            <el-option
              v-for="(item,key) in brandOptions"
              :key="key"
              :label="item.text"
              :value="item">
            </el-option>
            </el-select>
          </div>
          <br>
          <div>
            关联规格:<el-select v-model="value2" value-key="id" multiple placeholder="请选择关联规格">
            <el-option
              v-for="(item,key) in specOptions"
              :key="key"
              :label="item.text"
              :value="item">
            </el-option>
          </el-select>
          </div>

          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTemplate()">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog title="修改" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose">
          <div>
            商品类型:<el-input placeholder="请输入商品类型" v-model="tempName" clearable style="width: 212px;"></el-input>
          </div>
          <br>
          <div>
            关联品牌:<el-select v-model="value1" value-key="id" multiple placeholder="请选择关联品牌">
            <el-option
              v-for="(item,key) in brandOptions"
              :key="key"
              :label="item.text"
              :value="item">
            </el-option>
          </el-select>
          </div>
          <br>
          <div>
            关联规格:<el-select v-model="value2" value-key="id" multiple placeholder="请选择关联规格">
            <el-option
              v-for="(item,key) in specOptions"
              :key="key"
              :label="item.text"
              :value="item">
            </el-option>
          </el-select>
          </div>

          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button type="primary" @click="updTemplate()">确 定</el-button>
        </span>
        </el-dialog>


      </div>
    </div>
</template>

<script>
    export default {
      name: "Mbgl",
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
            specOptions: [],
            brandOptions:[],
            value1: [],
            value2: [],
            addInput:"",
            tempId:"",
            tempName:""
          }
      },
      //数据获取
      created() {
        this.$http.get(this.Global.url_8082+'template/getByLimit',{params:{
            pageSize: 5,
            // 显示第几页
            curPage: 0
          }}).then(res=>{
            for (let i = 0; i < res.data.length; i++) {
              let spec = "";
              let brand = "";
              let customAttributeItems = "";
              for (let j = 0; j < res.data[i].spec.length; j++) {
                if (j === res.data[i].spec.length-1){
                  spec += res.data[i].spec[j].text;
                }else{
                  spec += res.data[i].spec[j].text+",";
                }
              }
              if (res.data[i].brand != null){
                for (let k = 0; k < res.data[i].brand.length; k++) {
                  if (k === res.data[i].brand.length-1){
                    brand += res.data[i].brand[k].text;
                  }else{
                    brand += res.data[i].brand[k].text+",";
                  }
                }
              }
              let cust = eval(res.data[i].customAttributeItems);
              if (cust != null){
                for (let t = 0; t < cust.length; t++) {
                  if (t === cust.length-1){
                    customAttributeItems += cust[t].text;
                  }else{
                    customAttributeItems += cust[t].text+",";
                  }
                }
              }
              res.data[i].spec = spec;
              res.data[i].brand = brand;
              res.data[i].customAttributeItems = customAttributeItems;
            }
          this.tableData = res.data;
        });
        this.$http.get(this.Global.url_8082+'template/getCount').then(res=>{
          this.totalCount = res.data;
        });
        this.$http.get(this.Global.url_8082+'template/getSpec').then(res=>{
          this.specOptions = res.data;
        });
        this.$http.get(this.Global.url_8082+'template/getBrand').then(res=>{
          this.brandOptions = res.data;
        });
      },
      methods:{
        //多选选中触发
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //点击修改触发
        handleEdit(index,row){
          //清空选中的值
          this.value2 = [];
          this.value1 = [];
          this.tempId = row.id;
          this.tempName = row.name;
          this.value1 = JSON.parse(row.brandIds);
          this.value2 = JSON.parse(row.specIds);
        },
        //点击关闭触发
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
        //数据格式化
        dataFormat(res){
          for (let i = 0; i < res.data.length; i++) {
            let spec = "";
            let brand = "";
            let customAttributeItems = "";
            if (res.data[i].spec != null){
              for (let j = 0; j < res.data[i].spec.length; j++) {
                if (j === res.data[i].spec.length-1){
                  spec += res.data[i].spec[j].text;
                }else{
                  spec += res.data[i].spec[j].text+",";
                }
              }
            }
            if (res.data[i].brand != null){
              for (let k = 0; k < res.data[i].brand.length; k++) {
                if (k === res.data[i].brand.length-1){
                  brand += res.data[i].brand[k].text;
                }else{
                  brand += res.data[i].brand[k].text+",";
                }
              }
            }
            let cust = eval(res.data[i].customAttributeItems);
            if (cust != null){
              for (let t = 0; t < cust.length; t++) {
                if (t === cust.length-1){
                  customAttributeItems += cust[t].text;
                }else{
                  customAttributeItems += cust[t].text+",";
                }
              }
            }
            res.data[i].spec = spec;
            res.data[i].brand = brand;
            res.data[i].customAttributeItems = customAttributeItems;
          }
          this.tableData = res.data;
        },
        //获取数据
        getData(){
          this.$http.get(this.Global.url_8082+'template/getByLimit',{params:{
              pageSize: this.pageSize,
              // 显示第几页
              curPage: (this.currentPage - 1) * this.pageSize
            }}).then(res=>{
            this.dataFormat(res);
          });
          this.$http.get(this.Global.url_8082+'template/getCount').then(res=>{
            this.totalCount = res.data;
          });
        },
        //新增模板
        addTemplate(){
          let brand = this.value1;
          let spec = this.value2;
          this.$http.post(this.Global.url_8082+'template/addTemplate',{
            name:this.addInput,spec:spec,brand:brand
          }).then(res=>{
            if (res.data == 1){
              this.$message({message: '新增成功!', type: 'success'});
              this.getData();
            }else{
              this.$message({message: '新增失败!', type: 'warning'});
            }
            this.dialogVisible = false;
            this.addInput = "";
            this.value1 = [];
            this.value2 = [];
          });
        },
        //刷新按钮触发
        reload(){
          window.location.reload();
        },
        //删除模板触发
        delTemplate(){
          if (this.multipleSelection == null){
            this.$message({message: '删除不得为空!', type: 'warning'});
          }else{
            let arr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
              arr[i] = this.multipleSelection[i].id;
            }
            this.$http.post(this.Global.url_8082+'template/delTemplate',
              arr
            ).then(res=>{
              if (res.data == 1){
                this.$message({message: '删除成功!', type: 'success'});
                this.getData();
              }else{
                this.$message({message: '删除失败!', type: 'warning'});
              }
            })
          }
        },
        //搜索
        search(){
          if (this.inSearch == ""){
            this.getData();
          }else{
            this.$http.get(this.Global.url_8082+'template/search',
              {params:{val:this.inSearch}}).then(res=>{
                if (res.data == null || res.data.length == 0){
                  this.$message({message: '搜索没有结果!', type: 'warning'});
                }else{
                  this.dataFormat(res);
                  this.totalCount = res.data.length;
                }
            })
          }
        },
        //修改触发
        updTemplate(){
          if (this.tempName === ""){
            this.$message({message: '模板名称不得为空!', type: 'warning'});
          }else if (this.value2 == null || this.value1 == null){
            this.$message({message: '品牌规格不得为空!', type: 'warning'});
          }else{
            this.$http.post(this.Global.url_8082+'template/updTemplate',{
              id:this.tempId,name:this.tempName,specIds:JSON.stringify(this.value2),brandIds:JSON.stringify(this.value1)
            }).then(res=>{
              if (res.data == 1){
                this.$message({message: '修改成功!', type: 'success'});
                this.getData();
              }else{
                this.$message({message: '修改失败!', type: 'warning'});
              }
              this.dialogVisibles = false;
            })
          }
        },
        //清除
        clear(){
          this.value1= [];
          this.value2=[];
        }

      }
    }
</script>

<style scoped>
  .mbgl{
    margin-left: 202px;
  }
</style>
