<template>
    <div id="shopItem">
      <el-tabs type="border-card">
        <el-tab-pane label="顶级分类列表">
          <el-button-group>
            <el-button @click="dialogVisible = true">新建</el-button>
            <el-button>删除</el-button>
            <el-button>刷新</el-button>
          </el-button-group>
          <el-table :data="oneTableData" border @selection-change="handleSelectionChange" style="width: 100%">
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
        </el-tab-pane>
        <el-tab-pane :label="twoName">
          <el-button-group>
            <el-button @click="dialogVisible = true">新建</el-button>
            <el-button>删除</el-button>
            <el-button>刷新</el-button>
          </el-button-group>
          <el-table :data="oneTableData" border @selection-change="handleSelectionChange" style="width: 100%">
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
                <el-button size="mini" type="primary" @click="getTwoNext(scope.row)">获取下级</el-button>
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
        </el-tab-pane>
        <el-tab-pane :label="threeName">

        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
      name: "ShopItem",
      data(){
          return{
            twoName:"",
            threeName:"",
            oneTableData:[],
            twoTableData:[],
            threeTableData:[],
            multipleSelection:[],
            totalCount:1,
            currentPage:1,
            dialogVisible:false,
            id:""
          }
      },
      created() {
        this.$http.get(this.Global.url_8082+'tbItemCat/getLevel/0/0/5').then(res => {
          this.oneTableData = res.data;
          this.id = res.data[0].parentId;
        });
        this.$http.get(this.Global.url_8082+'tbItemCat/getCount/0').then(res => {
          this.totalCount = res.data;
        });
      },
      methods:{
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getData(this.id);
        },
        getData(id){
          this.$http.get(this.Global.url_8082+"tbItemCat/getLevel/"+id+"/"+((this.currentPage -1)*5)+"/5").then(res => {
            this.oneTableData = res.data;
          });
          this.$http.get(this.Global.url_8082+'tbItemCat/getCount/'+id).then(res => {
            this.totalCount = res.data;
          });
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        getNext(row){
          this.twoName = row.name;
        },
        getTwoNext(row){
          this.threeName = row.name;
        },
        handleEdit(){

        }
      }
    }
</script>

<style scoped>
  #shopItem{
    margin-left: 202px;
  }
</style>
