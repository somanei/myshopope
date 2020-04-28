<template>
  <div class="spflgl">
    <h1>商品分类管理</h1>
    <el-breadcrumb separator-class="el-icon-arrow-right"  style="height: 30px;margin: 15px 10px;font-size: 20px;">
      <el-breadcrumb-item >
        <span v-if="tbItemCatId === 0 || tbItemCatId === ''" @click="showOne()" style="font-weight: 900">顶级分类列表</span>
        <span v-else @click="showOne()">顶级分类列表</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="tbItemCatName != ''">
        <span  @click="showTwo()" style="font-weight: 900">{{tbItemCatName}}</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="threeName != ''">
        <span  style="font-weight: 900">{{threeName}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-button-group>
      <el-button @click="dialogVisible = true">新建</el-button>
      <el-button>删除</el-button>
      <el-button>刷新</el-button>
    </el-button-group>

    <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column prop="id" type="selection" width="180">
      </el-table-column>
      <el-table-column prop="id" label="分类ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="分类名称">
      </el-table-column>
      <el-table-column prop="typeName" label="类型模板ID">
      </el-table-column>


      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" v-show="count != 3" type="primary" @click="getNext(scope.row)">获取下级</el-button>
          <el-button class="b" size="mini" type="warning" @click="handleEdit(scope.$index, scope.row),dialogVisibles=true">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <template>
      <div style="text-align: center;margin-top: 20px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="5" layout="total, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </template>

    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <span>上级商品分类:</span>
        <span style="margin-left: 6px;">
          <span v-if="tbItemCatName != ''">{{tbItemCatName}}</span>
          <span v-if="threeName != ''" class="el-icon-d-arrow-left">{{threeName}}</span>
        </span>
      </div>
      分类名称:
      <el-input placeholder="分类名称" v-model="inValue" style="width: 212px;margin: 10px 35px;" clearable></el-input>
      <div>
        类型模板:
        <el-select v-model="value1" value-key="id" style="margin-left: 35px;" placeholder="类型模板">
        <el-option
          v-for="(item,key) in options"
          :key="key"
          :label="item.name"
          :value="item">
        </el-option>
      </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFl()">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose">
      <div>
        <span>上级商品分类:</span>
        <span style="margin-left: 6px;">
          <span v-if="tbItemCatName != ''">{{tbItemCatName}}</span>
          <span v-if="threeName != ''" class="el-icon-d-arrow-left">{{threeName}}</span>
        </span>
      </div>
      分类名称:
      <el-input placeholder="分类名称" v-model="inValue" style="width: 212px;margin: 10px 35px;" clearable></el-input>
      <div>
        类型模板:
        <el-select v-model="value1" value-key="id" style="margin-left: 35px;" placeholder="类型模板">
          <el-option
            v-for="(item,key) in options"
            :key="key"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button type="primary" @click="updCat()">确 定</el-button>
        </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "Spflgl",
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        currentPage: 1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 1,
        // 默认每页显示的条数（可修改）
        multipleSelection: [],
        dialogVisibles: false,
        //二级目录的id显示用
        tbItemCatId:"",
        //二级目录的名字
        tbItemCatName:"",
        count:1,
        //三级目录的名字
        threeName:"",
        //二级目录的id
        twoId:"",
        value1:{},
        options:[],
        inValue:"",
        id:''
      }
    },
    created() {
      this.$http.get('http://localhost:8082/tbItemCat/getLevel/0/0/5').then(res => {
        this.tableData = res.data;
        this.tbItemCatId = res.data[0].parentId;
      });
      this.$http.get('http://localhost:8082/tbItemCat/getCount/0').then(res => {
        this.totalCount = res.data;
      });
      this.$http.get('http://localhost:8082/template/getIdAndName').then(res=>{
        this.options = res.data;
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        this.id = row.id;
        this.inValue = row.name;
        this.value1 = {id: row.typeId,name: row.typeName};
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      //分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tbItemCatId = this.tableData[0].parentId;
        this.getData(this.tbItemCatId);
      },
      //获取下一级
      getNext(row) {
        this.count+=1;
        if (this.count == 3){
          this.threeName = row.name;
        }else if (this.count == 2){
          //保存二级目录id为面包xian点击使用
          this.twoId = row.id;
          this.tbItemCatName = row.name;
        }
        this.currentPage = 1;
        //修改一级目录id显示用
        this.tbItemCatId = row.id;
        this.getData(this.tbItemCatId);
      },
      //获取数据
      getData(id){
        this.$http.get("http://localhost:8082/tbItemCat/getLevel/"+id+"/"+((this.currentPage -1)*5)+"/5").then(res => {
          this.tableData = res.data;
        });
        this.$http.get('http://localhost:8082/tbItemCat/getCount/'+id).then(res => {
          this.totalCount = res.data;
        });
      },
      //点击一级面包屑触发
      showOne(){
        this.count = 1;
        this.getData(0);
        this.tbItemCatId = 0;
        this.tbItemCatName = "";
        this.threeName = "";
        this.currentPage = 1;
      },
      //二级触发
      showTwo(){
        this.count = 2;
        this.threeName = "";
        this.getData(this.twoId);
        this.currentPage = 1;
      },
      addFl(){
        // 父级id this.tbItemCatId
        if (this.inValue == ""){
          this.$message({message: '分类名称不得为空!', type: 'warning'});
        }else if (this.value1 == null ){
          this.$message({message: '类型模板不得为空!', type: 'warning'});
        }else{
          this.$http.post('http://localhost:8082/tbItemCat/addTbItemCat',{
            parentId:this.tbItemCatId,name:this.inValue,typeId:this.value1.id
          }).then(res=>{
            if (res.data == 1){
              this.$message({message: '新增成功!', type: 'success'});
              this.getData(this.tbItemCatId);
              this.inValue = "";
              this.value1 = {};
            }else{
              this.$message({message: '新增失败!', type: 'warning'});
            }
            this.dialogVisible = false;
          })
        }
      },
      updCat(){
        if (this.inValue == ""){
          this.$message({message: '分类名称不得为空!', type: 'warning'});
        }else if (this.value1 == null ){
          this.$message({message: '类型模板不得为空!', type: 'warning'});
        }else{
          this.$http.post('http://localhost:8082/tbItemCat/updCat',{
            id:this.id,name:this.inValue,typeId:this.value1.id
          }).then(res=>{
            if (res.data == 1){
              this.$message({message: '修改成功!', type: 'success'});
              this.getData(this.tbItemCatId);
              this.inValue = "";
              this.value1 = {};
            }else{
              this.$message({message: '修改失败!', type: 'warning'});
            }
            this.dialogVisibles = false;
          })
        }
      }
    }
  }
</script>

<style scoped>
  .spflgl {
    margin-left: 202px;
  }
</style>
