<template>
    <div >
      <div class="top">
        <img src="../../../static/img/Logo.png" />
      </div>
      <div class="bg">
        <div class="logins">
          <h2 style="padding:15px 0px;">运营商账户登录</h2><hr />
          <br /><br />
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-search"
            style="width: 300px;"
            v-model="inputAcc">
          </el-input>
          <br /><br />
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-search"
            style="width: 300px;"
            v-model="inputPwd">
          </el-input>
          <br /><br />
          <el-button type="primary" style="width: 300px;height: 40px;line-height: 40px;" @click="login()">登录</el-button><br /><br />
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ShopLogin",
      data () {
        return{
          inputAcc:'',
          inputPwd:''
        }
      },
      methods:{
        async login(){
          if (this.inputAcc === "" || this.inputPwd === ""){
            this.$message({type: 'warning', message: '账号密码必填!'});
          }else{
            await this.$http.post(this.Global.url_8082+'login',
              {account:this.inputAcc,password:this.inputPwd}).then(r=>{
              if (r.data !== ""){
                this.$message({type: 'success', message: '登陆成功!'});
                console.log(r.data)
                sessionStorage.setItem("loginName",r.data.account)
                sessionStorage.setItem("lastLogin",r.data.lastLogin)
                this.$emit('loginOk',true);
              }else{
                this.$message({type: 'warning', message: '账号或者密码错误!'});
              }
            })

          }
        }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .top{
    width: 62%;
    height: 62px;
    padding: 12px;
    margin: 20px auto;
  }
  .bg{
    width: 100%;
    height: 520px;
    background-image: url(../../../static/y24.png);
  }
  .logins{
    text-align: center;
    width: 420px;
    height: 400px;
    background: white;
    margin: 0 840px;
    position: relative;
    top: 50px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
