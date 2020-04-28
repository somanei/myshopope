<template>
  <div class="spflgl">
    <h1>商品分类管理</h1>
    <el-breadcrumb separator-class="el-icon-arrow-right"  style="height: 30px;margin: 15px 10px;font-size: 20px;">
      <el-breadcrumb-item >
        <span v-if="tbItemCatId === 0 || tbItemCatId === ''" @click="showOne()" style="font-weight: 900">顶级分类列表</span>
        <span v-else @click="showOne()">顶级分类列表</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item >

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
      <el-table-column prop="typeId" label="类型模板ID">
      </el-table-column>


      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getNext(scope.row)">获取下级</el-button>
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
      品牌:
      <el-input placeholder="请输入品牌" clearable></el-input>
      首字母:
      <el-input disabled placeholder="请输入首字母"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
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
        tbItemCatId:""
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
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tbItemCatId = this.tableData[0].parentId;
        this.getData(this.tbItemCatId);
      },
      getNext(row) {
        this.tbItemCatId = row.id;
        this.getData(this.tbItemCatId);
      },
      getData(id){
        this.$http.get("http://localhost:8082/tbItemCat/getLevel/"+id+"/"+((this.currentPage -1)*5)+"/5").then(res => {
          this.tableData = res.data;
        });
        this.$http.get('http://localhost:8082/tbItemCat/getCount/'+id).then(res => {
          this.totalCount = res.data;
        });
      },
      showOne(){
        this.getData(0);
      },
      showTwo(){

      }
    }
  }
</script>

<style scoped>
  .spflgl {
    margin-left: 202px;
  }
</style>
